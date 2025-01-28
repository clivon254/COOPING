

import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import {Toaster} from "sonner"
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashBoard from './pages/DashBoard'



const LayOut = () => {

    const {currentUser} = useSelector(state => state.user)

    return(

      currentUser?.isAdmin  ?

      <div className=""></div>
      
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
