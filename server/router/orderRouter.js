

import express from "express"
import { generateAccessToken, verifyToken } from "../Utils/verify.js"
import { adminOrders, callback, COD, confirmPayment, deleteOrder, mpesa, updateStatus, userOrders } from "../controller/orderController.js"


const orderRouter = express.Router()


orderRouter.post('/stk-push', verifyToken, generateAccessToken, mpesa)


orderRouter.post('/callback', callback)


orderRouter.post('/confirm/:CheckoutRequestID/:orderId' , verifyToken, generateAccessToken, confirmPayment)


orderRouter.post('/COD' , verifyToken, COD)


orderRouter.get('/get-userOrders', verifyToken, userOrders)


orderRouter.get('/get-adminOrders', verifyToken , adminOrders)


orderRouter.put('/update-order', verifyToken , updateStatus)


orderRouter.delete("/delete-order/:orderId", verifyToken , deleteOrder)



export default orderRouter