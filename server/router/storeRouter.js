

import express from "express"
import { createStore, deleteStore, getStore, getStores, updateStore } from "../controller/storeController.js"
import { verifyToken } from "../Utils/verify.js"




const storeRouter = express.Router()



storeRouter.post('/create-store', verifyToken, createStore)


storeRouter.get('/get-store/:storeId',  getStore)


storeRouter.get('/get-stores', verifyToken, getStores)


storeRouter.put('/update-store/:storeId', verifyToken, updateStore)


storeRouter.delete('/delete-store/:storeId', verifyToken, deleteStore)





export default storeRouter