const mongoose = require('mongoose');
const Review = require('./review');



const productSchema =  new mongoose.Schema({
    name: String,
    price:Number,
    img:String,
    desc:String,
    // discount:{
    //     type:Number,
    //     default:10
    // },
    // discountedPrice:Number,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review' //refrencing in mongoose: 

        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;