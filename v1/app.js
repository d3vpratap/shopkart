const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:true})); //middleware to parse req.body:
const methodOverride= require('method-override');




//mongoose connection build:
mongoose.connect('mongodb://localhost:27017/shopkar')
    .then(()=>{
        console.log('DB connected!');
    })
    .catch((err)=>{
        console.log('err connecting DB',err);
    })



//routes:
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/review');




//setup app:
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_method'));


//using routes:
app.use(productRoutes);
app.use(reviewRoutes);








//server!!!!!!!!!!!!
app.listen(8000,()=>{
    console.log("server listening at port 8000");
});