
import Product from "../model/productModel.js"
import Reveiw from "../model/reveiwModel.js"
import { errorHandler } from "../Utils/error.js"



export const addReveiw = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(401,"you are not allowed to add reveiw"))
    }


    const {productId,rate,content} = req.body

    const userId = req.user.id

    
    if(!rate)
    {
        return next(errorHandler(400,"please rate the product first"))
    }

    const product = await Product.findById(productId)

    if(!product)
    {
        return next(errorHandler(404,"product not found"))
    }

    const existingRating = await Reveiw.findOne({userId,productId})

    if(existingRating)
    {
        return next(errorHandler(400,"You had already reveiwed the product"))
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

        // update product avarage rating
        const ratings = await Reveiw.find({productId})

        const avarageRatings = ratings.reduce((acc ,curr) => acc + curr.rate , 0) / ratings.length

        await Product.findByIdAndUpdate(productId , {rate:avarageRatings})

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
        const reveiws = await Reveiw.find({productId}).sort({_id:-1}).populate({path:"userId" })

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

   

    const {reveiwId,productId} = req.params

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

        // update product avarage rating
        const ratings = await Reveiw.find({productId})

        const avarageRatings = ratings.reduce((acc ,curr) => acc + curr.rate , 0) / ratings.length

        await Product.findByIdAndUpdate(productId , {rate:avarageRatings})

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

    const {reveiwId,productId} = req.params

    const reveiw = await Reveiw.findById(reveiwId)

    if(!reveiw)
    {
        return next(errorHandler(404,"reveiw not found"))
    }

    try
    {

        await Reveiw.findByIdAndDelete(reveiwId)

        // update product average rating
        const ratings = await Reveiw.find({productId})

        const averageRating = ratings.reduce((acc, curr) => acc + curr.rate, 0) / ratings.length
 
        await Product.findByIdAndUpdate(productId, {averageRating})


        res.status(200).json({success:true , message:"reveiw deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}