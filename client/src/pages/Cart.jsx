

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io"
import { FaMinus, FaTrashAlt } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'sonner';
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ProductCard from '../components/ProductCard';
import Loader from '../components/loader';
import Title from '../components/Title';
import SlidingProducts from '../components/SlidingProducts';


export default function Cart() {

  const {url,token,cartItems,cartTotal,cartNumber,cartLoading,cartError,products,fetchCart} = useContext(StoreContext)

  const navigate = useNavigate()

  // addtocart
  const addToCart = async (product,Item) => {
    
  
    let data ;

    if(product?.type === "Food")  
    {

      if(product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {

          data = {
            itemId:product?._id,
            spices:product?.variants?.map((vant) => (vant?.spices))
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none"))
      {
        

          data = {
            itemId:product?._id,
            sauces:product?.variants?.map((vant) => (vant?.sauces))
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none") && product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {
          data={
            itemId:product?._id,
          }
      }
      else
      {

        data={
          itemId:product._id,
          spices:product?.variants?.map((vant) => (vant?.spices)),
          sauces:product?.variants?.map((vant) => (vant?.sauces))
        }

      }

    }
    else if(product?.type === "Merchendise")
    {

      if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none"))
      {
        
          data={
            itemId:product._id,
            color:product?.variants?.map((vant) => (vant?.color))
          }

      }
      else if(product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

          data={
            itemId:product._id,
            size:product?.variants?.map((vant) => (vant?.size))
          }
      }
      else if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none") && product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

        data={
          itemId:product._id,
        }

      }
      else
      {

        data={
          itemId:product._id,
          size:product?.variants?.map((vant) => (vant?.size)),
          color:product?.variants?.map((vant) => (vant?.color))
        }

      }

    }
    else
    {
      
        data = {
          itemId:product?._id
        }

    }

    console.log(data)


    try
    {
       
      const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

      if(res.data.success)
      {

        toast.success(res.data.message)

        fetchCart()

      }

    }
    catch(error)
    {

      if(error.response)
      {

        const errorMessage = error.response.data.message 

        console.log(errorMessage)

      }
      else
      {

        console.log(error.message)

      }

    }

  }

  // removeFromcart
  const removeFromCart = async (product,Item) => {
    
  
    let data ;

    if(product?.type === "Food")  
    {

      if(product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {

          data = {
            itemId:product?._id,
            spices:product?.variants?.map((vant) => (vant?.spices))
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none"))
      {
        

          data = {
            itemId:product?._id,
            sauces:product?.variants?.map((vant) => (vant?.sauces))
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none") && product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {
          data={
            itemId:product?._id,
          }
      }
      else
      {

        data={
          itemId:product._id,
          spices:product?.variants?.map((vant) => (vant?.spices)),
          sauces:product?.variants?.map((vant) => (vant?.sauces))
        }

      }

    }
    else if(product?.type === "Merchendise")
    {

      if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none"))
      {
        
          data={
            itemId:product._id,
            color:product?.variants?.map((vant) => (vant?.color))
          }

      }
      else if(product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

          data={
            itemId:product._id,
            size:product?.variants?.map((vant) => (vant?.size))
          }
      }
      else if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none") && product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

        data={
          itemId:product._id,
        }

      }
      else
      {

        data={
          itemId:product._id,
          size:product?.variants?.map((vant) => (vant?.size)),
          color:product?.variants?.map((vant) => (vant?.color))
        }

      }

    }
    else
    {
      
        data = {
          itemId:product?._id
        }

    }

    console.log(data)


    try
    {
       
      const res = await axios.post(url + "/api/cart/remove-cart",data,{headers:{token}})

      if(res.data.success)
      {

        toast.success(res.data.message)

        fetchCart()

      }

    }
    catch(error)
    {

      if(error.response)
      {

        const errorMessage = error.response.data.message 

        console.log(errorMessage)

      }
      else
      {

        console.log(error.message)

      }

    }

  }

  // removeFromcart
  const DeleteFromCart = async (product,Item) => {
    
  
    let data ;

    if(product?.type === "Food")  
    {

      if(product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {

          data = {
            itemId:product?._id,
            spices:product?.variants?.map((vant) => (vant?.spices))
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none"))
      {
        

          data = {
            itemId:product?._id,
            sauces:product?.variants?.map((vant) => (vant?.sauces))
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none") && product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {
          data={
            itemId:product?._id,
          }
      }
      else
      {

        data={
          itemId:product._id,
          spices:product?.variants?.map((vant) => (vant?.spices)),
          sauces:product?.variants?.map((vant) => (vant?.sauces))
        }

      }

    }
    else if(product?.type === "Merchendise")
    {

      if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none"))
      {
        
          data={
            itemId:product._id,
            color:product?.variants?.map((vant) => (vant?.color))
          }

      }
      else if(product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

          data={
            itemId:product._id,
            size:product?.variants?.map((vant) => (vant?.size))
          }
      }
      else if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none") && product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

        data={
          itemId:product._id,
        }

      }
      else
      {

        data={
          itemId:product._id,
          size:product?.variants?.map((vant) => (vant?.size)),
          color:product?.variants?.map((vant) => (vant?.color))
        }

      }

    }
    else
    {
      
        data = {
          itemId:product?._id
        }

    }

    console.log(data)


    try
    {
       
      const res = await axios.post(url + "/api/cart/delete-cart",data,{headers:{token}})

      if(res.data.success)
      {

        toast.success(res.data.message)

        fetchCart()

      }

    }
    catch(error)
    {

      if(error.response)
      {

        const errorMessage = error.response.data.message 

        console.log(errorMessage)

      }
      else
      {

        console.log(error.message)

      }

    }

  }
  
 

  console.log(cartItems)

 
  return (
    
    <>

        {!cartLoading && !cartError && (

          <>

            {cartNumber > 0 ? 
              (

                <section className="w-full p-5 space-y-20">

                  {/* headers */}
                  <div className="flex items-center justify-between">

                    <h1 className="tracking-tighter text-2xl md:text-3xl 2xl:text-5xl font-semibold">Shopping Cart</h1>

                    <h2 className="text-sm font-semibold underline cursor-pointer">continue shopping</h2>

                  </div>


                  {/* cart */}
                  <div className="w-full  -mt-10">

                    {/* table */}
                    <div className="w-full flex flex-col gap-y-5">

                      {cartItems?.map((product) => {

                        return  (

                        <div className="w-full flex  gap-x-5 border-b border-gray-200 p-2">

                          {/* image */}
                          <div className="min-h-20 min-w-20 max-h-20 max-w-20">

                            <img 
                              src={product?.images[0]} 
                              alt="" 
                              className="h-full w-full rounded-md shadow-2xl" 
                            />

                          </div>

                          <div className="flex-1 flex gap-x-5 justify-between">

                            {/* Details */}
                            <div className="w-[50%] flex flex-col gap-y-4">

                              <span className="text-base font-semibold capitalize">{product?.name}</span>

                              {product?.variants?.map((variant,index) => {

                                const Item = products.find(item => item._id === product._id)

                                if(product?.type === 'Food')
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

                                if(product?.type === 'Merchendise')
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
                            
                            {/* price & quantity */}
                            <div className="w-[50%] flex flex-col items-center gap-y-4 sm:flex-row sm:items-start sm:justify-between ">

                              {/* price */}
                              <div className="font-semibold text-gray-700">

                                {product?.discountPrice > 0 
                                  ?
                                  (product?.discountPrice * product?.variants?.map((variant) => (variant.quantity))).toLocaleString('en-Kenya',{style:'currency', currency:'KES'}) 
                                  : 
                                  (product?.regularPrice * product?.variants?.map((variant) => (variant.quantity))).toLocaleString('en-Kenya',{style:'currency', currency:'KES'})
                                } 
                                
                              </div>

                              {/* quantity */}
                              <div className="flex items-start justify-between">

                                <div className="flex items-center justify-between  shadow-2xl border border-gray-200 rounded-full gap-x-3 p-1">

                                  <span 
                                      className="bg-[#FF9900] p-1 rounded-full text-white cursor-pointer" 
                                      onClick={() => addToCart(product)}
                                  >
                                    <RiAddLargeFill />
                                  </span>

                                  <span className="text-base font-bold text-gray-600">
                                    {product?.variants?.map((variant) => (variant.quantity))}
                                  </span>

                                  <span 
                                    className="bg-[#FF9900] p-1 rounded-full text-white cursor-pointer"
                                    onClick={() => removeFromCart(product)}
                                  >
                                    <FaMinus />
                                  </span>

                                </div>

                              </div>
                              
                              {/* remove */}
                              <div className="">

                                <FaTrashAlt 
                                  size={20}
                                  className="cursor-pointer text-red-600"
                                  onClick={() => DeleteFromCart(product)}
                                />

                              </div>

                            </div>

                          </div>

                        </div>

                        )

                      })}

                    </div>

                  </div>
                  
                  {/* total cart && promocode */}
                  <div className="flex flex-col-reverse sm:flex-row  gap-y-10 gap-x-14">

                      {/* coupon code */}
                      <div className="sm:w-[50%] space-y-4">

                        <h2 className="tracking-tighter text-xl md:text-2xl font-semibold">Promo code</h2>

                        {/* input */}
                        <div className="space-y-3 ">

                          <input 
                            type="text" 
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 h-14"
                            placeholder='Enter coupon code' 
                          />

                          <button 
                            className="w-full bg-black rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl"
                          >
                            Apply COUPON
                         </button>

                        </div>

                      </div>

                      {/* Cart Total */}
                      <div className="sm:w-[50%] space-y-4">

                        {/* header */}
                        <h2 className="tracking-tighter text-2xl md:text-3xl 2xl:text-5xl font-semibold">Cart Totals</h2>
                        
                        {/* subtotal */}
                        <div className="flex justify-between border-b border-gray-200 p-1">

                          <span className="tracking-tighter text-xl  font-semibold text-gray-700">Subtotal</span>

                          <span className="tracking-tighter text-base font-semibold text-gray-700">{cartTotal.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}</span>

                        </div>

                        {/* total */}
                        <div className="flex justify-between border-b border-gray-200 p-1">

                          <span className="tracking-tighter text-xl font-semibold text-gray-700">Total</span>

                          <span className="tracking-tighter text-base font-semibold text-gray-700">{cartTotal.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}</span>

                        </div>

                        {/* button */}
                        <button 
                          className="w-full bg-[#FF9900] rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl"
                          onClick={() => navigate('/check-out')}
                        >
                          PROCEED TO CHECKOUT
                        </button>
                        
                      </div>

                  </div>

                  {/* featured */}
                  <div className="flex flex-col gap-y-10">

                    <Title label={"Featured Products"}/>

                    <SlidingProducts products={products} next={"nextYouMay"} prev={"prevYouMay"}/>

                  </div>


                </section>

              ) 
              : 
              (
                <div className="w-full h-[75vh] flex justify-center items-center p-1">

                    <div className="space-y-8 ">

                      <h2 className="text-4xl text-center font-semibold tracking-tighter">Your cart is empty</h2>

                      <button 
                        className="bg-[#FF9900] text-white  h-16 px-5  text-xl rounded-md uppercase font-semibold shadow-2xl flex items-center gap-x-8 mx-auto cursor-pointer"
                        onClick={() => navigate('/')}
                      >
                        continue shoping <FaArrowRightLong size={26} className="animate-ping"/>
                      </button>

                    </div>

                </div>
              )
            }
            
          </>
            

        )}

        {cartLoading && !cartError && (

          <Loader/>

        )}

        {cartError && (

          <Error retry={fetchCart}/>

        )}

  </>
    

  )

}