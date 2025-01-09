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
//for passport
const User = require('./models/user');

const sessionConfig = {
    secret: 'shut-up',
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

//mongoose connection build:
mongoose.connect('mongodb://localhost:27017/shopkar')
    .then(()=>{
        console.log('DB connected!');
    })
    .catch((err)=>{
        console.log('err connecting DB',err);
    });



//routes:
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');



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








//server!!!!!!!!!!!!
app.listen(8000,()=>{
    console.log("server listening at port 8000");
});