

import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import {Toaster} from "sonner"
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashBoard from './pages/DashBoard'
import Header from './components/Header'
import DashSidebar from './components/DashSidebar'
import Profile from './pages/Profile'
import Food from './pages/Food'
import Drink from './pages/Drink'
import Merchendise from './pages/Merchendise'
import Liqour from './pages/Liqour'
import Event from './pages/Event'
import AddFood from './pages/AddFood'
import UpdateFood from './pages/UpdateFood'
import ProductPage from './pages/ProductPage'



const LayOut = () => {

    const {currentUser} = useSelector(state => state.user)

    return(

      currentUser?.isAdmin  ?

      <div className="w-full h-screen flex flex-col">

        <Header/>

        <div className="w-full flex border-t shadow-xl">

          {/* sidebar */}
          <div className="p-5 hidden lg:flex lg:w-[20%] overscroll-y-auto border-r border-zinc-700 ">

            <DashSidebar/>

          </div>

          {/* main side */}
          <div className="w-full lg:w-[80%] overflow-y-scroll overflow-hidden">

            <Outlet/>

          </div>

        </div>

      </div>
      
      :
      <Navigate to="/sign-in"/>
    )

}


export default function App() {

  return (

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Toaster richColors/>

        <Routes>

          <Route element={<LayOut/>}>

              <Route path="/" element={<DashBoard/>}/>

              <Route path="/profile" element={<Profile/>}/>

              <Route path="/food" element={<Food/>}/>

              <Route path="/update-food/:foodId" element={<UpdateFood/>}/>

              <Route path="/add-food" element={<AddFood/>}/>

              <Route path="/product/:productId" element={<ProductPage/>}/>

              <Route path="/drink" element={<Drink/>}/>

              <Route path="/merchendise" element={<Merchendise/>}/>

              <Route path="/liquor" element={<Liqour/>}/>

              <Route path="/event" element={<Event/>}/>


          </Route>

          <Route path="/landing-page" element={<LandingPage/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          <Route path="/sign-in" element={<SignIn/>}/>

           
        </Routes>

      </main>
    
    </BrowserRouter>

  )
}
