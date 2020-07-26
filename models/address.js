const mongoose=require('mongoose');


const AddressSchema = new mongoose.Schema({
    street:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:number,
        required:true 
    },
    appartment:{
        type:String,
        required:true
    }
});



const Address = mongoose.model('Address',userSchema);

module.exports=Address;

