

import express from "express"
import { verifyToken } from "../Utils/verify.js"
import { Adminstats } from "../controller/statsController.js"


const statsRouter = express.Router()


statsRouter.get('/admin-stats',verifyToken, Adminstats)



export default statsRouter
