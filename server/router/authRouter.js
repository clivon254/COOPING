

import express from "express"
import { contactUs, forgotPassword, Login, Register, resetPassword } from "../controller/authController.js"



const authRouter = express.Router()



authRouter.post('/register', Register)


authRouter.post('/login', Login)


authRouter.post('/forgot-password', forgotPassword)


authRouter.post('/reset-password/:token', resetPassword)


authRouter.post('/contact-us', contactUs)




export default authRouter