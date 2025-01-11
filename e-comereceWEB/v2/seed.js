if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const mongoose = require('mongoose');
const Product = require('./models/products');
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/shopkar';
mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB connected!');
})
.catch((err)=>{
    console.log('err connecting DB',err);
})


const products = [
    { name: 'Apple iPhone 13', img: 'https://m.media-amazon.com/images/I/71fVoqRC0wL._SX679_.jpg', price: 9999, discount: 10, desc: 'The latest iPhone with A15 Bionic chip and stunning OLED display.' },
    { name: 'Samsung Galaxy S23', img: 'https://m.media-amazon.com/images/I/71HUnJvHsbL._SX679_.jpg', price: 79999, discount: 15, desc: 'Experience flagship performance with Samsung Galaxy S23.' },
    { name: 'Sony WH-1000XM5', img: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._SX679_.jpg', price: 3990, discount: 20, desc: 'Industry-leading noise cancellation with premium sound quality.' },
    { name: 'Apple 2024 MacBook Pro', img: 'https://m.media-amazon.com/images/I/61-RZxVEeCL._SX679_.jpg', price: 240990, discount: 5, desc: 'Active noise-canceling earbuds with spatial audio.' },
    { name: 'Fujifilm Instax Mini 12 Instant Camera-Pink', img: 'https://m.media-amazon.com/images/I/61+5Ld-oc1L._SX679_.jpg', price: 7490, discount: 5, desc: 'Active noise-canceling earbuds with spatial audio.' },
    { name: 'QARA Wood Laminated Study Table', img: 'https://m.media-amazon.com/images/I/715HPsS6s6L._SX679_.jpg', price: 2490, discount: 5, desc: 'Active noise-canceling earbuds with spatial audio.' },
    { name: 'Gaming Mouse Pad| Desk Mat | Stitched Edges|', img: 'https://m.media-amazon.com/images/I/71h9KVhOXkL._SX679_.jpg', price: 120, discount: 5, desc: 'Active noise-canceling earbuds with spatial audio.' },
    { name: 'MSI G244F E2 24 Inch FHD Gaming Monitor', img: 'https://m.media-amazon.com/images/I/715nKDtFJQL._SX679_.jpg', price: 1290, discount: 5, desc: 'Active noise-canceling earbuds with spatial audio.' },
    { name: 'Noise Twist Go Round dial Smartwatch ', img: 'https://m.media-amazon.com/images/I/61q0ZgCYoJL._SX679_.jpg', price: 999, discount: 5, desc: 'Active noise-canceling earbuds with spatial audio.' },

];
  

    


async function seed(){
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Product seeded!');
}
seed();