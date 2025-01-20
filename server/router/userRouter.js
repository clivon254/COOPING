


import express from "express"
import { verifyToken } from "../Utils/verify.js"
import { bannUser, deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js"


const userRouter =  express.Router()



userRouter.get('/get-user/:userId' , getUser)


userRouter.get('/get-users' , verifyToken, getUsers)


userRouter.put('/update-user/:userId' ,verifyToken, updateUser)


userRouter.delete('/delete-user/:userId', verifyToken, deleteUser)


userRouter.post('/ban-user/:userId' ,verifyToken, bannUser)



export default userRouter