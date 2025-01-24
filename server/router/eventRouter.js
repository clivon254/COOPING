

import express from "express"
import { verifyToken } from "../Utils/verify.js"
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controller/eventController.js"


const eventRouter = express.Router()


eventRouter.post('/create-event', verifyToken , createEvent)


eventRouter.get('/get-event/:eventId' , getEvent)


eventRouter.get('/get-events', getEvents)


eventRouter.put('/update-event/:eventId', verifyToken , updateEvent)


eventRouter.delete('/delete-event/:eventId', verifyToken , deleteEvent)



export default eventRouter