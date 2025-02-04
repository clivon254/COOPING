
import Delivery from "../model/deliveryModel.js"
import { errorHandler } from "../Utils/error.js"


export const addDelivery = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "ypu are not allowed to add location"))
    }

    const {place,value} = req.body

    try
    {
        const delivery = new Delivery({
            place,value
        })

        await delivery.save()

        res.status(200).json({success:true ,delivery})

    }
    catch(error)
    {
        next(error)
    }

}

export const getDelivery = async (req,res,next) => {

    const {deliveryId} = req.params

    try
    {

        const delivery = await Delivery.findById(deliveryId)

        if(!delivery)
        {
            return next(errorHandler(404,"location for delivety not found"))
        }

        res.status(200).json({success:true , delivery})

    }
    catch(error)
    {
        next(error)
    }

}

export const getDeliveries = async (req,res,next) => {

    try
    {
        const deliveries = await Delivery.find({}).sort({_id:-1})

        res.status(200).json({success:true , deliveries})

    }
    catch(error)
    {
        next(error)
    }

}

export const updateDelivery = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to send update the location"))
    }

    const {deliveryId} = req.params

    const delivery = await Delivery.findById(deliveryId)

    if(!delivery)
    {
        return next(errorHandler(404,"location for delivety not found"))
    }

    try
    {
        const updatedDelivery = await Delivery.findByIdAndUpdate(deliveryId,
            {
                $set:{
                    place:req.body.place,
                    value:req.body.value
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedDelivery})

    }
    catch(error)
    {
        next(error)
    }

}

export const deleteDelivery = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to  delete the location"))
    }

    const {deliveryId} = req.params

    const delivery = await Delivery.findById(deliveryId)

    if(!delivery)
    {
        return next(errorHandler(404,"location for delivety not found"))
    }

    try
    {

        await Delivery.findByIdAndDelete(deliveryId)

        res.status(200).json({success:true , message:`${delivery.place} deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}