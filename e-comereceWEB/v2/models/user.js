const mongoose  =require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    //this is automatically added by passport local mongoose! so no need to add it manually!
    // username:{
    //     type:String
    // },
    // password:{
    //     type:String
    // },
    email:{
        type:String
    },
    cart:[
        {
            name:String,
            price:Number,
            img:String,
            id:mongoose.Schema.Types.ObjectId,
            count:{
                type:Number,
                default:1,
                min:[0,'Quantity is less!']
            }
        }
    ] 
})
userSchema.plugin(passportLocalMongoose); //--->this will take control and also it stores password in hash format:
const User = mongoose.model('User',userSchema);

module.exports = User;