

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



const LayOut = () => {

    const {currentUser} = useSelector(state => state.user)

    return(

      currentUser?.isAdmin  ?

      <div className="w-full h-screen flex flex-col">

        <Header/>

        <div className="w-full flex border-t shadow-xl">

          {/* sidebar */}
          <div className="px-5 hidden lg:flex overscroll-y-auto">

            <DashSidebar/>

          </div>

          {/* main side */}
          <div className="w-full flex-1 overflow-y-scroll overflow-hidden">

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
