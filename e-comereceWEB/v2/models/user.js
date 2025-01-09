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
    }
})
userSchema.plugin(passportLocalMongoose); //--->this will take control and also it stores password in hash format:
const User = mongoose.model('User',userSchema);

module.exports = User;