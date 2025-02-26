

import express from "express"
import { generateAccessToken, verifyToken } from "../Utils/verify.js"
import { adminOrders, callback, COD, confirmPayment, confirmPaymentCustomerPrompt, deleteOrder, events, getOrder, mpesa, promptCustomer, updateStatus, userOrders } from "../controller/orderController.js"


const orderRouter = express.Router()


orderRouter.post('/stk-push', verifyToken, generateAccessToken, mpesa)


orderRouter.post('/prompt-customer', verifyToken, generateAccessToken, promptCustomer)



orderRouter.post('/callback', callback)



orderRouter.post('/confirm/:CheckoutRequestID/:orderId' , verifyToken, generateAccessToken, confirmPayment)


orderRouter.post('/confirm-prompt/:CheckoutRequestID/:orderId' , verifyToken, generateAccessToken, confirmPaymentCustomerPrompt)



orderRouter.get('/event' , events)


orderRouter.post('/COD' , verifyToken, COD)


orderRouter.get('/get-order/:orderId', getOrder)


orderRouter.get('/get-userOrders', verifyToken, userOrders)


orderRouter.get('/get-adminOrders', verifyToken , adminOrders)


orderRouter.put('/update-order', verifyToken , updateStatus)


orderRouter.delete("/delete-order/:orderId", verifyToken , deleteOrder)



export default orderRouter