

import express from "express"
import { createDrinks, createFood, createLiquor, createMerchendise, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/productController.js"
import { verifyToken } from "../Utils/verify.js"



const productRouter = express.Router()




productRouter.post('/create-food' , verifyToken, createFood)


productRouter.post('/create-drink' , verifyToken, createDrinks)


productRouter.post('/create-merchendise' , verifyToken, createMerchendise)


productRouter.post('/create-liqour' , verifyToken, createLiquor)


productRouter.get('/get-product/:productId' , getProduct)


productRouter.get('/get-products' , getProducts)


productRouter.put('/update-product/:productId' , verifyToken, updateProduct)


productRouter.delete('/delete-product/:productId' , verifyToken, deleteProduct)




export default productRouter