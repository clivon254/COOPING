import axios from "axios"
import { createContext,useEffect,useState } from "react"



export const StoreContext = createContext(null)


export default function StoreContextProvider(props)
{

    const url = "http://localhost:3500"

    const [token, setToken] = useState(localStorage.getItem("token"))

    const [open ,setOpen] = useState(false)

    const [openDelete , setOpenDelete] = useState(false)

    const [products ,setProducts] = useState([])

    const [productLoading , setProductLoading] = useState(false)

    const [productError , setProductError] = useState(false)


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

    useEffect(() => {

        fetchProducts()

    },[])

    const contextValue = {
        url,
        token,setToken,
        open , setOpen,
        openDelete , setOpenDelete,
        products , setProducts,
        productLoading , setProductLoading,
        productError , setProductError,
        fetchProducts,
    }

    return (
        
        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>


    )
}