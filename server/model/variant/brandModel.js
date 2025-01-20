


import mongoose from "mongoose"


const brandSchema = new mongoose.Schema(
    {
        name:{type:String , required:true}
    }
    ,{timestamps:true}
)


const Brand = mongoose.model('Brand', brandSchema)


export default Brand