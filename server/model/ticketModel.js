

import mongoose from "mongoose"


const ticketSchema = new mongoose.Schema({

    ticketNumber:{type:String , required:true},

    event:{type:mongoose.Schema.Types.ObjectId, ref:'Event' ,required:true},

    type:{type:Object ,required:true},

    attendeeDetails:{type:Object ,required:true},

    qrCodeData:{type:String },

    pdfTicket:{type:String },

    status:{type:String , required:true , enum:['available', "booked","used"], default:'available'}

})


const Ticket = mongoose.model('Ticket', ticketSchema)


export default Ticket