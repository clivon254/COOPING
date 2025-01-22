

import express from "express"
import { addToCart, getCart, removeToCart } from "../controller/cartController.js"
import { verifyToken } from "../Utils/verify.js"


const cartRouter = express.Router()


cartRouter.post('/add-cart' ,verifyToken, addToCart)


cartRouter.post('/remove-cart' ,verifyToken , removeToCart)


cartRouter.get('/get-cart' ,verifyToken, getCart)



export default cartRouter