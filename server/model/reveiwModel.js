

import mongoose from "mongoose"


const reveiwSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},

        content:{type:String , required:true},

        rate:{type:Number ,required:true}
    },
    {
        timestamps:true
    }
)

const Reveiw = mongoose.model("Reveiw", reveiwSchema)


export default Reveiw