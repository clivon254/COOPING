
import Ticket from "../model/ticketModel.js"
import { errorHandler } from "../Utils/error.js"
import { generateRandomOrderNumber } from "../Utils/verify.js"
import {PDFDocument,StandardFonts} from "pdf-lib"
import qrcode from "qrcode"
import fs from "fs"
import path from "path"
import Event from "../model/eventModel.js"



export const bookTicket = async (req,res,next) => {

    const {ticketType,event,attendeeDetails} = req.body

    const eventCheck = await Event.findById(event)

    if(!eventCheck)
    {
        return next(errorHandler(403,"event not found"))
    }

    if(eventCheck.availableTickets <= 0)
    {
        return next(errorHandler(403,"Tickets are sold out"))
    }

    try
    { 
        const ticketNumber = generateRandomOrderNumber()

        const type = ticketType.name

        const ticket = new Ticket({
            ticketNumber,
            ticketType,
            event,
            attendeeDetails,
            type
        })


       const qrCodeData = JSON.stringify({event,attendeeDetails,ticketType})

       const qrCodeUrl = await qrcode.toDataURL(qrCodeData)

       ticket.qrCodeData = qrCodeUrl

       

       //   Generate PDF Ticket
       const pdfDoc = await PDFDocument.create()
       
       const page = pdfDoc.addPage()

       const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
       

       // Corrected text positioning and content
       page.drawText(`Event: ${eventCheck.name}`, {x: 50, y: 700, size: 14, font: timesRomanFont})

       page.drawText(`Date: ${eventCheck.date}`, {x: 50, y: 670, size: 12, font: timesRomanFont})

       page.drawText(`Location: ${eventCheck.location}`, {x: 50, y: 640, size: 12, font: timesRomanFont})

       page.drawText(`Type: ${ticketType.name}`, {x: 50, y: 610, size: 14, font: timesRomanFont})

       page.drawText(`Ticket Price: $${ticketType.price}`, {x: 50, y: 580, size: 12, font: timesRomanFont})

       page.drawText(`Attendee: ${attendeeDetails}`, {x: 50, y: 550, size: 12, font: timesRomanFont})



        // Embed QR Code
        const qrCodeBuffer = await fetch(qrCodeUrl).then(r => r.arrayBuffer())

        const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer)

        page.drawImage(qrCodeImage, {x: 400, y: 600, width: 100, height: 100})


        
        // Save PDF
        const pdfBytes = await pdfDoc.save();
        
        const base64EncodedPdf = Buffer.from(pdfBytes, 'binary').toString('base64'); 

        const pdfDataURL = `data:application/pdf;base64,${base64EncodedPdf}`; 

        ticket.pdfTicket = pdfDataURL;



        await ticket.save()

        res.status(200).json({success:true ,  message:"Ticket is added to cart" , ticket})

    }
    catch(error)
    {
        next(error)
    }

}


export const scanTicket = async (req,res,next) => {

    try{}
    catch(error)
    {}

}


export const getTicket = async (req,res,next) => {

    try
    { 
        const {ticketId} = req.params

        const ticket = await Ticket.findById(ticketId)

        if(!ticket)
        {
            return next(errorHandler(404, "Ticket not found"))
        }

        res.status(200).json({success:true , ticket})

    }
    catch(error)
    {
        next(error)
    }

}


export const getTickets = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to access all the tickets"))
    }


    try
    { 
        const tickets = await Ticket.find({}).sort({_id:-1})

        res.status(200).json({success:true , tickets})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateTicket = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"youe are not allowed to update this ticket"))
    }

    const {ticketId} = req.params

    const ticket = await Ticket.findById(ticketId)

    if(!ticket)
    {
        return next(errorHandler(404,"error not found"))
    }


    try
    { 
        
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                $set:{
                    status:req.body.status,
                }
            }
        )

        res.status(200).json({success:true , updatedTicket})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteTicket = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"youe are not allowed to update this ticket"))
    }

    const {ticketId} = req.params

    const ticket = await Ticket.findById(ticketId)

    if(!ticket)
    {
        return next(errorHandler(404,"error not found"))
    }

    try
    { 

        await Ticket.findByIdAndDelete(ticketId)

        res.status(200).json({success:true , message:`${ticket,name} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}