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
    contactNumber:{
        type:String,
        // required:[true , 'Mandatory!'],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Validates exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit number!`
        }
    },
    cart: [
            {   
                _id:false,
                name: String,
                price: Number,
                img: String,
                id: mongoose.Schema.Types.ObjectId,
                count: {
                        type: Number,
                        default: 1,
                        min: [0, 'Quantity Cannot be less than 1']
                        }
            }
    ],
    userType:{
        type:String,
        enum: ['customer','retailer'], //can only take these two types of values:
        default:'customer' 
    }
 }) 
userSchema.plugin(passportLocalMongoose); //--->this will take control and also it stores password in hash format:
const User = mongoose.model('User',userSchema);

module.exports = User;