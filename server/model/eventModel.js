

import mongoose from "mongoose"


const eventSchema  = new mongoose.Schema(
    {
        name:{type:String , required:true},

        category:{type:String , required:true},

        date:{type:String , required:true},

        location:{type:String , required:true},

        availableTickets:{type:Number , required:true},

        description:{type:String , required:true},

        image:{type:String ,required:true},

        ticketTypes:[{

            name:{type:String , required:true ,},

            price:{type:String , required:true , min:0},

            quantity:{type:String , required:true, min:0},

            starts:{type:Date} ,

            expires:{type:Date}

        }]
    },
    {
        timestamps: true
    }
)


const Event = mongoose.model('Event' , eventSchema)


export default Event