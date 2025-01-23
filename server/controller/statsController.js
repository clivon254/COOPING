import Product from "../model/productModel"
import User from "../model/userModel"
import { errorHandler } from "../Utils/error"


export const Adminstats = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to access the access the stats"))
    }

    try
    {
        const {query} = req.query

        const numofDays = Number(query) || 30

        const startDate = new Date()

        startDate.setDate(current.getDate() - numofDays)


        const totalFood = await Product.find({type:Food}).countDocuments()


        const totalMerchendise = await Product.find({type:Merchendise}).countDocuments()


        const totalDrinks = await Product.find({type:Drinks}).countDocuments()


        const totalLiquor = await Product.find({type:Liquor}).countDocuments()

        const Users = await User.find().countDocuments()

        
    }
    catch(error)
    {
        next(error)
    }

}


export const stats = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const Adminstat = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}
