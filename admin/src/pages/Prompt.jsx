

import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { StoreContext } from '../context/store'
import axios from "axios"
import {toast} from "sonner"
import {useNavigate} from "react-router-dom"
import {Alert} from "flowbite-react"



export default function Prompt() {

  const {url,token} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [loading , setLoading] = useState(false)

  const [error , setError] = useState(null)

  const navigate = useNavigate()

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    // if(!formData?.orderNumber || formData?.orderNumber === "")
    // {
    //   return setError("please provide Order Number")
    // }
    

    try
    {
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/order/prompt-customer",formData,{headers:{token}})

      if(res.data.success)
      {
          toast.success("prompt sent to your phone")

          const orderId = res.data.order._id

          const CheckoutRequestId = res.data.resData.CheckoutRequestID 
            
          navigate(`/confrim-payment/${CheckoutRequestId}/${orderId}`)

          setFormData({})
      }

    }
    catch(error)
    {

       setLoading(false)

        if(error.response)
        {

          setError(error.response.data.message)

        }
        else
        {
          setError(error.message)
        }

    }

  }

  return (

    <section className="w-full p-5 space-y-10">

        {/* header */}
        <div className="">

          <h2 className=" text-4xl/9 font-bold">Prompt Customer </h2>

        </div>

        {/* prompt */}
        <div className="w-full max-w-xl">

          <form  onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col gap-y-1">

              <label htmlFor="" className="text-base font-semibold">Order Number</label>

              <input 
                type="text" 
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6" 
                placeholder='enter order number . . . . '
                value={formData.orderNumber}
                name="orderNumber"
                onChange={handleChange}
              />

            </div>

            <button 
              className="w-full bg-[#FF9900] rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl"
              type="submit"
              disabled={loading}
            >
              {loading ? ("loading . . . ") : ("submit")}
            </button>

          </form>

        </div>

        {error && (

          <Alert color="failure">{error}</Alert>

        )}

    </section>

  )

}
