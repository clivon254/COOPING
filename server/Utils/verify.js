
import jwt from "jsonwebtoken"
import { errorHandler } from "./error"


export const verifyToken = (req,res,next) => {

    const {token} = req.headers

    if(!token)
    {
        return next(errorHandler(401,"Unauthorized no token"))
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