import Product from "../model/productModel"
import User from "../model/userModel"
import { errorHandler } from "../Utils/error"


export const addToCart = async (req,res,next) => {

    const {itemId, size , color , spice , sauce} = req.body

    const userId = req.user.id

    try
    {
        const product = Product.findById(itemId)

        if(!product)
        {
            return next(errorHandle(404, "product not found"))
        }

        const userData = await User.findbyId(userId)

        if(!userData)
        {
            return next(errorHandler(404 ,"User not found"))
        }


        let cartData = await userData.cartData || {}


        // Determinine the current quantity in the cart
        let currentQuantity = 0 ;


        if(size && color)
        {
            currentQuantity = cartData[itemId]?.[size]?.[color] || 0
        }
        else if(size)
        {
            currentQuantity = cartData[itemId]?.[size] || 0
        }
        else if(color)
        {
            currentQuantity = cartData[itemId]?.[color] || 0
        }
        else if( spice && sauce)
        {
            currentQuantity = cartData[itemId]?.[spice]?.[sauce] || 0
        }
        else if(spice)
        {
            currentQuantity = cartData[itemId]?.[spice] || 0
        }
        else if(sauce)
        {
            currentQuantity = cartData[itemId]?.[sauce] || 0
        }
        else
        {
            currentQuantity = cartData[itemId] || 0
        }

        if(currentQuantity +1 > product?.instock)
        {
            return next(errorHandler(400 ,"Can not add more available stock"))
        }

        if(size && color)
        {

            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(!cartData[itemId][size])
            {
                cartData[itemId][size] = {}
            }

            if(!cartData[itemId][size][color])
            {
                cartData[itemId][size][color] = 0
            }

            cartData[itemId][size][color] += 1

        }
        else if(size)
        {
            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1
            }
            else
            {
                cartData[itemId][size] = 1
            }
    
        }
        else if(color)
        {

            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(cartData[itemId][color])
            {
                cartData[itemId][color] += 1
            }
            else
            {
                cartData[itemId][color] = 1
            }

        }
        else if(spice && sauce)
        {

            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(!cartData[itemId][spice])
            {
                cartData[itemId][spice] = {}
            }

            if(!cartData[itemId][spice][sauce])
            {
                cartData[itemId][spice][sauce] = 0
            }

            cartData[itemId][spice][sauce] += 1

        }
        else if(spice)
        {
            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(cartData[itemId][spice])
            {
                cartData[itemId][spice] += 1
            }
            else
            {
                cartData[itemId][spice] = 1
            }
        }
        else if(sauce)
        {
            if(!cartData[itemId])
            {
                cartData[itemId] = {}
            }

            if(cartData[itemId][sauce])
            {
                cartData[itemId][sauce] += 1
            }
            else
            {
                cartData[itemId][sauce] = 1
            }
        }
        else
        {
            if(cartData[itemId])
            {
                cartData[itemId] += 1
            }
            else
            {
                cartData[itemId] = 1
            }

        }

        await User.findByIdAndUpdate(userId, {cartData})

        res.status(200).json({success:true ,message:`${product.name} is added`})

    }
    catch(error)
    {
        next(error)
    }

}

export const removeToCart = async (req,res,next) => {

    const {spice,sauce,color,size,itemId} = req.body

    const userId = req.user.id

    const product = await Product.findById(itemId)

    if(!product)
    {
        return next(errorHandler(404,"product not found"))
    }

    const userData = await User.findById(userId)

    if(!userData)
    {
        return next(errorHandler(404,"user not found"))
    }

    let cartData = userData.cartData || {}

    try
    {

        if(size && color)
        {

            if(cartData[itemId][size] && cartData[itemId][size][color])
            {

                cartData[itemId][size][color] -= 1

                if(cartData[itemId][size][color] <= 0)
                {
                    delete cartData[itemId][size][color]
                }

                if(Object.keys(cartData[itemId][size]).length === 0)
                {
                    delete cartData[itemId][size]
                }

            }
            else
            {
                return next(errorHandler(400 ,"Specified size and color not found"))
            }

        }
        else if(size)
        {

            if(cartData[itemId][size])
            {
                cartData[item][size] -= 1

                if(cartData[itemId][size] <= 0)
                {
                    delete cartData[itemId][size]
                }

            }
            else
            {
                return next(errorHandler(400 ,"Specified size not found"))
            }

        }
        else if(color)
        {

            if(cartData[itemId][color])
            {
                cartData[item][color] -= 1

                if(cartData[itemId][color] <= 0)
                {
                    delete cartData[itemId][color]
                }

            }
            else
            {
                return next(errorHandler(400 ,"Specified color not found"))
            }

        }
        else if(spice && sauce)
        {

            if(cartData[itemId][spice] && cartData[itemId][spice][sauce])
            {

                cartData[itemId][spice][sauce] -= 1

                if(cartData[itemId][spice][sauce] <= 0)
                {
                    delete cartData[itemId][spice][sauce]
                }

                if(Object.keys(cartData[itemId][spice]).length === 0)
                {
                    delete cartData[itemId][spice]
                }

            }
            else
            {
                return next(errorHandler(400 ,"Specified spice and sauce not found"))
            }

        }
        else if(spice)
        {

            if(cartData[itemId][spice])
            {
                cartData[item][spice] -= 1

                if(cartData[itemId][spice] <= 0)
                {
                    delete cartData[itemId][spice]
                }

            }
            else
            {
                return next(errorHandler(400 ,"Specified spice not found"))
            }

        }
        else if(sauce)
        {

            if(cartData[itemId][sauce])
            {
                cartData[item][sauce] -= 1

                if(cartData[itemId][sauce] <= 0)
                {
                    delete cartData[itemId][sauce]
                }

            }
            else
            {
                return next(errorHandler(400 ,"Specified sauce not found"))
            }

        }
        else
        {
            cartData[itemId] -= 1

            if(cartData[itemId] <= 0 )
            {
                delete cartData[itemId]
            }
        }

        await User.findByIdAndUpdate(userId ,{cartData})

        res.status(200).json({success:true , message:`${product.name} removed from cart`})

    }
    catch(error)
    {
        next(error)
    }

}

export const getCart = async (req,res,next) => {

    const userId = req.user.id

    const userData = await User.findById(userId)

    if(!userData)
    {
        return next(errorHandler,"User not found")
    }

    try
    {
        let cartData = userData.cartData || {}

        let totalProducts = 0 

        let totalPrice = 0

        for(const itemId in cartData)
        {

            const product = await Product.findById(itemId)

            if(product)
            {

                const sizesOrColors = cartData[itemId]

                for(const sizeOrColor in sizesOrColors)
                {

                    if(typeof sizesOrColors[sizeOrColor]  === 'object')
                    {
                       
                        for(const color in sizesOrColors[sizeOrColor])
                        {
                            const quantity = sizesOrColors[sizeOrColor][color]

                            totalProducts += quantity 

                            totalPrice += quantity * product.offer ? product.discountPrice : product.regularPrice
                        }

                    }
                    else
                    {

                        const quantity = sizesOrColors[sizeOrColor]

                        totalProducts += quantity 

                        totalPrice += quantity * product.offer ? product.discountPrice : product.regularPrice
                            
                    }


                }

            }
        }

        res.status(200).json({success:true , cartData ,totalProducts,totalPrice})
    }
    catch(error)
    {
        next(error)
    }

}