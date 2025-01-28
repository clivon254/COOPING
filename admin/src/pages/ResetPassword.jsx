

import React from 'react'
import LOGO from "../assets/LOGOO.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Alert } from "flowbite-react"
import axios from "axios"

export default function ResetPassword() {


    const {url} = useContext(StoreContext)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({})


    const {token} = useParams()


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

            const res = await axios.post(url + `/api/auth/reset-password/${token}`,formData)

            if(res.data.success)
            {
                
                setLoading(false)

                toast.success("Link sent to your email")

                setFormData({})

                Navigate("/sign-in")

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

                    {/* logo */}
                    <div className="h-20 w-60">

                        <img 
                            src={LOGO}
                            alt="" 
                            className="w-full h-full" 
                        />

                    </div>

                    {/* title */}
                    <div className="">

                        <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Reset Password
                        </h1> 

                    </div>

                </div>

                {/* form */}
                <div className="w-full max-w-md mx-auto">

                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                        {/* password */}
                        <div className="flex flex-col gap-y-1">

                            <label  className="block text-sm/6 font-medium text-gray-900">password</label>

                            <input 
                                type="password" 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                                placeholder='**********'
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                            />

                        </div>

                        {/* confirm password */}
                        <div className="flex flex-col gap-y-1">

                            <label  className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>

                            <input 
                                type="password" 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                                placeholder='**********'
                                name="confirmPassword"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />

                        </div>               

                        {/* button */}
                        <button 
                            className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed disabled:bg-[#FF9900]/80 cursor-pointer"
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
                          ("Sign in ")
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
