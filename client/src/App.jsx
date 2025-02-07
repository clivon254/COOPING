

import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Toaster} from "sonner"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {

  return (

    <BrowserRouter>

      <Toaster richColors/>

      <main className="min-h-screen w-full flex flex-col">

        <Header/>

          <div className="flex-1">

            <Routes>

              <Route path="/" element={<Home/>}/>

            </Routes>

          </div>

        <Footer/>

      </main>

    </BrowserRouter>

  )

}
