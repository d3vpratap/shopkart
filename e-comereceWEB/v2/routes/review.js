const express = require('express');
const router = express.Router();

//model
const Review = require('../models/review');
const Product = require('../models/products'); 



router.post('/products/:productid/review',async(req,res)=>{
    const{productid} = req.params;
    const{rating,comment} = req.body;
//find the product with the productid:
    const product = await Product.findById(productid);
//create review inside reviews collection using Review Model.
   const review =  await Review.create({rating,comment}); 
//push this review into products review array!
    product.reviews.push(review); //it will send whole review but check review array on product side it will only take out id and store it.

    product.save();
    res.redirect(`/products/${productid}`);
})

module.exports = router;