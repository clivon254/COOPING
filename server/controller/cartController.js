
import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../Utils/error.js"



export const addToCart3 = async (req,res,next) => {

    const {itemId, size , color , spice , sauce} = req.body

    const userId = req.user.id

    try
    {
        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404, "product not found"))
        }

        const userData = await User.findById(userId)

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

export const addToCart = async (req, res, next) => {

    const { itemId, size, color, spices, sauces } = req.body; // Assume spices and sauces are arrays

    const userId = req.user.id;

    try {
        
        const product = await Product.findById(itemId);

        if (!product) {
            return next(errorHandler(404, "Product not found"));
        }

        const userData = await User.findById(userId);

        if (!userData) {
            return next(errorHandler(404, "User  not found"));
        }

        let cartData = userData.cartData || {};

        // Determine the current quantity in the cart
        let currentQuantity = 0;

        // Check for size and color
        if (size && color) 
        {
            currentQuantity = cartData[itemId]?.[size]?.[color] || 0;
        } 
        else if (size) 
        {
            currentQuantity = cartData[itemId]?.[size] || 0;
        } 
        else if (color) 
        {
            currentQuantity = cartData[itemId]?.[color] || 0;
        } 
        else 
        {
            currentQuantity = cartData[itemId] || 0;
        }

        // Check for spices and sauces
        if (spices && Array.isArray(spices)) {

            spices.forEach(spice => {
                currentQuantity += cartData[itemId]?.[spice] || 0;
            });

        }

        if (sauces && Array.isArray(sauces)) {

            sauces.forEach(sauce => {
                currentQuantity += cartData[itemId]?.[sauce] || 0;
            });
            
        }

        if (currentQuantity + 1 > product?.instock)
        {
            return next(errorHandler(400, "Cannot add more than available stock"));
        }

        // Update cart data
        if (size && color) 
        {

            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }

            if (!cartData[itemId][size]) {
                cartData[itemId][size] = {};
            }

            if (!cartData[itemId][size][color]) {
                cartData[itemId][size][color] = 0;
            }

            cartData[itemId][size][color] += 1;

        } else if (size) {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else if (color) {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][color] = (cartData[itemId][color] || 0) + 1;
        }

        // Handle spices
        if (spices && Array.isArray(spices)) {
            spices.forEach(spice => {
                if (!cartData[itemId]) {
                    cartData[itemId] = {};
                }
                cartData[itemId][spice] = (cartData[itemId][spice] || 0) + 1;
            });
        }

        // Handle sauces
        if (sauces && Array.isArray(sauces)) {
            sauces.forEach(sauce => {
                if (!cartData[itemId]) {
                    cartData[itemId] = {};
                }
                cartData[itemId][sauce] = (cartData[itemId][sauce] || 0) + 1;
            });
        }

        // Save updated cart data
        await User.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: `${product.name} is added to the cart` });
    } catch (error) {
        next(error);
    }
};


export const removeToCart1 = async (req,res,next) => {

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

export const addToCart4 = async (req, res, next) => {
    const { itemId, size, color, spices, sauces } = req.body
    const userId = req.user.id

    try {
        const product = await Product.findById(itemId)
        if (!product) {
            return next(errorHandler(404, "product not found"))
        }

        const userData = await User.findById(userId)
        if (!userData) {
            return next(errorHandler(404, "User not found"))
        }

        let cartData = userData.cartData || {}

        // Create a unique key for the combination of spices and sauces
        const spiceKey = spices ? spices.sort().join('-') : ''
        const sauceKey = sauces ? sauces.sort().join('-') : ''

        // Determine current quantity
        let currentQuantity = 0;

        if (size && color) {
            currentQuantity = cartData[itemId]?.[size]?.[color] || 0
        } else if (size) {
            currentQuantity = cartData[itemId]?.[size] || 0
        } else if (color) {
            currentQuantity = cartData[itemId]?.[color] || 0
        } else if (spiceKey && sauceKey) {
            currentQuantity = cartData[itemId]?.[spiceKey]?.[sauceKey] || 0
        } else if (spiceKey) {
            currentQuantity = cartData[itemId]?.[spiceKey] || 0
        } else if (sauceKey) {
            currentQuantity = cartData[itemId]?.[sauceKey] || 0
        } else {
            currentQuantity = cartData[itemId] || 0
        }

        if (currentQuantity + 1 > product?.instock) {
            return next(errorHandler(400, "Cannot add more than available stock"))
        }

        // Add to cart based on combinations
        if (spiceKey && sauceKey) {
            if (!cartData[itemId]) {
                cartData[itemId] = {}
            }
            if (!cartData[itemId][spiceKey]) {
                cartData[itemId][spiceKey] = {}
            }
            if (!cartData[itemId][spiceKey][sauceKey]) {
                cartData[itemId][spiceKey][sauceKey] = 0
            }
            cartData[itemId][spiceKey][sauceKey] += 1
        } else if (spiceKey) {
            if (!cartData[itemId]) {
                cartData[itemId] = {}
            }
            if (!cartData[itemId][spiceKey]) {
                cartData[itemId][spiceKey] = 0
            }
            cartData[itemId][spiceKey] += 1
        } else if (sauceKey) {
            if (!cartData[itemId]) {
                cartData[itemId] = {}
            }
            if (!cartData[itemId][sauceKey]) {
                cartData[itemId][sauceKey] = 0
            }
            cartData[itemId][sauceKey] += 1
        }
        // ... rest of your existing size/color logic ...

        await User.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: `${product.name} is added` })
    } catch (error) {
        next(error)
    }
}

export const addToCart2 = async (req, res, next) => {
    const { itemId, size, color, spices = [], sauces = [] } = req.body; // Default empty arrays
    const userId = req.user.id;

    try {
        const product = await Product.findById(itemId);
        if (!product) return next(errorHandler(404, "Product not found"));

        const userData = await User.findById(userId);
        if (!userData) return next(errorHandler(404, "User not found"));

        let cartData = userData.cartData || {};

        const updateCartItem = (cart, itemId, ...keys) => {
            let currentLevel = cart;
            for (const key of keys) {
                currentLevel[key] = currentLevel[key] || { quantity: 0 }; // Initialize quantity
                currentLevel = currentLevel[key];
            }
            currentLevel.quantity++;
            return cart;
        };

        const cartKeys = [itemId];
        if (size) cartKeys.push(size);
        if (color) cartKeys.push(color);

        // Process spices and sauces (now much cleaner)
        for (const item of [...spices, ...sauces]) { // Combine spices and sauces into one loop
            let currentQuantity = 0;
            let currentLevel = cartData;
            for (const key of cartKeys.slice(1)) {
                currentLevel = currentLevel?.[key];
                if (!currentLevel) break;
            }

            // Check stock *before* updating (important!)
            currentQuantity = currentLevel?.[item]?.quantity || 0;
            if (currentQuantity + 1 > product?.instock) {
                return next(errorHandler(400, `Not enough ${product.name} in stock for ${item}`));
            }

            cartData = updateCartItem(cartData, itemId, ...cartKeys.slice(1), item);
        }

        await User.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: `${product.name} added to cart` });

    } catch (error) {
        next(error);
    }
};

export const removeToCart = async (req, res, next) => {
    const { itemId, size, color, spices, sauces } = req.body
    const userId = req.user.id

    try {
        const product = await Product.findById(itemId)
        if (!product) {
            return next(errorHandler(404, "product not found"))
        }

        const userData = await User.findById(userId)
        if (!userData) {
            return next(errorHandler(404, "user not found"))
        }

        let cartData = userData.cartData || {}
        
        // Create unique keys for combinations
        const spiceKey = spices ? spices.sort().join('-') : ''
        const sauceKey = sauces ? sauces.sort().join('-') : ''

        if (spiceKey && sauceKey) {
            if (cartData[itemId]?.[spiceKey]?.[sauceKey]) {
                cartData[itemId][spiceKey][sauceKey] -= 1

                if (cartData[itemId][spiceKey][sauceKey] <= 0) {
                    delete cartData[itemId][spiceKey][sauceKey]
                }

                if (Object.keys(cartData[itemId][spiceKey]).length === 0) {
                    delete cartData[itemId][spiceKey]
                }
            } else {
                return next(errorHandler(400, "Specified combination not found"))
            }
        } else if (spiceKey) {
            if (cartData[itemId]?.[spiceKey]) {
                cartData[itemId][spiceKey] -= 1

                if (cartData[itemId][spiceKey] <= 0) {
                    delete cartData[itemId][spiceKey]
                }
            } else {
                return next(errorHandler(400, "Specified spices not found"))
            }
        } else if (sauceKey) {
            if (cartData[itemId]?.[sauceKey]) {
                cartData[itemId][sauceKey] -= 1

                if (cartData[itemId][sauceKey] <= 0) {
                    delete cartData[itemId][sauceKey]
                }
            } else {
                return next(errorHandler(400, "Specified sauces not found"))
            }
        }
        // ... rest of your existing size/color logic ...

        await User.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: `${product.name} removed from cart` })
    } catch (error) {
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

                            totalPrice += (quantity * (product.offer ? product.discountPrice : product.regularPrice))
                        }

                    }
                    else
                    {

                        const quantity = sizesOrColors[sizeOrColor]

                        totalProducts += quantity 

                        totalPrice += (quantity * (product.offer ? product.discountPrice : product.regularPrice))
                            
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



// getCart controller


export const geCart = async (req, res, next) => {

    const userId = req.user.id;

    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return next(errorHandler(404, "User not found"));
        }

        const cartData = userData.cartData || {};

        // Calculate total products and price
        let totalProducts = 0;
        let totalPrice = 0;

        for (const itemId in cartData) {
            const itemData = cartData[itemId];

            for (const key1 in itemData) { // size, spiceKey, color, sauceKey
                const optionData = itemData[key1];
                
                if(typeof optionData === 'object'){
                    for(const key2 in optionData) { //color, sauce, etc.
                        const quantity = optionData[key2]?.quantity || optionData?.quantity || 0;
                        totalProducts += quantity;

                        const product = await Product.findById(itemId);
                        if (product) {
                            totalPrice += quantity * product.price;
                        }
                    }
                } else { //no nested objects
                    const quantity = optionData?.quantity || 0;
                    totalProducts += quantity;

                    const product = await Product.findById(itemId);
                    if (product) {
                        totalPrice += quantity * product.price;
                    }
                }
            }
        }

        res.status(200).json({
            cartData,
            totalProducts,
            totalPrice,
        });

    } catch (error) {
        next(error);
    }
};


export const getCart2 = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return next(errorHandler(404, "User not found"));
        }

        const cartData = userData.cartData || {};

        let totalProducts = 0;
        let totalPrice = 0;

        for (const itemId in cartData) {
            const itemData = cartData[itemId];

            for (const key1 in itemData) {
                const optionData = itemData[key1];

                // Robustly get quantity, handling potential undefined values
                const getQuantity = (data) => {
                    if (typeof data === 'object' && data !== null && data.quantity !== undefined) {
                        return data.quantity;
                    }
                    return 0; // Default to 0 if quantity is not found
                };

                if (typeof optionData === 'object' && optionData !== null) { // Check if it's an object
                    for (const key2 in optionData) {
                        const quantity = getQuantity(optionData[key2]); // Use the helper function
                        totalProducts += quantity;

                        const product = await Product.findById(itemId);
                        if (product) {
                            totalPrice += quantity * product.price;
                        }
                    }
                } else {
                    const quantity = getQuantity(optionData); // Use the helper function
                    totalProducts += quantity;

                    const product = await Product.findById(itemId);
                    if (product) {
                        totalPrice += quantity * product.price;
                    }
                }
            }
        }

        res.status(200).json({
            cartData,
            totalProducts,
            totalPrice,
        });

    } catch (error) {
        next(error);
    }
};


export const getCart3 = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return next(errorHandler(404, "User  not found"));
        }

        const cartData = userData.cartData || {};

        let totalProducts = 0;
        let totalPrice = 0;

        for (const itemId in cartData) {
            const itemData = cartData[itemId];

            // Check if itemData is an object
            if (typeof itemData === 'object' && itemData !== null) {
                // Iterate through sizes, colors, spices, and sauces
                for (const key in itemData) {
                    const optionData = itemData[key];

                    // If optionData is an object, it may contain spices or sauces
                    if (typeof optionData === 'object' && optionData !== null) {
                        // Check for spices and sauces
                        for (const subKey in optionData) {
                            const quantity = optionData[subKey] || 0; // Default to 0 if not found
                            totalProducts += quantity;

                            const product = await Product.findById(itemId);
                            if (product) {
                                totalPrice += quantity * product.price;
                            }
                        }
                    } else {
                        // If optionData is not an object, it should be a quantity
                        const quantity = optionData || 0; // Default to 0 if not found
                        totalProducts += quantity;

                        const product = await Product.findById(itemId);
                        if (product) {
                            totalPrice += quantity * product.price;
                        }
                    }
                }
            }
        }

        res.status(200).json({
            cartData,
            totalProducts,
            totalPrice,
        });

    } catch (error) {
        next(error);
    }
};
