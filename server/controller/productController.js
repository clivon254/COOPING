
import Product from "../model/productModel.js"
import { errorHandler } from "../Utils/error.js"



export const createFood = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to add Food"))
    }

    const {type,collections,category,name,regularPrice,discountPrice,offer,images,description,sauces,spices} = req.body


    try
    {

        const food = new Product({
            type,collections,category,name,regularPrice,discountPrice,offer,images,description,sauces,spices
        })

        await food.save()

        res.status(200).json({success:true , food})

    }
    catch(error)
    {
        next(error)
    }

}



export const createDrinks = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to add Food"))
    }

    const {type,collections,category,name,regularPrice,discountPrice,offer,images,description,instock} = req.body

    try
    {

        const drink = new Product({
            type,collections,category,name,regularPrice,discountPrice,offer,images,description,instock
        })

        await drink.save()

        res.status(200).json({success:true , drink})

    }
    catch(error)
    {
        next(error)
    }

}



export const createMerchendise = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"Your are not allowed to add merchendise"))
    }

    const {type,collections,category,name,regularPrice,discountPrice,offer,images,description,instock,color,sizes} = req.body

    try
    {

        const merchendise = new Product({
            type,collections,category,name,regularPrice,discountPrice,offer,images,description,instock,color,sizes
        })

        await merchendise.save()

        res.status(200).json({success:true , merchendise})
    }
    catch(error)
    {
        next(error)
    }

}



export const createLiquor = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to add Food"))
    }

    const {type,collections,category,name,regularPrice,discountPrice,offer,images,description,instock} = req.body

    try
    {
        const liquor = new Product({
            type,collections,name,category,regularPrice,discountPrice,offer,images,description,instock
        })


        await liquor.save()


        res.status(200).json({success:true , liquor})

    }
    catch(error)
    {
        next(error)
    }

}



export const getProduct = async (req,res,next) => {

    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product)
    {
        return next(errorHandler(404,"product not found"))
    }

    try
    {

        res.status(200).json({success:true , product})

    }
    catch(error)
    {
        next(error)
    }

}



export const getProducts = async (req,res,next) => {

    try
    {

        const products = await Product.find({}).sort({_id:-1})

        res.status(200).json({success:true , products})

    }
    catch(error)
    {
        next(error)
    }

}



export const updateProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(404,"you are not allowed to update this product"))
    }

    const {productId} = req.params

    const product = await Product.findOnefindById(productId)

    if(!product)
    {
        return next(errorHandler(404 ,"Product not found"))
    }

    try
    {
        
        const updatedProduct = await Product.findByIdAndUpdate(
            productId ,
            {
                $set:{
                    type:req.body.type,
                    collections:req.body.collections,
                    category:req.body.category,
                    name:req.body.name,
                    offer:req.body.offer,
                    discountPrice:req.body.discountPrice,
                    regularPrice:req.body.regularPrice,
                    descripton:req.body.descripton,
                    rating:req.body.rating,
                    images:req.body.images,
                    sizes:req.body.sizes,
                    colors:req.body.colors,
                    sauces:req.body.sauces,
                    spices:req.body.spices,
                    available:req.body.available,
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedProduct})

    }
    catch(error)
    {
        next(error)
    }

}



export const deleteProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(404,"you are not allowed to update this product"))
    }

    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product)
    {
        return next(errorHandler(404 ,"Product not found"))
    }

    try
    {

        await Product.findByIdAndDelete(productId)

        res.status(200).json({success:true , message:`${product.name} is deleted`})

    }
    catch(error)
    {
        next(error)
    }

}