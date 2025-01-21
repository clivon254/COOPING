

import Brand from "../model/variant/brandModel.js"
import Category from "../model/variant/categoryModel.js"
import Collection from "../model/variant/collectionModel.js"
import Color from "../model/variant/colorModel.js"
import Role from "../model/variant/roleModel.js"
import Size from "../model/variant/sizeModel.js"
import Spice from "../model/variant/spicesModel.js"
import Type from "../model/variant/typeModel.js"
import { errorHandler } from "../Utils/error.js"





// TYPE

export const createType = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add type"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the type"))
    }

    try
    {
        const type = new Type({name})

        await type.save()

        res.status(200).json({success:true , type})

    }
    catch(error)
    {
        next(error)
    }

}


export const getType = async (req,res,next) => {
    
    const {typeId} = req.params

    const type = await Type.findById(typeId)

    if(!type)
    {
        return next(errorHandler(404,"type not found"))
    }

    try
    {
        res.status(200).json({success:true , type})
    }
    catch(error)
    {
        next(error)
    }

}


export const getTypes = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss types"))
    }
    
    try
    {
        const types = await Type.find({}).sort({_id:-1})

        res.status(200).json({success:true , types})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateType = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update type"))
    }

    const {typeId} = req.params

    const type = await Type.findById(typeId)

    if(!type)
    {
        return next(errorHandler(404,"type not found"))
    }
    

    try
    {

        const updatedType = await Type.findByIdAndUpdate(typeId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedType})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteType = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete type"))
    }

    const {typeId} = req.params

    const type = await Type.findById(typeId)

    if(!type)
    {
        return next(errorHandler(404,"type not found"))
    }

    try
    {
        await Type.findByIdAndDelete(typeId)

        res.status(200).json({success:true ,message:`${type.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}




// Collection

export const createCollection = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add collection"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the collection"))
    }

    try
    {
        const collection = new Collection({name})

        await collection.save()

        res.status(200).json({success:true , collection})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCollection = async (req,res,next) => {
    
    const {collectionId} = req.params

    const collection = await Collection.findById(collectionId)

    if(!collection)
    {
        return next(errorHandler(404,"collection not found"))
    }

    try
    {
        res.status(200).json({success:true , collection})
    }
    catch(error)
    {
        next(error)
    }

}


export const getCollections = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss collections"))
    }
    
    try
    {
        const collections = await Collection.find({}).sort({_id:-1})

        res.status(200).json({success:true , collections})
    }
    catch(error)
    {
        next(error)
    }

}


export const updatecollection = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update collection"))
    }

    const {collectionId} = req.params

    const collection = await Collection.findById(collectionId)

    if(!collection)
    {
        return next(errorHandler(404,"collection not found"))
    }
    

    try
    {

        const updatedcollection = await Collection.findByIdAndUpdate(collectionId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedcollection})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteCollection = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete collection"))
    }

    const {collectionId} = req.params

    const collection = await Collection.findById(collectionId)

    if(!collection)
    {
        return next(errorHandler(404,"collection not found"))
    }

    try
    {
        await Collection.findByIdAndDelete(collectionId)

        res.status(200).json({success:true ,message:`${collection.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}




// CATEGORY

export const createCategory = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add category"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the category"))
    }

    try
    {
        const category = new Category({name})

        await category.save()

        res.status(200).json({success:true , category})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCategory = async (req,res,next) => {
    
    const {categoryId} = req.params

    const category = await Category.findById(categoryId)

    if(!category)
    {
        return next(errorHandler(404,"category not found"))
    }

    try
    {
        res.status(200).json({success:true , category})
    }
    catch(error)
    {
        next(error)
    }

}


export const getCategorys = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss categorys"))
    }
    
    try
    {
        const categorys = await Category.find({}).sort({_id:-1})

        res.status(200).json({success:true , categorys})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateCategory = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update category"))
    }

    const {categoryId} = req.params

    const category = await Category.findById(categoryId)

    if(!category)
    {
        return next(errorHandler(404,"category not found"))
    }
    

    try
    {

        const updatedcategory = await Category.findByIdAndUpdate(categoryId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedcategory})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteCategory = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete category"))
    }

    const {categoryId} = req.params

    const category = await Category.findById(categoryId)

    if(!category)
    {
        return next(errorHandler(404,"category not found"))
    }

    try
    {
        await Category.findByIdAndDelete(categoryId)

        res.status(200).json({success:true ,message:`${category.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}



// COLOR

export const createcolor = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add color"))
    }


    const {name,hex} = req.body

    if(!name || name === "" || !hex || hex === "")
    {
        return next(errorHandler(400, "please enter the color"))
    }

    try
    {
        const color = new Color({name,hex})

        await color.save()

        res.status(200).json({success:true , color})

    }
    catch(error)
    {
        next(error)
    }

}


export const getcolor = async (req,res,next) => {
    
    const {colorId} = req.params

    const color = await Color.findById(colorId)

    if(!color)
    {
        return next(errorHandler(404,"color not found"))
    }

    try
    {
        res.status(200).json({success:true , color})
    }
    catch(error)
    {
        next(error)
    }

}


export const getcolors = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss colors"))
    }
    
    try
    {
        const colors = await Color.find({}).sort({_id:-1})

        res.status(200).json({success:true , colors})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateColor = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update color"))
    }

    const {colorId} = req.params

    const color = await Color.findById(colorId)

    if(!color)
    {
        return next(errorHandler(404,"color not found"))
    }
    

    try
    {

        const updatedColor = await Color.findByIdAndUpdate(colorId,
                    {
                        $set:{
                            name:req.body.name,
                            hex:req.body.hex
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedColor})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteColor = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete color"))
    }

    const {colorId} = req.params

    const color = await Color.findById(colorId)

    if(!color)
    {
        return next(errorHandler(404,"color not found"))
    }

    try
    {
        await Color.findByIdAndDelete(colorId)

        res.status(200).json({success:true ,message:`${color.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}



// size

export const createSize = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add size"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the size"))
    }

    try
    {
        const size = new Size({name})

        await size.save()

        res.status(200).json({success:true , size})

    }
    catch(error)
    {
        next(error)
    }

}


export const getsize = async (req,res,next) => {
    
    const {sizeId} = req.params

    const size = await Size.findById(sizeId)

    if(!size)
    {
        return next(errorHandler(404,"size not found"))
    }

    try
    {
        res.status(200).json({success:true , size})
    }
    catch(error)
    {
        next(error)
    }

}


export const getsizes = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss sizes"))
    }
    
    try
    {
        const sizes = await Size.find({}).sort({_id:-1})

        res.status(200).json({success:true , sizes})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateSize = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update size"))
    }

    const {sizeId} = req.params

    const size = await Size.findById(sizeId)

    if(!size)
    {
        return next(errorHandler(404,"size not found"))
    }
    

    try
    {

        const updatedSize = await Size.findByIdAndUpdate(sizeId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedSize})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteSize = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete size"))
    }

    const {sizeId} = req.params

    const size = await Size.findById(sizeId)

    if(!size)
    {
        return next(errorHandler(404,"size not found"))
    }

    try
    {
        await Size.findByIdAndDelete(sizeId)

        res.status(200).json({success:true ,message:`${size.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}



// BRAND

export const createbrand = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add brand"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the brand"))
    }

    try
    {
        const brand = new Brand({name})

        await brand.save()

        res.status(200).json({success:true , brand})

    }
    catch(error)
    {
        next(error)
    }

}


export const getbrand = async (req,res,next) => {
    
    const {brandId} = req.params

    const brand = await Brand.findById(brandId)

    if(!brand)
    {
        return next(errorHandler(404,"brand not found"))
    }

    try
    {
        res.status(200).json({success:true , brand})
    }
    catch(error)
    {
        next(error)
    }

}


export const getBrands = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss brands"))
    }
    
    try
    {
        const brands = await Brand.find({}).sort({_id:-1})

        res.status(200).json({success:true , brands})
    }
    catch(error)
    {
        next(error)
    }

}


export const updatebrand = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update brand"))
    }

    const {brandId} = req.params

    const brand = await Brand.findById(brandId)

    if(!brand)
    {
        return next(errorHandler(404,"brand not found"))
    }
    

    try
    {

        const updatedBrand = await Brand.findByIdAndUpdate(brandId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedBrand})
    }
    catch(error)
    {
        next(error)
    }

}


export const deletebrand = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete brand"))
    }

    const {brandId} = req.params

    const brand = await Brand.findById(brandId)

    if(!brand)
    {
        return next(errorHandler(404,"brand not found"))
    }

    try
    {
        await Brand.findByIdAndDelete(brandId)

        res.status(200).json({success:true ,message:`${brand.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}


// ROLE

export const createRole = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add role"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the role"))
    }

    try
    {
        const role = new Role({name})

        await role.save()

        res.status(200).json({success:true , role})

    }
    catch(error)
    {
        next(error)
    }

}


export const getRole = async (req,res,next) => {
    
    const {roleId} = req.params

    const role = await Role.findById(roleId)

    if(!role)
    {
        return next(errorHandler(404,"role not found"))
    }

    try
    {
        res.status(200).json({success:true , role})
    }
    catch(error)
    {
        next(error)
    }

}


export const getRoles = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss roles"))
    }
    
    try
    {
        const roles = await Role.find({}).sort({_id:-1})

        res.status(200).json({success:true , roles})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateRole = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update role"))
    }

    const {roleId} = req.params

    const role = await Role.findById(roleId)

    if(!role)
    {
        return next(errorHandler(404,"role not found"))
    }
    

    try
    {

        const updatedRole = await Role.findByIdAndUpdate(roleId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedRole})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteRole = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete role"))
    }

    const {roleId} = req.params

    const role = await Role.findById(roleId)

    if(!role)
    {
        return next(errorHandler(404,"role not found"))
    }

    try
    {
        await Role.findByIdAndDelete(roleId)

        res.status(200).json({success:true ,message:`${role.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}


// Spice

export const createSpice = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed add spice"))
    }


    const {name} = req.body

    if(!name || name === "")
    {
        return next(errorHandler(400, "please enter the spice"))
    }

    try
    {
        const spice = new Spice({name})

        await spice.save()

        res.status(200).json({success:true , spice})

    }
    catch(error)
    {
        next(error)
    }

}


export const getspice = async (req,res,next) => {
    
    const {spiceId} = req.params

    const spice = await Spice.findById(spiceId)

    if(!spice)
    {
        return next(errorHandler(404,"spice not found"))
    }

    try
    {
        res.status(200).json({success:true , spice})
    }
    catch(error)
    {
        next(error)
    }

}


export const getSpices = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to accesss spices"))
    }
    
    try
    {
        const spices = await Spice.find({}).sort({_id:-1})

        res.status(200).json({success:true , spices})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateSpice = async (req,res,next) => { 

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update spice"))
    }

    const {spiceId} = req.params

    const spice = await Spice.findById(spiceId)

    if(!spice)
    {
        return next(errorHandler(404,"spice not found"))
    }
    

    try
    {

        const updatedSpice = await Spice.findByIdAndUpdate(spiceId,
                    {
                        $set:{
                            name:req.body.name
                        }
                    },
                    {new:true}
            )
        
        res.status(200).json({success:true , updatedSpice})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteSpice = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete spice"))
    }

    const {spiceId} = req.params

    const spice = await Spice.findById(spiceId)

    if(!spice)
    {
        return next(errorHandler(404,"spice not found"))
    }

    try
    {
        await Spice.findByIdAndDelete(spiceId)

        res.status(200).json({success:true ,message:`${spice.name} is deleted`})
    }
    catch(error)
    {
        next(error)
    }

}