

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
import Drink from './pages/Drink'
import Merchendise from './pages/Merchendise'
import Food from './pages/Food'
import Liqour from './pages/Liqour'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Orders from './pages/Orders'
import ProductReveiw from './pages/ProductReveiw'
import About from './pages/About'
import Contact from './pages/Contact'
import Faq from './pages/Faq'

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

              <Route path="/contact" element={<Contact/>}/>

              <Route path="/about" element={<About/>}/>

              <Route path="/product/:productId" element={<ProductPage/>}/>

              <Route path="/product-reveiw/:productId" element={<ProductReveiw/>}/>

              <Route path="/cart" element={<Cart/>}/>

              <Route path="/confrim-payment/:CheckoutRequestID/:orderId" element={<ConfirmPayment/>}/>

              <Route path="/check-out" element={<CheckOut/>}/>

              <Route path="/drink" element={<Drink/>}/>

              <Route path="/merchendise" element={<Merchendise/>}/>

              <Route path="/food" element={<Food/>}/>

              <Route path="/faq" element={<Faq/>}/>

              <Route path="/liqour" element={<Liqour/>}/>

              <Route path="/orders" element={<Orders/>}/>

              <Route path="/sign-in" element={<SignIn/>}/>

              <Route path="/sign-up" element={<SignUp/>}/>

              <Route path="/forgot-password" element={<ForgotPassword/>}/>

              <Route path="/reset-password/:token" element={<ResetPassword/>}/>

            </Routes>

          </div>

        <Footer/>

      </main>

    </BrowserRouter>

  )

}
