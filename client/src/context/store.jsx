
import axios from "axios"
import { createContext,useEffect,useState } from "react"
import { IoHomeOutline } from "react-icons/io5"
import { MdLiquor } from "react-icons/md";
import { RiDrinks2Line } from "react-icons/ri";
import { GiClothes } from "react-icons/gi";
import { IoRestaurantSharp } from "react-icons/io5"; 




export const StoreContext = createContext(null)



export default function StoreContextProvider(props)
{

    const url = "https://cooping-server.onrender.com"

    const [token, setToken] = useState(localStorage.getItem("token"))

    const [NavLinks ,setNavLinks] = useState([
        {
            path:"/",
            name:"Home",
            icon:<IoHomeOutline />
        },
        {
            path:"/drink",
            name:"Drink",
            icon:<RiDrinks2Line />
        },
        {
            path:"/food",
            name:"Food",
            icon:<IoRestaurantSharp />
        },
        {
            path:"/liqour",
            name:"Liqour",
            icon:<MdLiquor />
        },
        {
            path:"/merchendise",
            name:"Merchendise",
            icon:<GiClothes />
        },
    ])

    const [open ,setOpen] = useState(false)

    const [openDelete , setOpenDelete] = useState(false)

    const [cartItems , setCartItems] = useState([])

    const [ cartNumber , setCartNumber] = useState(null)

    const [ cartTotal , setCartTotal] = useState(null)

    const [cartLoading , setCartLoading] = useState(false)

    const [cartError , setCartError] = useState(false)

    const [products ,setProducts] = useState([])

    const Food = products.filter(product => product.type === 'Food')

    const Merchendise = products.filter(product => product.type === 'Merchendise')

    const Liqour = products.filter(product => product.type === 'Liqour')

    const Drink = products.filter(product => product.type === 'Drink')

    const [productLoading , setProductLoading] = useState(false)

    const [productError , setProductError] = useState(false)

    const [categorys ,setCategorys] = useState([])

    const [categoryLoading ,setCategoryLoading] = useState(false)

    const [categoryError , setCategoryError ] = useState(false)

    const [collections ,setCollections] = useState([])

    const [collectionLoading ,setCollectionLoading] = useState(false)

    const [collectionError , setCollectionError ] = useState(false)

    const [sauces ,setSauces] = useState([])

    const [sauceLoading ,setSauceLoading] = useState(false)

    const [sauceError , setSauceError ] = useState(false)

    const [spices ,setSpices] = useState([])

    const [spiceLoading ,setSpiceLoading] = useState(false)

    const [spiceError , setSpiceError ] = useState(false)

    const [sizes ,setSizes] = useState([])

    const [sizeLoading ,setSizeLoading] = useState(false)

    const [sizeError , setSizeError ] = useState(false)

    const [colors ,setColors] = useState([])

    const [colorLoading ,setColorLoading] = useState(false)

    const [colorError , setColorError ] = useState(false)

    const [roles ,setRoles] = useState([])

    const [roleLoading ,setRoleLoading] = useState(false)

    const [roleError , setRoleError ] = useState(false)

    const [deliveries ,setDeliveries] = useState([])

    const [deliveryLoading , setDeliveryLoading] = useState(false)

    const [deliveryError , setDeliveryError] = useState(false)

    const [orders ,setOrders] = useState([])

    const [ordersLoading , setOrdersLoading] = useState(false)

    const [ordersError , setOrdersError] = useState(false)


    const [faqs , setFaqs] = useState([])

    const [fetchFAQLoading , setFetchFAQLoading ] = useState(false)

    const [fetchFAQError , setFetchFAQError ] = useState(false)



    // fetchProduct
    const fetchProducts = async () => {

        try
        {
            setProductLoading(true)

            setProductError(false)

            const res = await axios.get(url + "/api/product/get-products")

            if(res.data.success)
            {
                setProductLoading(false)

                setProducts(res.data.products)
            }


        }
        catch(error)
        {
            console.log(error.message)

            setProductError(true)
        }

    }

    // fetchCategory
    const fetchCategorys = async () => {

        try
        {
            setCategoryError(false)


            setCategoryLoading(true)

            const res = await axios.get(url + "/api/variant/category/get-categorys",{headers:{token}})

            if(res.data.success)
            {
                setCategoryLoading(false)


                setCategorys(res.data.categorys)
            }

        }
        catch(error)
        {
            setCategoryError(true)
        }

    }
    

    // fetchCollections
    const fetchCollections = async () => {

        try
        {
            setCollectionError(false)

            setCollectionLoading(true)

            const res = await axios.get(url +"/api/variant/collection/get-collections",{headers:{token}})

            if(res.data.success)
            {
                setCollectionLoading(false)

                setCollections(res.data.collections)
            }

        }
        catch(error)
        {

            setCollectionError(true)

            setCollectionLoading(false)

            console.log(error.message)
        }

    }

    // fetctSauces
    const fetchSauces = async () => {

        try
        {
            setSauceError(false)

            setSauceLoading(true)

            const res = await axios.get(url +"/api/variant/sauce/get-sauces",{headers:{token}})

            if(res.data.success)
            {
                setSauceLoading(false)

                setSauces(res.data.sauces)
            }

        }
        catch(error)
        {

            setSauceError(true)

            setSauceLoading(false)

            console.log(error.message)
        }

    }

    // fetchSpice
    const fetchSpices = async () => {

        try
        {
            setSpiceError(false)

            setSpiceLoading(true)

            const res = await axios.get(url + "/api/variant/spice/get-spices",{headers:{token}})

            if(res.data.success)
            {
                setSpiceLoading(false)

                setSpices(res.data.spices)
            }

        }
        catch(error)
        {
            setSpiceError(true)
        }

    }

    // fetchColor
    const fetchColors = async () => {

        try
        {
            setColorError(false)

            setColorLoading(true)

            const res = await axios.get(url + "/api/variant/color/get-colors",{headers:{token}})

            if(res.data.success)
            {
                setColorLoading(false)

                setColors(res.data.colors)
            }

        }
        catch(error)
        {
            setColorError(true)
        }

    }

    // fetchSize
    const fetchSizes = async () => {

        try
        {
            setSizeError(false)

            setSizeLoading(true)

            const res = await axios.get(url + "/api/variant/size/get-sizes",{headers:{token}})

            if(res.data.success)
            {
                setSizeLoading(false)

                setSizes(res.data.sizes)
            }

        }
        catch(error)
        {
            setSizeError(true)
        }

    }

    // fetchRole
    const fetchRoles = async () => {

        try
        {
            setRoleError(false)

            setRoleLoading(true)

            const res = await axios.get(url + "/api/variant/Role/get-Roles",{headers:{token}})

            if(res.data.success)
            {
                setRoleLoading(false)

                setRoles(res.data.roles)
            }

        }
        catch(error)
        {
            setRoleError(true)
        }

    }

    // fetchDelivery
    const fetchDelivery = async () => {

        try
        {
            setDeliveryError(false)

            setDeliveryLoading(true)

            const res = await axios.get(url + "/api/delivery/get-deliveries")

            if(res.data.success)
            {
                setDeliveryLoading(false)

                setDeliveries(res.data.deliveries)
            }

        }
        catch(error)
        {
            setDeliveryLoading(false)

            setDeliveryError(false)

            console.log(error.message)
        }

    }


    // fetchCart
    const fetchCart = async () => {

        try
        {
            setCartLoading(true)

            setCartError(false)

            const res = await axios.get(url + "/api/cart/get-cart",{headers:{token}})

            if(res.data.success)
            {

                setCartLoading(false)

                setCartItems(res.data.cart.items)

                setCartNumber(res.data.cart.totalProducts)

                setCartTotal(res.data.cart.totalPrice)

            }

        }
        catch(error)
        {
            console.log(error.message)

            setCartError(true)
        }

    }

    // fetchOrders
    const fetchOrders = async () => {

        try
        {
            setOrdersLoading(true)

            setOrdersError(false)

            const res = await axios.get(url + "/api/order/get-userOrders",{headers:{token}})

            if(res.data.success)
            {

                setOrdersLoading(false)

                setOrders(res.data.orders)


            }

        }
        catch(error)
        {
            console.log(error.message)

            setOrdersLoading(false)

            setOrdersError(true)
        }

    }

    

    // fetchFAQS
    const fetchFAQS = async () => {

        try
        {
            setFetchFAQError(false)

            setFetchFAQLoading(true)

            const res = await axios.get(url + "/api/faq/get-faqs")

            if(res.data.success)
            {
                setFetchFAQLoading(false)
                
                setFaqs(res.data.faqs)
            }

        }

        catch(error)
        {
            console.log(error.message)

            setFetchFAQError(true)

            setFetchFAQLoading(false)
        }

    }


    useEffect(() => {

        fetchProducts()

        fetchCategorys()

        fetchCollections()

        fetchSpices()

        fetchSauces()

        fetchColors()

        fetchSizes()

        fetchRoles()

        fetchDelivery()

        fetchOrders()

        fetchFAQS()

    },[])


    


    useEffect(() => {

        fetchCart()


    },[token])

    
    const contextValue = {
        url,
        token,setToken,
        NavLinks , setNavLinks,
        open , setOpen,
        openDelete , setOpenDelete,
        products , setProducts,
        Food , Merchendise,
        Liqour , Drink ,
        productLoading , setProductLoading,
        productError , setProductError,
        fetchProducts,
        categorys , setCategorys,
        categoryLoading , setCategoryLoading,
        categoryError , setCategoryError,
        fetchCategorys,
        collections , setCollections,
        collectionLoading , setCollectionLoading,
        collectionError , setCollectionError,
        fetchCollections,
        spices , setSpices,
        spiceLoading , setSpiceLoading,
        spiceError , setSpiceError,
        fetchSpices,
        sizes ,setSizes,
        sizeLoading , setSizeLoading,
        sizeError , setSizeError,
        fetchSizes,
        colors , setColors,
        colorLoading , setColorLoading,
        colorError , setColorError,
        fetchColors,
        sauces , setSauces,
        sauceLoading , setSauceLoading,
        sauceError , setSauceError,
        fetchSauces,
        roles , setRoles,
        roleLoading , setRoleLoading,
        roleError , setRoleError,
        fetchRoles,
        cartItems , setCartItems,
        cartNumber , setCartNumber,
        cartTotal , setCartTotal,
        cartLoading , setCartLoading ,
        cartError , setCartError,
        fetchCart,
        deliveries, setDeliveries,
        deliveryLoading, setDeliveryLoading,
        deliveryError , setDeliveryError,
        fetchDelivery,
        orders , setOrders,
        ordersLoading , setOrdersLoading,
        ordersError , setOrdersError,
        fetchOrders,
        faqs , setFaqs,
        fetchFAQError , setFetchFAQError,
        fetchFAQLoading , setFetchFAQLoading,
        fetchFAQS
    }

    return (
        
        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>


    )
}
