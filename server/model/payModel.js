

import mongoose from "mongoose"

const paySchema = new mongoose.Schema(
    {
        date:{type:String , required:true},

        trnx_id:{type:String , required:true},

        phone:{type:String , required:true},

        amount:{type:String , required:true},
    },
    {
        timestamps:true
    }
)

const Pay = mongoose.model('Pay', paySchema)


export default Pay