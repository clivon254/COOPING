

import mongoose from "mongoose"


const productSchema = new mongoose.Schema(
    {
        type:{type:String , required:true},

        collections:{type:String ,required:true},

        category:{type:String ,required:true},

        name:{type:String ,required:true},

        offer:{type:Boolean , default:false},

        regularPrice:{type:Number ,required:true},

        discountPrice:{type:Number ,required:true},

        images:{type:Array ,required:true},

        rate:{type:Number , default:5 },

        description:{type:String , required:true},

        instock:{type:Number},

        available:{type:Boolean , default:true},

        colors:{type:Array , default:undefined},

        sizes:{type:Array , default:undefined},

        sauces:{type:Array ,default:undefined},

        spices:{type:Array ,default:undefined},

    },
    {
        timestamps:true,
        minimize:true
    }
)



const Product = mongoose.model('Product', productSchema)



export default Product