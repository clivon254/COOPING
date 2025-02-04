

import React, { useContext, useEffect,useState } from 'react'
import { StoreContext } from '../context/store'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { TiInputChecked } from "react-icons/ti"
import { GiCancel } from 'react-icons/gi'

export default function ConfirmPayment() {

    const {url,token,fetchCart} = useContext(StoreContext)

    const [processingPayment , setProcessingPayment] = useState(false)

    const [paymentSuccess , setPaymentSuccess] = useState(false)

    const [paymentError , setpaymentError] = useState(false)

    const [message , setMessage] = useState(null)

    const {CheckoutRequestID ,orderId} = useParams()


    const confirmPayment = async () => {

        setProcessingPayment(true)

        try
        {
            const res = await axios.post(url + `/api/order/confirm/${CheckoutRequestID}/${orderId}`,{},{headers:{token}})

            if(res.data.success)
            {

                if(res.data.data.ResultCode === "0")
                {
                    setPaymentSuccess(true)

                    setpaymentError(false)

                    setProcessingPayment(false)

                    setMessage(res.data.message)
                }
                else
                {
                    setPaymentSuccess(false)

                    setpaymentError(true)

                    setProcessingPayment(false)

                    setMessage(res.data.message)
                }

            }

            fetchCart()

        }
        catch(error)
        {   

            setPaymentSuccess(false)

            setProcessingPayment(false)

            setpaymentError(true)

            if(error.response)
            {
                const errorMessage = error.response.data.message 

                console.log(errorMessage)

                setMessage(errorMessage)
            }
            else
            {

                console.log(error.message)

                setMessage(error.message)

            }

        }
        finally
        {
            setProcessingPayment(false)
        }

    }

    useEffect(() => {

        window.scrollTo(0, 0)

        setProcessingPayment(true)

        // front-end listen for server
        const eventSource = new EventSource(url + "/api/order/event")

        const timeoutId = setTimeout(() => {

            confirmPayment()

        },45000)

        eventSource.onmessage = (event) => {

            clearTimeout(timeoutId)

            const data = JSON.parse(event.data)

            console.log("Payment update received", data)

            if(data.success)
            {
                confirmPayment()
            }
            else
            {
                confirmPayment()
            }

        }

        eventSource.onerror = (error) => {

            console.error("EventSource failed:" ,error)

        }

        return () => {

            clearTimeout(timeoutId)

            eventSource.close()

        }

    },[CheckoutRequestID,orderId])

    
  return (

    <section className="w-full ">

        {/* success */}
        {paymentSuccess && !paymentError && !processingPayment && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5 border border-zinc-200">

                    <span className="">

                        <TiInputChecked size={50} className="text-green-500"/>

                    </span>

                    <p className="text-center text-base font-medium ">
                        {message}
                    </p>

                    <button 
                        className="w-full bg-black rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl"
                    >

                        <Link
                            to="/orders"
                            // onClick={() => fetchOrder()}
                        >
                           proceed to orders
                        </Link>

                    </button>

                </div>

            </div>

        )}

        {/* processing payment*/}
        {!paymentSuccess && !paymentError && processingPayment && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5 border border-zinc-200">

                    <div className="flex items-center justify-center gap-x-5">

                        <span className="animate-spin block rounded-full h-12 w-12 border-4 border-gray-300 border-l-orange-600"/> processing . . . .

                    </div>

                    <p className="text-center text-base font-medium ">
                        This might take a minute ,do not reload the page or exit
                    </p>

                </div>

            </div>
            
        )}

        {/* payment error */}
        {paymentError  && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5 border border-zinc-200">

                    <span className="text-red-600">

                        <GiCancel size={50} />

                    </span>

                    <p className="text-center text-base font-medium ">
                        {message}
                    </p>

                    <button className="w-full bg-black rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl">

                        <Link
                            to="/cart"
                            // onClick={() => fetchOrder()}
                        >
                           back to cart
                        </Link>

                    </button>

                </div>

            </div>
            
        )}

    </section>

  )

}
