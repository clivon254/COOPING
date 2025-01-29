

import bcryptjs from  "bcryptjs"
import User from "../model/userModel.js"
import { errorHandler } from "../Utils/error.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



export const Register = async (req,res,next) => {

    const {email,password,username} = req.body

    if(!email  || !password || !username || email === "" || password === "" === "" || username === "")
    {
        return next(errorHandler(400 ,"Please fill all the fields"))
    }

    const existingEmail = await User.findOne({email})

    if(existingEmail)
    {
        return next(errorHandler(400 ,"Email is already registerd"))
    }

    const hashedPassword = bcryptjs.hashSync(password , 10)

    const newUser =  new User({
        username,
        password:  hashedPassword,
        email,
    })

    try
    {
        await newUser.save()

        res.status(200).json({success:true ,message:"User created successfully"})
    }
    catch(error)
    {
        next(error)
    }

}


export const Login = async (req,res,next) => {

    const {email,password} = req.body
    
    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler(400, "please fill all the fields"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(400, "The email provided is not registered"))
        }

        if(user.isBanned)
        {
            return next(errorHandler(403, "You are no allowed to login .Your account is banned"))
        }

        const isMatch =  await bcryptjs.compare(password , user.password)

        if(!isMatch)
        {
            user.failedLoginAttempts++

            user.lastFailedLogin = Date.now()

            //check if the user should be banned
            if(user.failedLoginAttempts >= 10)
            {
                const twoMinutesAgo = Date.now() - (2 * 60 * 1000)

                if(user.lastFailedLogin > twoMinutesAgo)
                {
                    user.isBanned = true
                }

            }

            await user.save()

            return next(errorHandler(401 ,"The provided password is Invalid"))
        }


        const token = jwt.sign(
            {
                id:user._id ,
                isAdmin:user.isAdmin,
                role:user.role
            },
            process.env.JWT_SECRETE,
            {expiresIn : '12h'}
        )

        const {password:pass , ...rest} = user._doc

        res.status(200).json({success:true , rest , token})

    }
    catch(error)
    {
        next(error)
    }

}


export const forgotPassword = async (req,res,next) => {

    const {email} = req.body

    if(!email || email === "")
    {
        return next(errorHandler(400 ,"please provide your email"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404, "email provided has not been registered"))
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.RESET_SECRETE ,
            {expiresIn:"1hr"}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const url = process.env.FRONTEND_URL

        var mailOptions = {
            from:"COOPING ",
            to:user.email,
            subject:"RESET PASSWORD",
            text:`Click on this link to reset your password : ${url}/reset-password/${token}`
        }

        transporter.sendMail(mailOptions ,(error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }

        })

        res.status(200).json({success:true ,message:"Link has been sent to your email"})

    }
    catch(error)
    {
        next(error)
    }

}


export const resetPassword = async (req,res,next) => {

    const {token} = req.params

    const {password ,confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token , process.env.RESET_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(400 ,"user not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400, "passwords do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password , 10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({success:true ,message:"password reset successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const contactUs = async (req,res,next) => {


    const {name,email,phone,subject,message} = req.body


    if(!name || !email || !phone || !subject || !message || name === "" || email === "" || subject === "" || message === "" )
    {
        return next(errorHandler(400 ,"please fill all the fields"))
    }

    try
    {

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const mailOptions = {
            from: `<${email}>`,
            to:process.env.AUTH_USER,
            subject:`Contact Form : ${subject}` ,
            text:`
                Name:${name}
                Email:${email}
                Subject:${subject}
                Message:${message}
            `
        }

        await transporter.sendMail(mailOptions ,(err,info) => {

            if(err)
            {
                console.log(err.message)
            }
            else
            {
                console.log("Email sent successfully sent us " + info)
            }

        })

        res.status(200).json({success:true ,message:"Message sent successfully"})

    }
    catch(error)
    {
        next(error)
    }

}



