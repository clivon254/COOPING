


import mongoose from "mongoose"


const colorSchema = new mongoose.Schema(
    {
        name:{type:String , required:true},

        hex:{type:String , required:true}
    }
    ,{timestamps:true}
)


const Color = mongoose.model('Color', colorSchema)


export default Color
