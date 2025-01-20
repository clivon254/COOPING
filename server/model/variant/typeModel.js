

import mongoose from "mongoose"


const typeSchema = new mongoose.Schema(
    {
        name:{type:Strind , required:true}
    }
    ,{timestamps:true}
)


const Type = mongoose.model('Type', typeSchema)


export default Type