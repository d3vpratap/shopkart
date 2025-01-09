module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','need to login')
       return res.redirect('/login');
    }
    next();
    }