


import mongoose from "mongoose"


const spiceSchema = new mongoose.Schema(
    {
        name:{type:String , required:true}
    }
    ,{timestamps:true}
)


const Spice = mongoose.model('Spice', spiceSchema)


export default Spice