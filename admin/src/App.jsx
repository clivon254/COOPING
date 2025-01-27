

import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Toaster} from "sonner"
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'



const LayOut = () => {


}


export default function App() {

  return (

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Toaster richColors/>

        <Routes>

          <Route element={<LayOut/>}>
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
