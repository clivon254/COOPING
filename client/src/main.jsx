
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {PersistGate} from "redux-persist/lib/integration/react"
import {Provider} from "react-redux"
import './index.css'
import App from './App.jsx'
import { persistor, store } from './redux/store.js'
import StoreContextProvider from './context/store.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>

    <PersistGate persistor={persistor}>
    
      <Provider store={store}>

        <StoreContextProvider>
          
            <App />

        </StoreContextProvider>

      </Provider>
    
    </PersistGate>

  </StrictMode>,

)