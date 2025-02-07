

import React, { useContext,useEffect,useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import MPESA from "../assets/MPESA.png"
import COD from "../assets/COD.png"
import { Alert } from 'flowbite-react'
import axios from 'axios'




export default function CheckOut() {

  const {url,token,cartItems,cartTotal,cartNumber,deliveries,products} = useContext(StoreContext)

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


  // onChangeData
  const onChangeData = (e) => {

    setData({...data , [e.target.name]:e.target.value})

  }

  // placeorder
  const placeOrder = async (e) => {

    e.preventDefault()

    if(cartNumber <= 0)
    {
      navigate('/cart')
    }

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

          const res = await axios.post(url + "/api/order/stk-push",orderData,{headers:{token}})

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

            toast.success("order completed")

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

  useEffect(() => {

    if(cartNumber <= 0)
    {
      navigate('/cart')
    }

  },[cartNumber])

 
  return (
    
   <section className="w-full p-5">

      <form onSubmit={placeOrder} className="flex flex-col lg:flex-row gap-x-10  gap-y-24">

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
                  className="w-full flex items-center gap-x-5 px-3 py-5 border border-gray-400"
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
        <div className="w-full lg:w-[35%] space-y-8">

          <h2 className="text-xl font-semibold tracking-tighter">Order summary</h2>

          {/* products */}
          <div className="space-y-2">

            {cartItems?.map((item,index) => (

              <div 
                key={index}
                className="flex items-start justify-between gap-x-5"
              >

                <div className="flex items-start gap-x-5">
                  
                  {/* images */}
                  <div className="h-12 w-12 min-h-12 max-h-12 min-w-12 relative shadow">

                    <img 
                      src={item?.images[0]} 
                      alt="" 
                      className="h-full w-full rounded-md shadow-xl"
                    />

                    <span className="absolute top-0 -right-2 h-6 w-6 bg-[#FF9900] rounded-full grid place-content-center text-white text-xs font-semibold">
                      {item?.variants?.map((variant) => (variant.quantity))}
                    </span>

                  </div>

                  {/* details */}
                  <div className="flex flex-col text-xs font-medium gap-y-1">
                    
                      <span className="text-base  font-semibold capitalize">{item?.name}</span>

                      {item?.variants?.map((variant,index) => {

                        const Item = products.find(x => x._id === item._id)

                        if(item?.type === 'Food')
                        {
                          
                          //sauces
                          if(Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                          {

                            return (

                              <>

                                <span className="">

                                  <span className="text-xs font-bold text-slate-500">sauces:</span>{variant?.sauces?.map((vant) => (vant)).join(",")}

                                </span>

                              </>

                            )

                          } //spices
                          else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none"))
                          {

                            return (

                              <>

                                <span className="">

                                  <span className="text-xs font-bold text-slate-500" >spices</span>{variant?.spices?.map((vant) => (vant)).join(",")} 

                                </span>

                              </>

                            )

                          } //none
                          else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none") && Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                          {

                            return(

                              <></>

                            )

                          } // spices && sauces
                          else
                          {

                            return(

                              <>

                                <span className="text-sm text-gray-700">

                                  <span className="text-xs font-bold text-slate-500">sauces :</span> {variant?.sauces?.map((vant) => (vant)).join(",")}

                                </span>

                                <span className="text-sm text-gray-700">

                                  <span className="text-xs font-bold text-slate-500">spices :</span> {variant?.spices?.map((vant) => (vant)).join(",")} 

                                </span>

                              </>

                            )

                          }

                        }

                        if(item?.type === 'Merchendise')
                            {
                                
                              if(Item?.colors?.length === 1 && Item?.colors?.some(color => color.name === "none"))
                              {

                                return (

                                  <>

                                    <span className="text-xs">

                                      <span className="text-xs font-bold text-slate-500">size: </span>{variant?.sizes} 

                                    </span>

                                  </>

                                )

                              }
                              else if(Item?.sizes?.length === 1 && Item?.sizes?.some(size => size.name === "none"))
                              {

                                return (

                                  <>

                                    <span className="text-sm">

                                      <span className="text-xs font-bold text-slate-500">color: </span>{variant?.colors} 

                                    </span>

                                  </>

                                )

                              }
                              else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none") && Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                              {

                                return(

                                  <></>

                                )

                              }
                              else
                              {

                                return(

                                  <>

                                    <span className="text-sm">

                                      <span className="text-xs font-bold text-slate-500">size : </span>{variant?.size} 

                                    </span>

                                    <span className="text-sm">
                                      
                                      <span className="text-xs font-bold text-slate-500">color : </span>{variant?.color} 

                                    </span>

                                  </>

                                )

                              }

                          }

                      })}

                  </div>

                </div>
                
                {/* price */}
                <div className="text-sm text-gray-600 font-bold">
                  {item?.discountPrice > 0 
                    ?
                    (item?.discountPrice * item?.variants?.map((variant) => (variant.quantity))).toLocaleString('en-Kenya',{style:'currency', currency:'KES'}) 
                    : 
                    (item?.regularPrice * item?.variants?.map((variant) => (variant.quantity))).toLocaleString('en-Kenya',{style:'currency', currency:'KES'})
                  }
                </div>

              </div>

            ))}

          </div>

          {/* cart total */}
          <div className="space-y-4">

            {/* subtotal */}
            <div className="flex items-center justify-between border-y p-2 border-gray-300">

              <span className="text-base font-semibold tracking-tighter">Cart Total</span>

              <span className="text-sm text-gray-900 font-bold">
                {cartTotal?.toLocaleString('en-KE',{style:'currency',currency:'KES'})}
              </span>

            </div>

            {/* delivery */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-300">

              <span className="text-base font-semibold tracking-tighter">Delivery fee</span>

              <span className="text-sm text-gray-900 font-bold">
                {(delivery?.value || 0)?.toLocaleString('en-KE',{style:'currency',currency:'KES'})}
              </span>

            </div>

            {/* total */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-300">

              <span className="text-base font-semibold tracking-tighter">Total</span>

              <span className="text-sm text-gray-900 font-bold">
                {TotalAmount?.toLocaleString('en-KE',{style:'currency',currency:'KES'})}
              </span>

            </div>

          </div>

          {/* payment method */}
          <div className="space-y-4">

            <h2 className="text-xl font-semibold tracking-tighter">Payment method</h2>

            <div className="space-y-3">

              {payment.map((pay,index) => (

                <div 
                  key={index}
                  className="flex items-center gap-x-5"
                >

                  <input 
                    type="radio" 
                    name="paymentmethod" 
                    value={pay?.value}
                    onChange={(e) => setPaymentmethod(e.target.value)}
                  />

                  <div className="h-16 w-32">

                    <img 
                      src={pay?.img}
                      alt="" 
                      className="w-full h-full" 
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          <button 
            className="w-full bg-[#FF9900] rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl"
            disabled={loading}
            type="submit"
          >
            {loading 
              ? 
              (
                <div className="flex items-center justify-center gap-x-5">

                  <span className="animate-spin block h-7 w-7 rounded-full border-2 border-black  border-r-gray-200"/> placing  . . . 

                </div>
              ) 
              : 
              ("PLACE ORDER")
            }
          </button>

          {error && (

            <Alert color="failure">{error}</Alert>

          )}

        </div>

      </form>

   </section>

  )
}