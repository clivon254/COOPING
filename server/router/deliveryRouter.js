

import express from "express"
import { verifyToken } from "../Utils/verify.js"
import { addDelivery, deleteDelivery, getDeliveries, getDelivery, updateDelivery } from "../controller/deliveryController.js"


const deliveryRouter = express.Router()



deliveryRouter.post('/add-delivery', verifyToken, addDelivery)


deliveryRouter.get('/get-delivery/:deliveryId', getDelivery)


deliveryRouter.get('/get-deliveries', getDeliveries)


deliveryRouter.put('/update-delivery/:deliveryId', verifyToken ,updateDelivery)


deliveryRouter.delete('/delete-delivery/:deliveryId', verifyToken , deleteDelivery)


export default deliveryRouter
