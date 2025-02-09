

import React from 'react'
import LOGO from "../assets/LOGOO.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Alert } from "flowbite-react"
import axios from "axios"

export default function ForgotPassword() {


    const {url} = useContext(StoreContext)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({})


    // handleChange
    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            setLoading(true)

            setError(null)

            const res = await axios.post(url + "/api/auth/forgot-password",formData)

            if(res.data.success)
            {
                
                setLoading(false)

                toast.success("Link sent to your email")

                setFormData({})

            }
            
        }
        catch(error)
        {
            setLoading(false)

            if(error.response)
            {
                const errorMessage = error.response.data.message

                setError(errorMessage)

                console.log(errorMessage)
            }
            else
            {
                console.log(error.message)

                setError(error.message)
            }

        }

    }

    console.log(formData)

  return (

    <main className="min-h-screen w-full flex items-center justify-center px-8">

            <div className="w-full flex flex-col gap-y-5">

                {/* header */}
                <div className="w-full flex flex-col items-center justify-center gap-y-5">

                    {/* title */}
                    <div className="space-y-5">

                        <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Enter your email
                        </h1>

                        <h3 className="text-center text-base/9 font-semibold tracking-tight text-gray-600">
                            A link will be sent to your email account to  reset the password
                        </h3>

                    </div>

                </div>

                {/* form */}
                <div className="w-full max-w-md mx-auto">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                        {/* email */}
                        <div className="flex flex-col gap-y-1">

                            <label  className="block text-sm/6 font-medium text-gray-900">email address</label>

                            <input 
                                type="email" 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                                placeholder='name@example.com'
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                            />

                        </div>               

                        {/* button */}
                        <button 
                            className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed disabled:bg-[#FF9900]/80 "
                            disabled={loading}
                            type="submit"
                        >

                          {loading ?
                          (
                            <div className="">
                                Loading . . . . 
                            </div>
                          ) 
                          : 
                          ("submit")
                          }
                        </button>

                        {error && (

                            <Alert color="failure">{error}</Alert>

                        )}

                    </form>

                </div>

            </div>

    </main>

  )
}
