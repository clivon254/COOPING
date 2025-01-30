
import Product from "../model/productModel.js"
import Reveiw from "../model/reveiwModel.js"
import { errorHandler } from "../Utils/error.js"



export const addReveiw = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(401,"you are not allowed to add reveiw"))
    }

    const {productId,rate,content} = req.body

    const product = await Product.findById(productId)

    if(!product)
    {
        return next(errorHandler(404,"product not found"))
    }

    try
    {

        const reveiw = new Reveiw({
            rate,
            content,
            userId:req.user.id,
            productId
        })

        await reveiw.save()

        res.status(200).json({success:true , reveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiw = async (req,res,next) => {

    const {reveiwId} = req.params

    try
    {
        const reveiw = await Reveiw.findById(reveiwId)

        if(!reveiw)
        {
            return next(errorHandler(404,"reveiw not found"))
        }

        res.status(200).json({success:true , reveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiws = async (req,res,next) => {

    const {productId} = req.params

    try
    {
        const reveiws = await Reveiw.find({productId}).sort({_id:-1})

        res.status(200).json({success:true , reveiws})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateReveiw = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401 ,"you are not allowed to edit this reveiw"))
    }

    const {reveiwId} = req.params

    const reveiw = await Reveiw.findById(reveiwId)

    if(!reveiw)
    {
        return next(errorHandler(404,"reveiw not found"))
    }

    try
    {

        const updatedReveiw = await Reveiw.findByIdAndUpdate(reveiwId,
            {
                $set:{
                    content:req.body.content,
                    productId:req.body.productId,
                    userId:req.body.userId,
                    rate:req.body.rate,
                }
            }
        )

        res.status(200).json({success:true , updatedReveiw})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReveiw = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401 ,"you are not allowed to edit this reveiw"))
    }

    const {reveiwId} = req.params

    const reveiw = await Reveiw.findById(reveiwId)

    if(!reveiw)
    {
        return next(errorHandler(404,"reveiw not found"))
    }

    try
    {

        await Reveiw.findByIdAndDelete(reveiwId)

        res.status(200).json({success:true , message:"reveiw deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}