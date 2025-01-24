
import Event from "../model/eventModel.js"
import { errorHandler } from "../Utils/error.js"



export const createEvent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to create an event"))
    }

    const {name,category,date,location,description,image,ticketTypes} = req.body
    

    try
    {
        const availableTickets = 23

        const event = new Event({
            name,category,date,location,description,image,ticketTypes,availableTickets
        })

        await event.save()

        res.status(201).json({success:true , message:"Event create successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const getEvent = async (req,res,next) => {

    const {eventId} = req.params

    try
    {
        const event = await Event.findById(eventId)

        if(!event)
        {
            return next(errorHandler(404 ,"Event not found"))
        }

        res.status(200).json({success:true , event})
    }
    catch(error)
    {
        next(error)
    }

}


export const getEvents = async (req,res,next) => {

    try
    {

        const events = await Event.find({}).sort({_id:-1})

        res.status(200).json({success:true , events})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateEvent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update an event"))
    }

    const {eventId} = req.params

    const event = await Event.findById(eventId)

    if(!event)
    {
        return next(errorHandler(404 ,"Event not found"))
    }
    
    try
    {

        const updatedEvent = await Event.findById(
            eventId ,
            {
                $set:{
                    name:req.body.name,
                    image:req.body.image,
                    description:req.body.description,
                    date:req.body.date,
                    category:req.body.category,
                    location:req.body.location,
                    ticketTypes:req.body.ticketTypes
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedEvent})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteEvent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update an event"))
    }

    const {eventId} = req.params

    const event = await Event.findById(eventId)

    if(!event)
    {
        return next(errorHandler(404 ,"Event not found"))
    }

    try
    {

        await Event.findByIdAndDelete(eventId)

        res.status(200).json({success:true ,message:`${event.name} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}