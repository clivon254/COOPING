
import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"
import axios from "axios"


export const verifyToken = (req,res,next) => {

    const {token} = req.headers

    if(!token)
    {
        return next(errorHandler(401,"Unauthorized no token in the headers"))
    }

    jwt.verify(token , process.env.JWT_SECRETE ,(err,user) => {

        if(err)
        {
            return next(errorHandler(403 ,"The token do not match or the token expired"))
        }

        req.user = user

        next()
    })

}


export const generateAccessToken = async (req,res,next) => {

    const consumerKey = process.env.CONSUMER_KEY

    const consumerSecrete = process.env.CONSUMER_SECRETE

    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    const auth = new Buffer.from(consumerKey + ":" + consumerSecrete).toString("base64")

    const headers = {
        "Authorization": "Basic" + " " + auth,
        "Content-Type":"application/json"
    }

    await axios.get(url ,{headers})
    .then((response) => {

        req.token = response.data.access_token

        next()

    })
    .catch((err) => {

        console.log(err.message)

        console.log("mpesa token is the issue buda")
        
    })

} 

 
