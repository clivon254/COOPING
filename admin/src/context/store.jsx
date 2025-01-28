import { createContext,useState } from "react"



export const StoreContext = createContext(null)


export default function StoreContextProvider(props)
{

    const url = "http://localhost:3500"

    const [token, setToken] = useState(localStorage.getItem("token"))

    const contextValue = {
        url
    }

    return (
        
        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>


    )
}