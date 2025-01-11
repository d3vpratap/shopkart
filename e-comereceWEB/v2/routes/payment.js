const express = require('express');
const router  = express.Router();
const RazorPay = require('razorpay');
const{isLoggedIn} = require('../middleware');

const razorpay = new RazorPay({
    key_id:    'rzp_test_8Yy7ZIaVkNPkOy',
    key_secret: 'gOASfBQTHZdc8HTY5QOMvIcP',
});

// Route to create an order
router.post('/create-order',isLoggedIn, async (req, res) => {
    const { amount, currency } = req.body; // Amount should be in paise (e.g., 50000 for ₹500)
    try {
        const order = await razorpay.orders.create({ amount, currency });
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Unable to create order' });
    }
});

// Route to render the payment page
router.get('/payment',isLoggedIn, (req, res) => {
    const user = req.user;
    const cart =  req.user.cart;
    const totalamount = cart.reduce((sum,item)=> sum+ item.price* item.count,0);
    res.render('payment', { key:'rzp_test_8Yy7ZIaVkNPkOy',user,totalamount,cart});
});

module.exports = router;


