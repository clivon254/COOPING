

import express from "express"
import { verifyToken } from "../Utils/verify.js"
import {  
     createbrand, createCategory, createCollection, createcolor, createRole, createsauce, createSize, createSpice, createType,
     deletebrand, deleteCategory, deleteCollection, deleteColor, deleteRole, deleteSauce, deleteSize, deleteSpice, deleteType, 
     getbrand, getBrands, getCategory, getCategorys, getCollection, getCollections, getcolor, getcolors, 
     getRole, getRoles, getsauce, getSauces, getsize, getsizes, getspice, getSpices, getType, getTypes, 
     updatebrand, updateCategory, updatecollection, updateColor, updateRole, updatesauce, updateSize, updateSpice, updateType
   } from "../controller/variantsController.js"


const variantRouter = express.Router()


// TYPE

variantRouter.post('/type/create-type' ,verifyToken , createType)

variantRouter.get('/type/get-type/:typeId' , getType)

variantRouter.get('/type/get-types' ,verifyToken, getTypes)

variantRouter.put('/type/update-type/:typeId' ,verifyToken, updateType)

variantRouter.delete('/type/delete-type/:typeId' ,verifyToken, deleteType)



// COLLECTION

variantRouter.post('/collection/create-collection' ,verifyToken , createCollection)

variantRouter.get('/collection/get-collection/:collectionId' , getCollection)

variantRouter.get('/collection/get-collections' ,verifyToken, getCollections)

variantRouter.put('/collection/update-collection/:collectionId' ,verifyToken, updatecollection)

variantRouter.delete('/collection/delete-collection/:collectionId' ,verifyToken, deleteCollection)



// category

variantRouter.post('/category/create-category' ,verifyToken , createCategory)

variantRouter.get('/category/get-category/:categoryId' , getCategory)

variantRouter.get('/category/get-categorys' ,verifyToken, getCategorys)

variantRouter.put('/category/update-category/:categoryId' ,verifyToken, updateCategory)

variantRouter.delete('/category/delete-category/:categoryId' ,verifyToken, deleteCategory)



// BRAND

variantRouter.post('/brand/create-brand' ,verifyToken , createbrand)

variantRouter.get('/brand/get-brand/:brandId' , getbrand)

variantRouter.get('/brand/get-brands' ,verifyToken, getBrands)

variantRouter.put('/brand/update-brand/:brandId' ,verifyToken, updatebrand)

variantRouter.delete('/brand/delete-brand/:brandId' ,verifyToken, deletebrand)



// COLOR

variantRouter.post('/color/create-color' ,verifyToken , createcolor)

variantRouter.get('/color/get-color/:colorId' , getcolor)

variantRouter.get('/color/get-colors' ,verifyToken, getcolors)

variantRouter.put('/color/update-color/:colorId' ,verifyToken, updateColor)

variantRouter.delete('/color/delete-color/:colorId' ,verifyToken, deleteColor)



// SIZE

variantRouter.post('/size/create-size' ,verifyToken , createSize)

variantRouter.get('/size/get-size/:sizeId' , getsize)

variantRouter.get('/size/get-sizes' ,verifyToken, getsizes)

variantRouter.put('/size/update-size/:sizeId' ,verifyToken, updateSize)

variantRouter.delete('/size/delete-size/:sizeId' ,verifyToken, deleteSize)



// role

variantRouter.post('/role/create-role' ,verifyToken , createRole)

variantRouter.get('/role/get-role/:roleId' , getRole)

variantRouter.get('/role/get-roles' ,verifyToken, getRoles)

variantRouter.put('/role/update-role/:roleId' ,verifyToken, updateRole)

variantRouter.delete('/role/delete-role/:roleId' ,verifyToken, deleteRole)


// spice

variantRouter.post('/spice/create-spice' ,verifyToken , createSpice)

variantRouter.get('/spice/get-spice/:spiceId' , getspice)

variantRouter.get('/spice/get-spices' ,verifyToken, getSpices)

variantRouter.put('/spice/update-spice/:spiceId' ,verifyToken, updateSpice)

variantRouter.delete('/spice/delete-spice/:spiceId' ,verifyToken, deleteSpice)


//SAUCE

variantRouter.post('/sauce/create-sauce' ,verifyToken , createsauce)

variantRouter.get('/sauce/get-sauce/:sauceId' , getsauce)

variantRouter.get('/sauce/get-sauces' ,verifyToken, getSauces)

variantRouter.put('/sauce/update-sauce/:sauceId' ,verifyToken, updatesauce)

variantRouter.delete('/sauce/delete-sauce/:sauceId' ,verifyToken, deleteSauce)



export default variantRouter