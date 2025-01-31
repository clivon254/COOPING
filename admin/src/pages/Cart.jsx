

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



export default function Cart() {

  const {url,token,cartItems,cartTotal,cartNumber,cartLoading,cartError} = useContext(StoreContext)

  const navigate = useNavigate()

  console.log(cartNumber)

  console.log(cartItems)
 
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
                    <div className="w-full flex flex-col ">

                      {cartItems?.map((product) => (

                        <div className="w-full">

                          {/* image */}
                          <div className="min-h-20 min-w-20 max-w-20 max-h-20">

                            <img 
                              src={product?.image[0]} 
                              alt="" 
                              className="h-full w-full rounded-md shadow-2xl" 
                            />

                          </div>

                          {/* Details */}
                          <div className="">

                            <span className="">{product?.name}</span>

                            {product?.variants?.map((variant) => (

                              <span className=""></span>

                            ))}
                          </div>

                        </div>

                      ))}

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

          <Error/>

        )}

  </>
    

  )

}
