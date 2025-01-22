

import mongoose from "mongoose"


const orderSchema = new mongoose.Schema(
    {
        userId:{type:String , required:true},

        items:{type:Array, required:true},

        address:{type:Object , required:true},

        date:{type:Date , required:Date.now()},

        amount:{type:Number, required:true},

        payment:{type:Boolean, default:true},

        paymentmethod:{type:String , required:true},

        delivery:{type:Object , required:true},

        status:{type:String , required:"Order Placed"}
    },
    {
        timestamps:true 
    }
)


const Order = mongoose.model('Order', orderSchema)