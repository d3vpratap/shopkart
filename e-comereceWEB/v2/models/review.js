const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        // default:4
    },
    comment:String,  
    author:String
})

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;