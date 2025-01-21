
import Store from "../model/storeModel.js";
import { errorHandler } from "../Utils/error.js";
import axios from "axios"



const geocodeAddress = async (address) => {


    try
    {

        const baseUrl = "https://nominatim.openstreetmap.org/search"
        
        const response = await axios.get(baseUrl ,{
            params:{
                q:address,
                format:'json'
            }
        })

        if (response.data && response.data.length > 0)
        {
            const firstResult = response.data[0];
            return {
              longitude: parseFloat(firstResult.lon),
              latitude: parseFloat(firstResult.lat),
            };

        } 
        else 
        {
            throw new Error('No results found for the provided address');
        }

    }
    catch(error)
    {
        console.error('Error geocoding address:', error);

        // Handle specific errors from Nominatim API (if available)
        if (error.response && error.response.status === 400) {
        throw new Error('Invalid address format');
        } else if (error.response && error.response.status === 403) {
        throw new Error('API rate limit exceeded');
        }

        throw error; // Re-throw the error for handling in the route handler
    }
    
}


export const createStore = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler)
    }


    try
    {
        const {name , address} = req.body

        const geocodedAddress = await geocodeAddress(address)

        const newStore = new Store({
            name,
            address,
            location:{
                type:'Point',
                coordinates:[geocodedAddress.longitude,geocodedAddress.latitude]
            }
        })

        await newStore.save()

        res.status(201).json({success:true , newStore})

    }
    catch(error)
    {
        next(error)
    }

}


export const getStore = async (req,res,next) => {

    const {storeId} = req.params

    try
    {
        const store = await Store.findById(storeId)

        if(!store)
        {
            return next(errorHandler(404,"Store not found"))
        }

        res.status(200).json({success:true , store})

    }
    catch(error)
    {
        next(error)
    }

}


export const getStores = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed access all the stores"))
    }

    try
    {
        const stores = await Store.find({}).sort({_id:-1})

        res.status(200).json({success:true , stores})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateStore = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed access all the stores"))
    }

    const {storeId} = req.params

    const store = await Store.findById(storeId)

    if(!store)
    {
        return next(errorHandler(404,"Store not found"))
    }

    try
    {

        const updatedStore = await Store.findByIdAndUpdate(
            storeId,
            {
                $set :{
                    name:req.body.name,
                    address:req.body.address
                }
         },
         {new:true} 
        )

        await updatedStore.save()

        res.status(200).json({success:true , updatedStore})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteStore = async (req,res,next) => {


    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed access all the stores"))
    }


    const {storeId} = req.params


    const store = await Store.findById(storeId)


    if(!store)
    {
        return next(errorHandler(404,"Store not found"))
    }

    try
    {

        await Store.findByIdAndDelete(storeId)

        res.status(200).json({success:true , message:`${store.name} is deleted`})

    }
    catch(error)
    {
        next(error)
    }

}