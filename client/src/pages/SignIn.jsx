

import React, { useEffect } from 'react'
import LOGO from "../assets/LOGOO.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess, signOutSuccess } from '../redux/user/userSlice'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Alert } from "flowbite-react"
import axios from "axios"
import Divider from '../components/Divider'
import OAuth from '../components/OAuth'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import Loading from '../components/Loading'

 
export default function SignIn() {


    const {url,setToken} = useContext(StoreContext)

    const {loading,error} = useSelector(state => state.user)

    const [formData, setFormData] = useState({})

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [showPassword , setShowPassword] = useState(false)


    // togglePasswordVisibility
    const togglePasswordVisibilty = () => {

        setShowPassword(!showPassword)
    }


    // handleChange
    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]:e.target.value})

    }


    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            dispatch(signInStart())

            const res = await axios.post(url + "/api/auth/login",formData)

            if(res.data.success)
            {
                navigate(-1)

                toast.success("You have successfully sign")

                dispatch(signInSuccess(res.data.rest))

                localStorage.setItem("token", res.data.token)

                setToken(res.data.token)
            }
            
        }
        catch(error)
        {
            if(error.response)
            {
                const errorMessage = error.response.data.message

                dispatch(signInFailure(errorMessage))

                console.log(errorMessage)
            }
            else
            {
                console.log(error.message)

                dispatch(signInFailure(error.message))
            }

        }

    }


    console.log(formData)
    

    useEffect(() => {
    
        window.scrollTo(0,0)
        
    },[])


  return (

    <main className="w-full flex items-center justify-center p-8">

        <div className="w-full flex flex-col gap-y-5 max-w-md mx-auto">

            {/* header */}
            <div className="w-full flex flex-col items-center justify-center gap-y-5">

                {/* title */}
                <div className="">

                    <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h1>

                </div>

            </div>

            {/* form */}
            <div className="w-full ">

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

                    {/* password */}
                    <div className="flex flex-col gap-y-1">

                        <label className="block text-sm/6 font-medium text-gray-900">password</label>

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
                                onClick={togglePasswordVisibilty}
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

                    {/* dont have account  && forgot-password */}
                    <div className="flex items-center justify-between">
                        
                        <span className="block text-xs/6 font-medium text-blue-600">

                            <Link to="/sign-up">
                                Dont have an account ? <span className="text-[#ff9900] hover:underline"> click here </span>
                            </Link>

                        </span>
                        
                        <span className="block text-xs/6 font-medium text-gray-900">

                            <Link to="/forgot-password">
                                Forgot password ?
                            </Link>

                        </span>

                    </div>

                    {/* button */}
                    <button 
                        className="flex w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-md hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
                        disabled={loading}
                        type="submit"
                    >

                        {loading ?
                        (
                            <Loading/>
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

            <Divider label={"or"}/>

            <OAuth/>

        </div>

    </main>

  )
}
