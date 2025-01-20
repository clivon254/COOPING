

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"


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

