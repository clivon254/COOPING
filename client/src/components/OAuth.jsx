

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup ,} from "firebase/auth"
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { IoLogoApple } from "react-icons/io5"
import axios from 'axios'
import { signInSuccess } from '../redux/user/userSlice'




export default function OAuth() {

    const {url,token,setToken,getCart} = useContext(StoreContext)

    const auth = getAuth(app)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    // handleGoogleClick
    const handleGoogleClick = async () => {

        try
        {
            const provider = new GoogleAuthProvider()

            provider.setCustomParameters({prompt:'select_account'})

            const resultsFromGoogle = await signInWithPopup(auth, provider)

            let data = {
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL
            }

            const res = await axios.post(url + "/api/auth/google",data)

            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                localStorage.setItem("token", res.data.token)

                setToken(res.data.token)

                navigate("/")

                toast.success("You have Signed in successfully")

                getCart()
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }


    // handleAppleClick
    const handleAppleClick = async () => {

        try
        {
            const provider = new OAuthProvider('apple.com')

            provider.setCustomParameters({prompt:'select_account'})

            const resultsFromApple = await signInWithPopup(auth, provider)

            let data = {
                name:resultsFromApple.user.displayName,
                email:resultsFromApple.user.email,
                applePhotoUrl:resultsFromApple.user.photoURL
            }

            const res = await axios.post(url + "/api/auth/google",data)

            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                localStorage.setItem("token", res.data.token)

                setToken(res.data.token)

                navigate("/")

                toast.success("You have Signed in successfully")

                getCart()
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }


  return (

    <div className="flex flex-col gap-y-2">

        <button 
            className="flex items-center justify-center flex-row-reverse gap-x-5 border border-gray-300 rounded-md p-3 font-semibold text-base bg-black text-white shadow-md"
            onClick={handleGoogleClick}
        >
            continue with google <FcGoogle/>
        </button>

        <button 
            className="flex items-center justify-center flex-row-reverse gap-x-5 border border-gray-300 rounded-md p-3 font-semibold text-base bg-black text-white shadow-md"
            onClick={handleAppleClick}
        >
            continue with Apple <IoLogoApple/>
        </button>

    </div>

  )

}
