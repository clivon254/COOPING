

import React, { useContext,useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import MPESA from "../assets/MPESA.png"
import COD from "../assets/COD.png"




export default function CheckOut() {

  const {url,token,cartItems,cartTotal,deliveries} = useContext(StoreContext)

  const [data ,setData] = useState({})

  const [paymentmethod , setPaymentmethod] = useState(null)

  const [delivery ,setDelivery] = useState(null)

  const [loading ,setLoading] = useState(false)

  const [error , setError] = useState(false)

  const navigate = useNavigate()

  const [payment ,setPayment] = useState([
    {
      value:"MPESA",
      img:MPESA
    },
    {
      value:"COD",
      img:COD
    }
  ])


  let TotalAmount = Number(cartTotal) + Number(delivery?.value || 0)

  console.log(deliveries)

  // onChangeData
  const onChangeData = (e) => {

    setData({...data , [e.target.name]:e.targrt.value})

  }

  // placeorder
  const placeOrder = async () => {

    setError(null)

    setLoading(true)

    if(!paymentmethod)
    {
      return setError('please select payment method')
    }

    const orderData = {
      address:data,
      items:cartItems,
      paymentmethod,
      delivery,
      amount:TotalAmount
    }

    switch(paymentmethod)
    {

      case 'MPESA' :
        try
        {

          setLoading(true)

          setError(null)

          const res = await axios.post(url + "/api/order/mpesa",orderData,{headers:{token}})

          if(res.data.success)
          {

            setLoading(false)

            toast.success("prompt sent to your phone")

            const orderId = res.data.order._id

            const CheckoutRequestId = res.data.resData.CheckoutRequestID 
            
            navigate(`/confrim-payment/${CheckoutRequestId}/${orderId}`)

            setData({})

            setDelivery(null)

            setPaymentmethod(null)
            
          }

        }
        catch(error)
        {

          setLoading(false)

          if(error.response)
          {

            const errorMessage = error.response.data.message 

            setError(errorMessage)

          }
          else
          {

            setError(error.message)

          }

        }
        break;
      case 'COD' : 
        try
        {

          setLoading(true)

          setError(null)

          const res = await axios.post(url + "/api/order/COD" , orderData ,{headers:{token}})

          if(res.data.success)
          {
            
            setLoading(false)

            toast.success("/order completed")

            navigate('/orders')

            setPaymentmethod(null)

            setDelivery(null)

            setData({})

          }

        }
        catch(error)
        {

          setLoading(false)

          if(error.response)
          {

            const errorMessage = error.response.data.message 

            setError(errorMessage)

          }
          else
          {

            setError(error.message)

          }

        }
        break;
      default:
        
        console.log("Invalid paymentmethod selected")

        setError("select a method of paymant")

        setLoading(false)

        break;

    }

  }

 
  return (
    
   <section className="w-full p-5">

      <form className="flex flex-col lg:flex-row gap-x-10  gap-y-24">

        {/* BILLING DATA */}
        <div className="w-full lg:w-[55%] space-y-10">

          {/* contact */}
          <div className="space-y-2 w-full">
            
            <h2 className="text-base font-semibold">Contact </h2>

            <input 
              type="text" 
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
              placeholder='(07XXXXXX) *mpesa'
              name="phone"
              onChange={onChangeData}
              value={data.phone}
            />

          </div>

          {/* address info*/}
          <div className="w-full space-y-2">

              <h3 className="text-base font-semibold">Billing Address</h3>

              <div className="w-full space-y-2">

                {/* COUNTRY */}
                <input 
                  type="text" 
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
                  placeholder='KENYA'
                  name="country"
                  value={data.country}
                  onChange={onChangeData}
                />

                {/* username */}
                <div className="w-full flex flex-col lg:flex-row gap-3">

                  <input 
                    type="text" 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
                    placeholder='Firsr Name'
                    name="firstName"
                    value={data.firstName}
                    onChange={onChangeData}
                    required
                  />

                  <input 
                    type="text" 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
                    placeholder='Last Name'
                    name="lastName"
                    value={data.lastName}
                    onChange={onChangeData}
                    required
                  />

                </div>

                {/* address */}
                <input 
                  type="text" 
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
                  placeholder='Address'
                  name="address"
                  value={data.address}
                  onChange={onChangeData}
                  required
                />

                {/* state && postcode */}
                <div className="w-full flex flex-col lg:flex-row gap-3">

                  <input 
                    type="text" 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
                    placeholder='City'
                    name="City"
                    value={data.City}
                    onChange={onChangeData}
                    required
                  />

                  <input 
                    type="text" 
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 " 
                    placeholder='postcode (optional)'
                    name="postcode"
                    value={data.postcode}
                    onChange={onChangeData}
                    required
                  />



                </div>

              </div>

          </div>

          {/* shipping info */}
          <div className="w-full space-y-3">

            <h2 className="text-base font-semibold">Shipping fee</h2>

            <div className="w-full ">

              {deliveries.map((ship,index) => (

                <div 
                  className="w-full flex items-center gap-x-5 px-3 py-5 border border-gray-700"
                  key={index}
                >

                    <input 
                      type="radio" 
                      className="" 
                      onChange={() => setDelivery(ship)}
                      name={delivery}
                    />

                    <div className="flex-1 flex justify-between items-center">

                      <span className="text-sm font-semibold">{ship.place}</span>

                      <span className="text-sm font-semibold">
                        {(ship.value).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                      </span>

                    </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-[35%] space-y-3"></div>

      </form>

   </section>

  )
}
