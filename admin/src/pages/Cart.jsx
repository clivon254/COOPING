

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io"
import { FaMinus } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'sonner';


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
  
  console.log(cartNumber)

  console.log(cartItems)

  // console.log(cartItems.mp)
 
  return (
    
    <>

        {!cartLoading && !cartError && (

          <>

            {cartNumber > 0 ? 
              (

                <section className="w-full p-5 space-y-10">

                  {/* headers */}
                  <div className="flex items-center justify-between">

                    <h1 className="tracking-tighter text-2xl md:text-3xl 2xl:text-5xl font-semibold">Shopping Cart</h1>

                    <h2 className="text-sm font-semibold underline cursor-pointer">continue shopping</h2>

                  </div>


                  {/* cart */}
                  <div className="w-full ">

                    {/* table */}
                    <div className="w-full flex flex-col gap-y-5">

                      {cartItems?.map((product) => {

                        const Item = products.find(item => item._id === product._id)

                        return  (

                        <div className="w-full flex items-start gap-x-5">

                          {/* image */}
                          <div className="min-h-20 min-w-20 max-h-20 max-w-20">

                            <img 
                              src={product?.images[0]} 
                              alt="" 
                              className="h-full w-full rounded-md shadow-2xl" 
                            />

                          </div>

                          <div className="flex gap-x-5 gap-y-2">

                            {/* Details */}
                            <div className="flex flex-col gap-y-3">

                              <span className="text-base font-semibold capitalize">{product?.name}</span>

                              {product?.variants?.map((variant,index) => {

                                const Item = products.find(item => item._id === product._id)

                                if(product?.type === 'Food')
                                  {
                                      
                                    if(Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                                    {

                                      return (

                                        <>

                                          <span className="">sauces:{variant?.sauces?.map((vant) => (vant)).join(",")} </span>

                                        </>

                                      )

                                    }
                                    else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none"))
                                    {

                                      return (

                                        <>

                                          <span className="">spices:{variant?.spices?.map((vant) => (vant)).join(",")} </span>

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

                                          <span className="text-sm text-gray-700">

                                            <span>sauces</span>:{variant?.sauces?.map((vant) => (vant)).join(",")}

                                          </span>

                                          <span className="text-sm text-gray-700">

                                             <span>spices</span>:{variant?.spices?.map((vant) => (vant)).join(",")} 

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
      
                                            <span className="text-xs">size:{variant?.sizes} </span>
      
                                          </>
      
                                        )
      
                                      }
                                      else if(Item?.sizes?.length === 1 && Item?.sizes?.some(size => size.name === "none"))
                                      {
      
                                        return (
      
                                          <>
      
                                            <span className="text-sm">color:{variant?.colors} </span>
      
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

                                            <span className="text-sm">size:{variant?.size} </span>
      
                                            <span className="text-sm">color:{variant?.color} </span>

                                          </>
      
                                        )
      
                                      }
      
                                  }

                              })}

                            </div>
                            
                            {/* price */}
                            <div className="">

                              {product?.discountPrice > 0 
                                ?
                                product?.discountPrice.toLocaleString('en-Kenya',{style:'currency', currency:'KES'}) 
                                : 
                                product?.regularPrice.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})
                              }

                            </div>

                            {/* quantity */}
                            <span className="flex items-center justify-between  shadow-2xl border border-gray-100 ">

                              <span 
                                  className="bg-[#FF9900] p-1 rounded-full text-white cursor-pointer" 
                                  onClick={() => addToCart(product)}
                              >
                                <RiAddLargeFill />
                              </span>

                              <span className="text-xl">{product?.variants?.map((variant) => (variant.quantity))}</span>

                              <span 
                                className="bg-[#FF9900] p-1 rounded-full text-white cursor-pointer"
                                onClick={() => removeFromCart(product)}
                              >
                                <FaMinus />
                              </span>

                            </span>

                          </div>

                        </div>

                        )

                      })}

                    </div>

                  </div>


                  {/* featured */}
                  <div className=""></div>

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

          <></>

        )}

        {cartError && (

          <Error retry={fetchCart}/>

        )}

  </>
    

  )

}
