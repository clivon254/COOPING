

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import storeRouter from "./router/storeRouter.js"
import variantRouter from "./router/variantRouter.js"
import productRouter from "./router/productRouter.js"
import cartRouter from "./router/cartRouter.js"
import orderRouter from "./router/orderRouter.js"
import reveiwRouter from "./router/reveiwRouter.js"
import faqRouter from "./router/faqRouter.js"


const app = express()

const PORT = process.env.PORT


app.use(cors())


app.use(express.json())



// DB CONNECTION    
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))



// API
app.get("/", (req,res) => {

    res.send("HELLO COOPING")

})



// ROUTER
app.use('/api/auth', authRouter)


app.use('/api/user' , userRouter)


app.use('/api/store' , storeRouter)


app.use('/api/variant' , variantRouter)


app.use('/api/product' , productRouter)


app.use('/api/cart', cartRouter)


app.use('/api/order', orderRouter)


app.use('/api/reveiw', reveiwRouter)


app.use("/api/faq", faqRouter)




app.listen(PORT,(err) => {

    if(err)
    {
        console.log(err.message)
    }
    else
    {
        console.log(`SERVER RUNNING ON PORT ${PORT}`)
    }

})




app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({success:false , message:message})

})


