

import mongoose from "mongoose"


const orderSchema = new mongoose.Schema(
    {
        orderNumber:{type:String , required:true , unique:true},

        userId:{type:String , required:true},

        items:{type:Array, required:true},

        address:{type:Object , required:true},

        date:{type:Date , default:Date.now()},

        amount:{type:Number, required:true},

        payment:{type:Boolean, default:false},

        paymentmethod:{type:String , required:true},

        delivery:{type:Object , required:true},

        status:{type:String , default:"Order Placed"}
    },
    {
        timestamps:true 
    }
)


const Order = mongoose.model('Order', orderSchema)


export default Order