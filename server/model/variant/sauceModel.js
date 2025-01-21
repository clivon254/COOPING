

import mongoose from "mongoose"


const sauceSchema = new mongoose.Schema(
    {
        name:{type:String , required:true}
    }
    ,{timestamps:true}
)


const Sauce = mongoose.model('Sauce', sauceSchema)


export default Sauce