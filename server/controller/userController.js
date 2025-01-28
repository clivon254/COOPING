
import User from "../model/userModel.js"
import { errorHandler } from "../Utils/error.js"
import bcryptjs from "bcryptjs"




export const getUser = async (req,res,next) => {
    
    
    const {userId} = req.params

    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404 ,"user not found"))
    }

    try
    {
        const {password:pass , ...rest} = user._doc

        res.status(200).json({success:true , rest})
    }
    catch(error)
    {
        next(error)
    }

}


export const getUsers = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "Your not allowed access users"))
    }

        
    try
    {

        const users = await User.find({}).sort({_id:-1})

        const usersWithoutPassword = users.map((user) => {

            const {password, ...rest} = user._doc

            return rest 
        })

        res.status(200).json({success:true , usersWithoutPassword})

    } 
    catch(error)
    {
        next(error)
    }

}


export const updateUser = async (req,res,next) => {

    if(!req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403, "Your not allowed to update the user"))
    }

    const {userId} = req.params

    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404 ,"user not found"))
    }

    try
    {

        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password)
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture,
                    isAdmin:req.body.isAdmin,
                    role:req.body.role,
                    isBanned:req.body.isBanned,
                    failedLoginAttempts:req.body.failedLoginAttempts,
                    lastFailedLogin:req.body.lastFailedLogin,
                }
            },
            {new:true}
        )

        const {password , ...rest } = updatedUser._doc
        
        res.status(200).json({succcess:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteUser = async (req,res,next) => {

    if(!req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403, "Your not allowed to update the user"))
    }

    const {userId} = req.params

    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404 ,"user not found"))
    }

    try
    {
        await User.findByIdAndDelete(userId)

        res.status(200).json({success:true , message:`${user.username} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}


export const bannUser = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "Your not allowed to update the user"))
    }
    
    const {userId} = req.params

    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404 ,"user not found"))
    }

    if(user.isBanned)
    {
        return next(errorHandler(400,`${user.username} is banned already`))
    }

    try
    {

        user.isBanned = true

        await user.save()

        res.status(200).json({success:true , message:`${user.username} is banned from the platform`})

    }
    catch(error)
    {
        next(error)
    }

}