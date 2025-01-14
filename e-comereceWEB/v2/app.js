if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose'); 
const methodOverride= require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');
//for passport
const User = require('./models/user');
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/shopkar'; 
//mongoose connection build:
mongoose.connect(DB_URL)
    .then(()=>{
        console.log('DB connected!');
    })
    .catch((err)=>{
        console.log('err connecting DB',err);
    });

const store = MongoStore.create({   
     mongoUrl:DB_URL,
     touchAfter:24*3600
    })
const SECRET = process.env.SECRET || 'shut-up'
const sessionConfig = {
    store,
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        // secure:true
        httpOnly:true,
        expire: Date.now() + 1000*60*60*24*7*1 //in miliseconds    
    }
}
app.use(session(sessionConfig));
app.use(passport.authenticate('session'));
app.use(flash());

app.use(express.urlencoded({extended:true}));//middleware to parse req.body:

app.use((req,res,next)=>{

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

//routes:
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');


//setup app:
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//using routes:
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(express.json());
app.use(paymentRoutes);


app.get('/', (req, res) => {
    const currentUser = req.user;
       res.render('home',{currentUser});
  })





  const portNumber = process.env.PORT || 8000
//server!!!!!!!!!!!!
app.listen(portNumber,()=>{
    console.log(`server listening at port ${portNumber} `);
});