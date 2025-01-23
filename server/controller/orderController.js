

import axios from "axios"
import Order from "../model/orderModel.js"
import User from "../model/userModel.js"
import Pay from "../model/payModel.js"
import Product from "../model/productModel.js"
import { errorHandler } from "../Utils/error.js"
import { generateRandomOrderNumber } from "../Utils/verify.js"



let clients = []



export const events = (req,res) => {

    res.setHeader('Content-Type','text/event-stream')

    res.setHeader('Cache-Control','no-cache')

    res.setHeader('Connection','keep-alive')

    
    // Add the client to the list
    clients.push(res)


    // Remove the client when connection is closed
    req.on('close' , () => {

        clients = clients.filter(client => client !== res)

    })
}



// send updates to connected clients
const sendEventToClients = () => {

    clients.forEach(client => {

        client.write(`data: ${JSON.stringify(data)}\n\n`)

    })
    
}




// MPESA
export const mpesa = async (req,res,next) => {

    const {items,address,delivery,amount,paymentmethod} = req.body

    const userId = req.user.id

    const token = req.token 

    const phone = address.phone.substring(1)


    try
    {
        const orderNumber = generateRandomOrderNumber()

        const order = new Order({
            userId,items,address,delivery,amount,paymentmethod,orderNumber
        })
    
        await order.save()

        const date = new Date()

        const timestamp = 
            date.getFullYear() + 
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 


        const shortcode = process.env.PAYBILL


        const passkey = process.env.PASS_KEY
        

        const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")


        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"


        const requestBody = {    
            "BusinessShortCode": shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": amount,    
            "PartyA":`254${phone}`,    
            "PartyB":shortcode,    
            "PhoneNumber":`254${phone}`,    
            "CallBackURL":`https://ea90-41-209-60-94.ngrok-free.app/api/order/callback?orderId=${order._id}&userId=${userId}`,    
            "AccountReference":"COOPING",    
            "TransactionDesc":"Test"
        }

        await axios.post(
            url,
            requestBody,
            {
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"application/json"
                }
            }
        )
        .then((response) => {

            let resData = response.data

            res.status(200).json({success:true , order , resData})

        })
        .catch((err) => {

            console.log("stk push error")

            res.status(400).json({success:false , message:`${err.message}`})

        })

    }
    catch(error)
    {
        next(error)
    }

}



// MPESA CALLBACK
export const callback = async (req,res,next) => {

    const {orderId,userId} = req.query

    try
    {
        console.log("callback is working")

        const callbackData = req.body

        if(!callbackData.Body.stkCallback.CallbackMetadata)
        {
            console.log(callbackData.Body)

            await Order.findByIdAndDelete(orderId)

            // send notification that the STK PUSH has been attended
            sendEventToClients({success:true , message:'STK PUSH has been attended to'})

            res.json("ok")

        }
        else
        {
            const body = req.body.StkCallback.CallbackMetadata

            console.log(body)

            const order = await Order.findById(orderId)

            if(order)
            {

                await Order.findByIdAndUpdate(orderId ,{payment:true})

                console.log("order updated")

                await User.findByIdAndUpdate(userId,{cartData:{}})

                console.log("cart cleared callback")
            }

            // Get amount 
            const amountObj = body.Item.find(Obj => Obj.Name === 'Amount')

            const amount = amountObj.Value


            // Get Mpesa Code
            const codeObj = body.Item.find(Obj => Obj.Name === 'MpesaReceitNumber')

            const trnx_id = codeObj.Value


            // Get Phone number
            const phoneNumberObj = body.Item.find(Obj => Obj.Name === 'PhoneNumber')

            const phone = phoneNumberObj.Value


            // Transaction Data
            const DateObj = body.Item.find(Obj => Obj.Name === 'Amount')

            const date = DateObj.Value


            const pay = new Pay({amount,trnx_id,phone,date})


            await Pay.save()

            // send notifications
            sendEventToClients({success:true , message:"STK Push attended to"})

            res.status(200).json({success:true ,pay})

        }

    }
    catch(error)
    {
        next(error)
    }

}



// MPESA CONFIRM PAYMENT
export const confirmPayment = async (req,res,next) => {

    const {orderId} = req.params

    const userId = req.user.id

    const token = req.token

    try
    {
        const auth = "Bearer " + token

        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"

        const date = new Date()

        const timestamp = 
            date.getFullYear() + 
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 
        
        const shortcode = process.env.PAYBILL

        const passkey = process.env.PASS_KEY

        const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

        const requestBody = {    
            "BusinessShortCode":shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "CheckoutRequestID": req.params.CheckoutRequestID 
        }

        const response = await axios.post(
            url,
            requestBody,
            {
                headers:{
                    "Authorization":auth
                }
            }
        )

        if(response.data.ResultCode === 0)
        {

            const order = await Order.findById(orderId)

            if(order)
            {
                
                for(const item of order.items)
                {

                    const productId = item._id

                    const quantity = Number(item.quantity)

                    const product = await Product.findById(productId)

                    if(product)
                    {
                        product.instock -= quantity

                        await product.save()
                    }
                    else
                    {
                        console.log("product not found")
                    }

                }

                await Order.findByIdAndUpdate(orderId ,{payment:true})

                console.log("order updated")

                await User.findByIdAndUpdate(userId ,{cartData:{}})

                console.log("cart cleared")

            }
            else
            {
                console.log("order not found")
            }

            res.status(200).json({success:true , data:response.data ,message:'Transaction was succesfull'})

        }
        else
        {
            await Order.findByIdAndDelete(orderId)

            res.status(200).json({success:true , data:response.data ,message:`${response.data.ResultDesc}`})
        }

    }
    catch(error)
    {
        next(error)

        console.log(error)
    }

}


// CASH ON DELIVERY
export const COD = async (req,res,next) => {

    const {items,delivery,amount,paymentmethod,address} = req.body

    const userId = req.user.id

    try
    {

        const orderNumber = generateRandomOrderNumber()

        const newOrder = new Order({
            items,delivery,amount,paymentmethod,address,userId,orderNumber
        })

        await newOrder.save()


        await User.findByIdAndUpdate(userId ,{cartData:{}})


        res.status(200).json({success:true , newOrder})

    }
    catch(error)
    {
        console.log(error.message)
    }

}


// USER ORDERS
export const userOrders = async (req,res,next) => {

    const userId = req.user.id

    if(!req.user.id )
    {
        return next(errorHandler(403,"You are not allowed see the orders"))
    }

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404 ,"User not found"))
        }

        const orders = await Order.find({userId}).sort({_id : -1})

        res.status(200).json({success:true , orders})

    }
    catch(error)
    {
        next(error)
    }

}


// ADMIN ORDERS
export const adminOrders = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401 ,"You are not allowed to accces the the Orders"))
    }

    const {status} = req.query

    try{

        const orders = await Order.find({
            ...(status && {status:status})
        })

        res.status(200).json({success:true ,orders})
    }
    catch(error)
    {
        next(error)
    }

}


// UPDATE STATUS
export const updateStatus = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401, "you are not allowed to updates status order"))
    }

    const {orderId,status} = req.body

    try
    {
        const order = await Order.findById(orderId)

        if(!order)
        {
            return next(errorHandler(404 , "order not found"))
        }

        await Order.findByIdAndUpdate(orderId, {status:status})

        res.status(200).json({success:true ,message:"status has been updated successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


// DELETE ORDER
export const deleteOrder = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401, "you are not allowed to updates status order"))
    }

    const {orderId} = req.params

    try
    {
        const order = await Order.findById(orderId)

        if(!order)
        {
            return next(errorHandler(404 , "order not found"))
        }

        await Order.findByIdAndDelete(orderId)

        res.status(200).json({success:true ,message:"status has been deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}