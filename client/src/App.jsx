

import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Toaster} from "sonner"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import ConfirmPayment from './pages/ConfirmPayment'
import CheckOut from './pages/CheckOut'

export default function App() {

  return (

    <BrowserRouter>

      <Toaster richColors/>

      <main className="min-h-screen w-full flex flex-col">

        <Header/>

          <div className="flex-1">

            <Routes>

              <Route path="/" element={<Home/>}/>

              <Route path="/profile" element={<Profile/>}/>

              <Route path="/product/:productId" element={<ProductPage/>}/>

              <Route path="/cart" element={<Cart/>}/>

              <Route path="/confrim-payment/:CheckoutRequestID/:orderId" element={<ConfirmPayment/>}/>

              <Route path="/check-out" element={<CheckOut/>}/>

            </Routes>

          </div>

        <Footer/>

      </main>

    </BrowserRouter>

  )

}
