const Product = require('./models/products');
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','need to login')
       return res.redirect('/login');
    }
    next();
    }
module.exports.isAuthorise = (req,res,next)=>{
    if(req.user.userType !== 'retailer'){
        req.flash('error','Alert! - Action can be performed by retailer only');
        return res.redirect('/products');
    }
    return next();
}
module.exports.validReatiler = async(req,res,next)=>{
    const{productid} =  req.params;
    const product =  await Product.findById(productid);
    if(product.author && product.author.equals(req.user._id)){
       return next();
    }
    else{
        req.flash('error','This Product is not created by you!');
        return res.redirect('/products');
    }
}