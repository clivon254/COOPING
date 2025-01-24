

import express from "express"
import { bookTicket, deleteTicket, getTicket, getTickets, scanTicket, updateTicket } from "../controller/ticketController.js"
import { verifyToken } from "../Utils/verify.js"



const ticketRouter = express.Router()



ticketRouter.post('/book-ticket' , bookTicket)



ticketRouter.post('/scan-ticket' ,verifyToken ,scanTicket)



ticketRouter.get("/get-ticket/:tickedId", getTicket)


ticketRouter.get("/get-tickets", verifyToken, getTickets)



ticketRouter.put("/update-ticket/:tickedId", verifyToken, updateTicket)



ticketRouter.delete("/delete-ticket/:tickedId", verifyToken, deleteTicket)





export default ticketRouter