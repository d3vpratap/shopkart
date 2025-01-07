const mongoose = require('mongoose');
const Review = require('./review');



const productSchema =  new mongoose.Schema({
    name: String,
    price:Number,
    img:String,
    desc:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review' //refrencing in mongoose: 

        }
    ]
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;