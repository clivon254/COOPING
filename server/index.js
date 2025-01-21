

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import storeRouter from "./router/storeRouter.js"
import variantRouter from "./router/variantRouter.js"


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


