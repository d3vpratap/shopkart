const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose'); 
const methodOverride= require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const sessionConfig = {
    secret: 'shut-up',
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionConfig));

app.use(flash());

app.use(express.urlencoded({extended:true}));//middleware to parse req.body:
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
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




//setup app:
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));



//using routes:
app.use(productRoutes);
app.use(reviewRoutes);








//server!!!!!!!!!!!!
app.listen(8000,()=>{
    console.log("server listening at port 8000");
});