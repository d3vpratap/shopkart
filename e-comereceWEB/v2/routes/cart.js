const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const User = require('../models/user');
const Product =  require('../models/products');

router.post('/products/:productid/cart',isLoggedIn,async(req,res)=>{
    try{
        const{productid} = req.params; 
        const userid = req.user._id;
        const user = await User.findById(userid);
        const product = await Product.findById(productid);
        //check!
        const isPresent = user.cart.some((item)=>item.id.equals(productid));
        if(isPresent){
            const item = user.cart.find((item)=>item.id.equals(productid))
            item.count++;
        }
        else{
                user.cart.push({
                name:product.name,
                price:product.price,
                img:product.img,
                id:product._id
            })
        }
        await user.save();
        res.redirect('/products/user/cart');
    }
    catch(e){  
        req.flash('error','cannot add Product at the moment!');
        res.redirect('/products')
    }
})
router.get('/products/user/cart',isLoggedIn,async(req,res)=>{
    try{
        const cart =  req.user.cart;
        const totalamount = cart.reduce((sum,item)=> sum+ item.price* item.count,0);
        res.render('cart/cart',{cart,totalamount});
    }
    catch(e){
        req.flash('error','cannot display cart!');
        res.redirect('/products');
    }
        
})

//to remove product from cart of the user!
router.post('/products/:productid/cart/delete',async(req,res)=>{
    try {
        const { productid } = req.params;
        // Find the logged-in user
        const user = await User.findById(req.user._id);
        // Find the product in the user's cart
        const item = user.cart.find(item => item.id.equals(productid));

        if (!item) {
            req.flash('error', 'Product not found in cart!');
            return res.redirect('/products/user/cart');
        }
        if (item.count === 1) {
            // Remove the product if quantity is 1
            user.cart = user.cart.filter(item => !item.id.equals(productid));
            req.flash('success', 'Product removed successfully!');
        } else {
            // Decrease the quantity if more than 1
            item.count--;
            req.flash('success', 'Product quantity updated!');
        }

        // Save the updated cart
        await user.save();
        res.redirect('/products/user/cart');
    } 
    catch(e){
        console.log(e);
        req.flash('error','cannot remove product!');
        res.redirect('/products/user/cart');
    }
    

})

module.exports = router;
