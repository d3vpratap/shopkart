const express  =require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn} = require('../middleware');

//to register!
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})


//after signup form is submitted!
router.post('/register',async(req,res)=>{
    const {username , email, password, userType} = req.body;
    // const foundUser = await User.findOne({username,password,email});
    // if(foundUser){
    //     return res.send('Details are Already registered!')
    // }
    try{
     const user = new User ({username,email,userType});
    await User.register(user,password); 
    req.flash('success','User Registered Successfully!');
    res.redirect('/login');
    }
    catch(e){
        req.flash('error','Cannot register!')
        res.redirect('/register');
        console.log(e);
      
    };
    
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})


router.post('/login',passport.authenticate('local',
    { 
        failureRedirect: '/login', 
        failureFlash:true
        
    }),
    function(req, res) {
        const{username} = req.user;
        // console.log(username);
        req.flash('success',`Hello ${username}`);
      res.redirect('/products');
      
    });

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.flash('success','Logged Out why?');
        res.redirect('/login');
        });
    });
    

module.exports  = router;