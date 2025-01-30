

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Loader from '../components/loader'
import Error from '../components/Error'
import Rating from "react-rating"
import { MdStar } from 'react-icons/md'

export default function ProductPage() {

  const {url,token,products} = useContext(StoreContext)

  const {productId} = useParams()

  const [product ,setProduct] = useState({})

  const [productLoading ,setProductLoading] = useState(false)

  const [productError ,setProductError] = useState(false)

  const [image, setImage] = useState(null)




  // fetchProduct
  const fetchProduct = async () => {

    try
    {

      setProductLoading(true)

      setProductError(false)

      const res = await axios.get(url + `/api/product/get-product/${productId}`)

      if(res.data.success)
      {
        setProductLoading(false)

        setProduct(res.data.product)

        setImage(res.data.product.images[0])

      }

    }
    catch(error)
    {
      console.log(error.message)

      setProductError(true)

      setProductLoading(false)
    }

  }

  console.log(product)

  useEffect(() => {

    fetchProduct()

  },[productId])

  return (
    
    <>

      {!productError && !productLoading && (

       
        <section className="w-full p-6 ">

            {/* upper section */}
            <div className="w-full flex flex-col md:flex-row gap-x-10 gap-y-14">

                {/* left */}
                <div className="w-full  md:w-3/5 lg:w-1/2  space-y-3">

                    {/* main */}
                    <div className="max-h-[60vh] min-h-[60vh] h-[60vh] w-full border border-zinc-400">

                      <img 
                        src={image}
                        alt="" 
                        className="h-full w-full object-fill" 
                      />

                    </div>
                    
                    {/* thumbnails */}
                    <div className="w-full flex gap-x-3 overflow-hidden overflow-x-scroll">

                      {product?.images?.map((url,index) => (

                          <div key={index} className="min-h-20 min-w-20 max-h-20 max-w-20">

                            <img 
                              onClick={() => setImage(url)}
                              src={url}
                              alt="" 
                              className={`h-full w-full object-fill border-2 cursor-pointer ${image === url ? "opacity-100 border-4 border-[#FF9900] ease-linear" :"opacity-70 border-zinc-400" }` }
                            />
                            
                          </div>

                      ))}

                    </div>

                </div>

                {/* right */}
                <div className="w-full md:w-2/5 lg:w-1/2 space-y-5">
                      
                    {/* name */}
                    <div className="">

                      <h1 className="text-xl lg:text  font-semibold">{product?.name}</h1>

                    </div>

                    {/* ratings */}
                    <div className="flex items-center gap-x-2">

                      <Rating 
                        initialRating={product?.rate}
                        emptySymbol={<MdStar className="text-gray-300"/>}
                        fullSymbol={<MdStar className="text-amber-300"/>}
                        readonly
                      />
                      
                      <span className="font-semibold">(12)</span>

                    </div>

                    {/* brand & category */}
                    <div className="flex gap-x-3">

                      <span className="block bg-blue-100 text-[#003399] lowercase px-4 py-0.5 rounded-full text-xs font-semibold">
                        {product?.category}
                      </span>

                      <span className="block bg-orange-100 text-[#ff9900] lowercase px-4 py-0.5 rounded-full text-xs font-semibold">
                        {product?.collection}
                      </span>

                    </div>
                      
                    {/* price */}
                    <div className="flex items-center gap-x-3">
                      
                      <span className={` ${product?.offer  ? "line-through text-slate-500 font-semibold" : "text-xl font-bold text-gray-900"}`}>
                        {product?.regularPrice?.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}
                      </span>

                      {product?.offer && (

                          <span className="text-xl font-bold text-gray-900">
                            {product?.discountPrice?.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}
                          </span>

                      )}


                    </div>

                    {/* descrption */}
                    <div 
                      className="text-sm font-normal text-gray-900"
                      dangerouslySetInnerHTML={{__html:product?.description}}
                    />

                    {/* Food items */}
                    {product?.type === 'Food' && (

                        <>
                          
                          {/* sauces */}
                          <div className="space-y-2">

                              <h3 className="text-base font-semibold">select sauces </h3>

                              {product.sauces.length === 1 && product.sauces.some(sauce => sauce.name === "none") ? 
                                (null) 
                                : 
                                (
                                  <div className="flex gap-x-3 gap-y-1 flex-wrap ">

                                    
                                    {product?.sauces?.map((sauce,index) => (

                                      <span className="border px-3 py-0.5 rounded-md text-sm font-semibold">
                                        {sauce.name}
                                      </span>

                                    ))}

                                  </div>
                                )
                              }

                          </div>

                          {/* spices */}
                          <div className="space-y-2">

                              <h3 className="text-base font-semibold">select spices</h3>

                              {product.spices.length === 1 && product.spices.some(spice => spice.name === "none") ? 
                                (null) 
                                : 
                                (
                                  <div className="flex gap-x-3 gap-y-1 flex-wrap ">

                                    
                                    {product?.spices?.map((spice,index) => (

                                      <span className="border px-3 py-0.5 rounded-md text-sm font-semibold">
                                        {spice.name}
                                      </span>

                                    ))}

                                  </div>
                                )
                              }

                          </div>

                        </>

                    )}
 
                    {/* buttons */}
                    <div className="flex flex-col gap-y-3">

                      <button 
                        className="bg-[#FF9900] rounded-md text-white h-14 uppercase font-semibold cursor-pointer"
                      >
                        ADD TO CART
                      </button>

                      <button className="bg-black rounded-md text-white h-14 uppercase font-semibold cursor-pointer">
                        BUY IT NOW
                      </button>

                    </div>


                </div>

            </div>

            {/* lower section */}
            <div className=""></div>
            
        </section>

      )}

      {productLoading && !productError && (

        <Loader/>

      )}

      {productError && (

        <Error retry={fetchProduct}/>

      )}

    </>

  )

}
