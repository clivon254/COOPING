

import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import { errorHandler } from "../Utils/error.js";



export const addToCart = async (req, res, next) => {

    const { itemId, size, color, sauces, spices } = req.body;

    const userId = req.user.id;

    // Input validation
    if (!itemId) 
    {
        return next(errorHandler(400, "Item ID is required"));
    }

    // Validate sauces and spices arrays when both are present
    if ((sauces && spices) && (!Array.isArray(sauces) || !Array.isArray(spices))) 
    {
        return next(errorHandler(400, "Sauces and spices must be arrays"));
    }

    // Validate individual arrays when present
    if ((sauces && !Array.isArray(sauces)) || (spices && !Array.isArray(spices))) 
    {
        return next(errorHandler(400, "Sauce and spice selections must be arrays"));
    }

    try 
    {
        const product = await Product.findById(itemId);

        if (!product) 
        {
            return next(errorHandler(404, "Product not found"));
        }

        const userData = await  User.findById(userId);

        if (!userData) 
        {
            return next(errorHandler(404, "User not found"));
        }

        let cartData = userData.cartData || {};

        // Helper function to get current quantity based on all variants
        const getCurrentQuantity = (cartData, itemId) => {

            let currentQty = 0;

            if (size && color) 
            {

                currentQty = cartData[itemId]?.[size]?.[color] || 0;

            } 
            else if (sauces && spices) 
            {
                const sauceKey = sauces.sort().join(',');

                const spiceKey = spices.sort().join(',');

                currentQty = cartData[itemId]?.['variants']?.[sauceKey]?.[spiceKey] || 0;

            } 
            else if (size) 
            {

                currentQty = cartData[itemId]?.[size] || 0;

            } 
            else if (color) 
            {

                currentQty = cartData[itemId]?.[color] || 0;

            } 
            else if (sauces) 
            {

                const sauceKey = sauces.sort().join(',');

                currentQty = cartData[itemId]?.['sauces']?.[sauceKey] || 0;

            } 
            else if (spices) 
            {

                const spiceKey = spices.sort().join(',');

                currentQty = cartData[itemId]?.['spices']?.[spiceKey] || 0;

            } 
            else 
            {

                currentQty = cartData[itemId] || 0;

            }

            return currentQty;
        };

        const currentQuantity = getCurrentQuantity(cartData, itemId, size, color, sauces, spices);

        if (currentQuantity + 1 > product?.instock) 
        {

            return next(errorHandler(400, "Cannot add more than available stock"));

        }

        // Helper function to update cart with all possible combinations
        const updateCartQuantity = (cartData, itemId) => {

            if (!cartData[itemId]) 
            {
                cartData[itemId] = {};
            }

            if (size && color) 
            {

                if (!cartData[itemId][size]) 
                {
                    cartData[itemId][size] = {};
                }

                if (!cartData[itemId][size][color]) 
                {
                    cartData[itemId][size][color] = 0;
                }

                cartData[itemId][size][color] += 1;

            } 
             else if (sauces && spices) 
            {

                if (!cartData[itemId]['variants']) 
                {
                    cartData[itemId]['variants'] = {};
                }

                const sauceKey = sauces.sort().join(',');

                const spiceKey = spices.sort().join(',');

                
                if (!cartData[itemId]['variants'][sauceKey]) 
                {
                    cartData[itemId]['variants'][sauceKey] = {};
                }

                if (!cartData[itemId]['variants'][sauceKey][spiceKey]) 
                {
                    cartData[itemId]['variants'][sauceKey][spiceKey] = 0;
                }

                cartData[itemId]['variants'][sauceKey][spiceKey] += 1;

            } 
            else if (size) 
            {
                if (!cartData[itemId][size]) 
                {
                    cartData[itemId][size] = 0;
                }

                cartData[itemId][size] += 1;

            } 
            else if (color) 
            {

                if (!cartData[itemId][color]) 
                {
                    cartData[itemId][color] = 0;
                }

                cartData[itemId][color] += 1;

            } 
            else if (sauces) 
            {
                if (!cartData[itemId]['sauces']) 
                {
                    cartData[itemId]['sauces'] = {};
                }

                const sauceKey = sauces.sort().join(',');

                if (!cartData[itemId]['sauces'][sauceKey]) 
                {
                    cartData[itemId]['sauces'][sauceKey] = 0;
                }

                cartData[itemId]['sauces'][sauceKey] += 1;

            } 
            else if (spices) 
            {
                if (!cartData[itemId]['spices']) 
                {
                    cartData[itemId]['spices'] = {};
                }

                const spiceKey = spices.sort().join(',');

                if (!cartData[itemId]['spices'][spiceKey]) 
                {
                    cartData[itemId]['spices'][spiceKey] = 0;
                }

                cartData[itemId]['spices'][spiceKey] += 1;

            } 
            else 
            {
                if (!cartData[itemId].quantity) 
                {
                    cartData[itemId].quantity = 0;
                }

                cartData[itemId].quantity += 1;
            }

            return cartData;
        };

        // Update cart data
        cartData = updateCartQuantity(cartData, itemId);

        // Save updated cart data
        await User.findOneAndUpdate({ _id: userId },{ cartData },{ new: true });

        res.status(200).json({
            success: true,
            message: `${product.name} is added to cart`
        });

    } 
    catch (error) 
    {
        console.error('Add to cart error:', error);

        next(errorHandler(500, "Error adding item to cart"));

    }
};


export const removeToCart = async (req, res, next) => {

    const { itemId, size, color, sauces, spices } = req.body;

    const userId = req.user.id;

    // Input validation
    if (!itemId) 
    {
        return next(errorHandler(400, "Item ID is required"));
    }

    try 
    {
        const product = await Product.findById(itemId);

        if (!product) 
        {
            return next(errorHandler(404, "Product not found"));
        }

        const userData = await User.findById(userId);

        if (!userData) 
        {
            return next(errorHandler(404, "User not found"));
        }

        let cartData = userData.cartData || {};

        // Check if the item exists in cart
        if (!cartData[itemId]) 
        {
            return next(errorHandler(404, "Item not found in cart"));
        }

        // Helper function to decrease item quantity based on variants
        const decreaseItemQuantity = (cartData, itemId) => {

            if (size && color) 
            {

                if (cartData[itemId]?.[size]?.[color]) 
                {

                    if (cartData[itemId][size][color] > 1) 
                    {
                        cartData[itemId][size][color]--;
                    } 
                    else 
                    {
                        delete cartData[itemId][size][color];

                        // Clean up empty objects
                        if (Object.keys(cartData[itemId][size]).length === 0) 
                        {
                            delete cartData[itemId][size];
                        }

                    }

                }

            } 
            else if (sauces && spices) 
            {
                const sauceKey = Array.isArray(sauces) ? sauces.sort().join(',') : sauces;

                const spiceKey = Array.isArray(spices) ? spices.sort().join(',') : spices;

                if (cartData[itemId]?.['variants']?.[sauceKey]?.[spiceKey]) 
                {

                    if (cartData[itemId]['variants'][sauceKey][spiceKey] > 1) 
                    {
                        cartData[itemId]['variants'][sauceKey][spiceKey]--;
                    } 
                    else 
                    {
                        delete cartData[itemId]['variants'][sauceKey][spiceKey];

                        // Clean up empty objects
                        if (Object.keys(cartData[itemId]['variants'][sauceKey]).length === 0)
                        {
                            delete cartData[itemId]['variants'][sauceKey];
                        }
                        if (Object.keys(cartData[itemId]['variants']).length === 0) 
                        {
                            delete cartData[itemId]['variants'];
                        }

                    }

                }

            } 
            else if (size) 
            {

                if (cartData[itemId]?.[size]) 
                {
                    if (cartData[itemId][size] > 1) 
                    {
                        cartData[itemId][size]--;
                    } 
                    else 
                    {
                        delete cartData[itemId][size];
                    }
                }

            } 
            else if (color) 
            {

                if (cartData[itemId]?.[color]) {

                    if (cartData[itemId][color] > 1) 
                    {
                        cartData[itemId][color]--;
                    } 
                    else 
                    {
                        delete cartData[itemId][color];
                    }

                }

            } 
            else if (sauces) 
            {

                const sauceKey = Array.isArray(sauces) ? sauces.sort().join(',') : sauces;

                if (cartData[itemId]?.['sauces']?.[sauceKey]) 
                {

                    if (cartData[itemId]['sauces'][sauceKey] > 1) 
                    {
                        cartData[itemId]['sauces'][sauceKey]--;
                    } 
                    else 
                    {
                        delete cartData[itemId]['sauces'][sauceKey];

                        if (Object.keys(cartData[itemId]['sauces']).length === 0) 
                        {
                            delete cartData[itemId]['sauces'];
                        }
                    }

                }

            } 
            else if (spices) 
            {
                const spiceKey = Array.isArray(spices) ? spices.sort().join(',') : spices;

                if (cartData[itemId]?.['spices']?.[spiceKey]) 
                {

                    if (cartData[itemId]['spices'][spiceKey] > 1) 
                    {
                        cartData[itemId]['spices'][spiceKey]--;
                    } 
                    else 
                    {
                        delete cartData[itemId]['spices'][spiceKey];

                        if (Object.keys(cartData[itemId]['spices']).length === 0) 
                        {
                            delete cartData[itemId]['spices'];
                        }

                    }

                }
            } 
            else 
            {

                // Decrease base product quantity
                if (cartData[itemId]?.quantity) 
                {

                    if (cartData[itemId].quantity > 1) 
                    {
                        cartData[itemId].quantity--;
                    } 
                    else 
                    {
                        delete cartData[itemId].quantity;
                    }

                }

            }

            // Remove item completely if no variants remain
            if (Object.keys(cartData[itemId]).length === 0) 
            {
                delete cartData[itemId];
            }

            return cartData;

        };

        // Decrease the item quantity
        cartData = decreaseItemQuantity(cartData, itemId);

        // Update user's cart in database
        await User.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.status(200).json({success: true, message: `Quantity decreased for ${product.name}`});

    } 
    catch (error) 
    {
        console.error('Remove from cart error:', error);

        next(error);

    }

};


export const DeleteFromCart = async (req, res, next) => {

    const { itemId, size, color, sauces, spices } = req.body;

    const userId = req.user.id;

    // Input validation
    if (!itemId) 
    {

        return next(errorHandler(400, "Item ID is required"));

    }

    try {

        const product = await Product.findById(itemId);

        if (!product) 
        {
            return next(errorHandler(404, "Product not found"));
        }

        const userData = await User.findById(userId);

        if (!userData) 
        {
            return next(errorHandler(404, "User not found"));
        }

        let cartData = userData.cartData || {};

        // Check if the item exists in cart
        if (!cartData[itemId]) 
        {
            return next(errorHandler(404, "Item not found in cart"));
        }

        // Helper function to remove item based on variants
        const removeItem = (cartData, itemId) => {

            if (size && color) {

                
                if (cartData[itemId]?.[size]?.[color]) 
                {

                    delete cartData[itemId][size][color];
                    
                    // Clean up empty objects
                    if (Object.keys(cartData[itemId][size]).length === 0) 
                    {
                        delete cartData[itemId][size];
                    }

                }

            } 
            else if (sauces && spices) 
            {
                // Remove sauce & spice combination
                const sauceKey = Array.isArray(sauces) ? sauces.sort().join(',') : sauces;

                const spiceKey = Array.isArray(spices) ? spices.sort().join(',') : spices;


                if (cartData[itemId]?.['variants']?.[sauceKey]?.[spiceKey]) 
                {
                    delete cartData[itemId]['variants'][sauceKey][spiceKey];

                    // Clean up empty objects
                    if (Object.keys(cartData[itemId]['variants'][sauceKey]).length === 0) 
                    {
                        delete cartData[itemId]['variants'][sauceKey];
                    }

                    if (Object.keys(cartData[itemId]['variants']).length === 0) 
                    {
                        delete cartData[itemId]['variants'];
                    }
                }

            } 
            else if (size) 
            {
                // Remove size variant
                if (cartData[itemId]?.[size]) 
                {
                    delete cartData[itemId][size];
                }

            } 
            else if (color) 
            {
                // Remove color variant
                if (cartData[itemId]?.[color]) 
                {
                    delete cartData[itemId][color];
                }

            } 
            else if (sauces) 
            {
                // Remove sauces variant
                const sauceKey = Array.isArray(sauces) ? sauces.sort().join(',') : sauces;

                if (cartData[itemId]?.['sauces']?.[sauceKey]) 
                {
                    delete cartData[itemId]['sauces'][sauceKey];

                    // Clean up empty objects
                    if (Object.keys(cartData[itemId]['sauces']).length === 0) 
                    {
                        delete cartData[itemId]['sauces'];
                    }

                }

            } 
            else if (spices) 
            {
                // Remove spices variant
                const spiceKey = Array.isArray(spices) ? spices.sort().join(',') : spices;

                if (cartData[itemId]?.['spices']?.[spiceKey]) 
                {

                    delete cartData[itemId]['spices'][spiceKey];

                    // Clean up empty objects
                    if (Object.keys(cartData[itemId]['spices']).length === 0) 
                    {
                        delete cartData[itemId]['spices'];
                    }

                }

            } 
            else 
            {
                // Remove base product quantity
                if (cartData[itemId]?.quantity) 
                {
                    delete cartData[itemId].quantity;
                }
            }

            // Remove item completely if no variants remain
            if (Object.keys(cartData[itemId]).length === 0) 
            {
                delete cartData[itemId];
            }

            return cartData;

        };

        // Remove the item
        cartData = removeItem(cartData, itemId);

        // Update user's cart in database
        await User.findByIdAndUpdate(userId,{ cartData },{ new: true });


        res.status(200).json({success: true, message:`${product.name} is removed `});

    } 
    catch (error) 
    {
        console.error('Remove from cart error:', error);

        next(error);
    }
};



export const getCart = async (req, res, next) => {

    const userId = req.user.id;

    try 
    {
        const userData = await User.findById(userId);

        if (!userData) 
        {
            return next(errorHandler(404, "user not found"));
        }

        let cartData = userData.cartData || {};

        let totalProducts = 0;

        let totalPrice = 0;

        // Process cart items and format with variant details
        const formattedCartItems = await Promise.all(

            Object.entries(cartData).map(async ([itemId, variants]) => {

                const product = await Product.findById(itemId);

                if (!product) return null;

                const itemDetails = {
                    _id: itemId,
                    name: product.name,
                    type:product.type,
                    regularPrice: product.regularPrice,
                    discountPrice: product.discountPrice,
                    images: product.images,
                    variants: []
                };

                // Helper function to calculate price
                const getPrice = (product) => {

                    return product.discountPrice > 0 ? product.discountPrice : product.regularPrice;

                };

                // Process each variant type
                for (const key in variants) 
                {

                    if (key === 'variants') 
                    {
                        // Handle sauce and spice combinations
                        const sauceVariants = variants[key];

                        for (const sauceKey in sauceVariants) {
                            const spiceVariants = sauceVariants[sauceKey];
                            for (const spiceKey in spiceVariants) {
                                const quantity = spiceVariants[spiceKey];
                                const variantPrice = getPrice(product) * quantity;
                                
                                itemDetails.variants.push({
                                    type: 'sauce-spice-combination',
                                    sauces: sauceKey.split(','),
                                    spices: spiceKey.split(','),
                                    quantity: quantity,
                                    price: variantPrice
                                });

                                totalProducts += quantity;
                                totalPrice += variantPrice;
                            }
                        }

                    } 
                    else if (key === 'sauces') 
                    {
                        // Handle sauces only
                        const sauceVariants = variants[key];

                        for (const sauceKey in sauceVariants) {

                            const quantity = sauceVariants[sauceKey];

                            const variantPrice = getPrice(product) * quantity;

                            itemDetails.variants.push({
                                type: 'sauces',
                                sauces: sauceKey.split(','),
                                quantity: quantity,
                                price: variantPrice
                            });

                            totalProducts += quantity;

                            totalPrice += variantPrice;

                        }

                    } 
                    else if (key === 'spices') 
                    {
                        // Handle spices only
                        const spiceVariants = variants[key];

                        for (const spiceKey in spiceVariants) 
                        {
                            const quantity = spiceVariants[spiceKey];

                            const variantPrice = getPrice(product) * quantity;

                            itemDetails.variants.push({
                                type: 'spices',
                                spices: spiceKey.split(','),
                                quantity: quantity,
                                price: variantPrice
                            });

                            totalProducts += quantity;

                            totalPrice += variantPrice;

                        }

                    } 
                    else if (key === 'quantity') 
                    {

                        // Handle base product without variants
                        const quantity = variants[key];

                        const variantPrice = getPrice(product) * quantity;

                        itemDetails.variants.push({
                            type: 'base',
                            quantity: quantity,
                            price: variantPrice
                        });

                        totalProducts += quantity;

                        totalPrice += variantPrice;

                    } 
                    else if (typeof variants[key] === 'object') 
                    {
                        // Handle size and color combinations
                        for (const nestedKey in variants[key]) 
                        {
                            const quantity = variants[key][nestedKey];

                            const variantPrice = getPrice(product) * quantity;

                            itemDetails.variants.push({
                                type: 'size-color-combination',
                                size: key,
                                color: nestedKey,
                                quantity: quantity,
                                price: variantPrice
                            });

                            totalProducts += quantity;

                            totalPrice += variantPrice;

                        }

                    } 
                    else 
                    {
                        // Handle single variant (size or color only)
                        const quantity = variants[key];

                        const variantPrice = getPrice(product) * quantity;

                        // Determine if it's a size or color
                        const variantType = product.sizes?.includes(key) ? 'size' : 'color';
                        
                        itemDetails.variants.push({
                            type: variantType,
                            [variantType]: key,
                            quantity: quantity,
                            price: variantPrice
                        });

                        totalProducts += quantity;

                        totalPrice += variantPrice;

                    }

                }

                return itemDetails;

            })

        );

        // Filter out null items (products that weren't found)
        const validCartItems = formattedCartItems.filter(item => item !== null);

        res.status(200).json({
            success: true,
            cart: {
                items: validCartItems,
                totalProducts,
                totalPrice: Number(totalPrice.toFixed(2)),
                currency: 'USD'
            }
        });

    } 
    catch (error) 
    {
        console.error('Get cart error:', error);

        next(error);

    }

};