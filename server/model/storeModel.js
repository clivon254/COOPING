

import mongoose from "mongoose"


const storeSchema = new mongoose.Schema(
    {
        name:{type:String , required:true},

        address:{type:String , required:true},

        location:{
            type:{type:String , default:'Point'},
            coordinates:{type:[Number], index:'2dSphere'}
        }
    },
    {
        timestamps: true
    })

const Store = mongoose.model('Store', storeSchema)


export default Store