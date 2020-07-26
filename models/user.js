const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
    mobileNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true 
    }
});



const User = mongoose.model('User',userSchema);

module.exports=User;

