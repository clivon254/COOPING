
import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../Utils/error.js"


export const Adminstats = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to access the access the stats"))
    }

    try
    {
        const {query} = req.query

        const numofDays = Number(query) || 30

        const currentDate = new Date()

        const startDate = new Date()

        startDate.setDate(currentDate.getDate() - numofDays)


        const totalFood = await Product.find({type:"Food"}).countDocuments()


        const totalMerchendise = await Product.find({type:"Merchendise"}).countDocuments()


        const totalDrinks = await Product.find({type:"Drink"}).countDocuments()


        const totalLiquor = await Product.find({type:"Liqour"}).countDocuments()


        const Users = await User.find({}).countDocuments()
        
        
        const userStats = await User.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate ,$lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: {format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    Total:{$sum: 1}
                }
            },
            {$sort: {_id: 1}}
        ])


        const orderPlaced = await Order.find({status:"Order Placed"}).countDocuments()


        const saleStats = await Order.aggregate([
            {
                $match:{
                    payment:true,
                    createdAt:{$gte:startDate ,$lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: {format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    Total:{$sum: 1}
                }
            },
            {$sort: {_id: 1}}
        ])

        const mostSoldProducts = await Product.find({}).sort({ sold: -1 }).limit(5);


        const mostReveiwedProducts = await Product.find({}).sort({ rate: -1 }).limit(5);

        
        res.status(200).json({
            success:true , 
            totalDrinks,
            totalFood ,
            totalLiquor ,
            totalMerchendise ,
            Users ,
            userStats ,
            saleStats ,
            orderPlaced ,
            mostSoldProducts ,
            mostReveiwedProducts
        })

        
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
