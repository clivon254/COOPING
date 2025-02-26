

import React from 'react'
import LOGO from "../assets/LOGOO.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Alert } from "flowbite-react"
import axios from "axios"
import Loading from '../components/Loading'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'




export default function ResetPassword() {


    const {url} = useContext(StoreContext)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({})


    const {token} = useParams()

    const [showPassword , setShowPassword] = useState(false)

    const [showConfirmPassword , setShowConfirmPassword] = useState(false)


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

    <main className="w-full flex items-center justify-center p-8">

        <div className="w-full flex flex-col gap-y-5">

            {/* header */}
            <div className="w-full flex flex-col items-center justify-center gap-y-5">

            
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

                        <label  className="block text-sm/6 font-medium text-gray-900">Password</label>

                        <div className="w-full relative">
                                                    
                            <input 
                                type={showPassword ? "text" : "password"}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                                placeholder='************'
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                            
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? 
                                    (<IoMdEyeOff size={20} className="text-gray-500"/>) 
                                    : 
                                    (<IoEye size={20} className="text-gray-500"/>)
                                }
                            </button>

                        </div>

                    </div> 

                    {/* confirm password */}
                    <div className="flex flex-col gap-y-1">

                        <label  className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>

                        <div className="w-full relative">
                                                    
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                                placeholder='************'
                                name="confirmPassword"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />
                            
                            <button 
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showConfirmPassword ? 
                                    (<IoMdEyeOff size={20} className="text-gray-500"/>) 
                                    : 
                                    (<IoEye size={20} className="text-gray-500"/>)
                                }
                            </button>

                        </div>

                    </div>               

                    {/* button */}
                    <button 
                        className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed disabled:bg-[#FF9900]/80 cursor-pointer"
                        disabled={loading}
                        type="submit"
                    >

                        {loading ?
                        (
                            <Loading/>
                        ) 
                        : 
                        ("Submit") 
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
