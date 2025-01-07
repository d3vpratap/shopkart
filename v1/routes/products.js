const express = require('express');
const router = express.Router(); //mini express application.
const Product = require('../models/products');



router.get('/products',async(req,res)=>{
         const products =  await  Product.find({});
        res.render('products/index',{products});
});
router.get('/product/new',(req,res)=>{
    res.render('products/new');
})
router.post('/products',async(req,res)=>{
    const {name ,price,desc,img} = req.body;
    await Product.create({name,price,desc,img});
    res.redirect('/products');
})
router.get('/products/:productid',async(req,res)=>{
    const {productid} = req.params;
    const product = await Product.findById(productid).populate('reviews');
    // console.log(product);
    res.render('products/show',{product});
})
router.get('/products/:productid/edit',async(req,res)=>{
    const{productid} = req.params;
    const product = await Product.findById(productid);
    res.render('products/edit',{product});
})
router.patch('/products/:productid',async(req,res)=>{
    const {productid} = req.params;
    const {name,price,img,desc} = req.body;
    await Product.findByIdAndUpdate(productid,{name,price,img,desc});
    res.redirect(`/products/${productid}`);
})

router.delete('/products/:productid',async(req,res)=>{
    const {productid} = req.params;
    await Product.findByIdAndDelete(productid);
    res.redirect('/products');
})

module.exports = router;