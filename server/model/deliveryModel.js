

import mongoose from 'mongoose'


const deliverySchema = new mongoose.Schema(
    {
        place:{type:String ,required:true},

        value:{type:Number , required:true}
    },
    {timestamps:true}
)

const Delivery = mongoose.model('Delivery', deliverySchema)


export default Delivery