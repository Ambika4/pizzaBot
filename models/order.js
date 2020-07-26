const mongoose=require('mongoose');


const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // products:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'Product'
    //     }
    // ],
    
    totalCost:{
        type:Number
    },
    flavour:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    size:{
        type:String,
        required:true
    },
    crust:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
} ,{
        timestamps:true
    }
);



const Order = mongoose.model('Order',orderSchema);

module.exports=Order;

