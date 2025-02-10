

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Loader from '../components/loader'
import Error from '../components/Error'
import Rating from "react-rating"
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'




export default function ProductReveiw() {

  const {url,token,products,fetchCart} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const {productId} = useParams()

  const [product ,setProduct] = useState({})

  const [productLoading ,setProductLoading] = useState(false)

  const [productError ,setProductError] = useState(false)

  const [image, setImage] = useState(null)

  const ProductType = products.filter((item) => item.type === product.type)

  const [alert , setAlert] = useState(null)

  const [size , setSize] = useState(null)

  const [color , setColor] = useState(null)

  const [sauces , setSauces] = useState([])

  const [spices , setSpices] = useState([])

  const [addCartLoading , setAddCartLoading] = useState(false)

  const [addCartError , setAddCartError] = useState(false)


  const navigate = useNavigate()


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

  // addtocart
  const addToCart = async () => {
    
    setAlert(null)

    if(!currentUser)
    {
        return navigate('/sign-in')
    }

    let data ;

    if(product?.type === "Food")  
    {

      if(product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {
        
        if(spices.length === 0)
        {
          return setAlert("please select spice")
        }

          data = {
            itemId:productId,
            spices:spices
          }
      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none"))
      {
        
          if(sauces.length === 0)
          {
            return setAlert("please select sauce")
          }

          data = {
            itemId:productId,
            sauces:sauces
          }

      }
      else if(product?.spices?.length === 1 && product?.spices?.some(spice => spice.name === "none") && product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none"))
      {
          data={
            itemId:productId,
          }
      }
      else
      {

        if(sauces.length === 0 || spices.length === 0)
        {
          return setAlert('please select sauces and spices')
        }

        if(sauces.length === 0 )
        {
          return setAlert('please select sauces ')
        }

        if(spices.length === 0)
        {
          return setAlert('please select spices')
        }

        data={
          itemId:productId,
          sauces:sauces,
          spices:spices
        }

      }

    }
    else if(product?.type === "Merchendise")
    {

      if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none"))
      {
          if(color === null)
          {
            return setAlert('select color')
          }

          data={
            itemId:productId,
            color:color
          }

      }
      else if(product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {
          if(size === null)
          {
            return setAlert('select size')
          }

          data={
            itemId:productId,
            size:size
          }
      }
      else if(product?.sizes?.length === 1 && product?.sizes?.some(size => size.name === "none") && product?.colors?.length === 1 && product?.colors?.some(color => color.name === "none"))
      {

        data={
          itemId:productId,
        }

      }
      else
      {

        if(size === null || color === null)
        {
          return setAlert('please select size and color')
        }

        data={
          itemId:productId,
          size:size,
          color:color
        }

      }

      
    }
    else
    {
      
        data = {
          itemId:productId
        }

    }

    try
    {
        setAddCartError(false)

        setAddCartLoading(true)

        const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

        if(res.data.success)
        {

          toast.success(res.data.message)

          setAddCartLoading(false)

          fetchCart()

          setSize(null)

          setColor(null)

          setSauces([])

          setSpices([])

        }

    }
    catch(error)
    {

      setAddCartLoading(false)

      setAddCartError(true)

      if(error.response)
      {
        const errorMessage = error.response.data.message 

        setAlert(errorMessage)

        console.log(errorMessage)
      }
      else
      {
        setAlert(error.message)

        console.log(error.message)
      }

    }

  }

  // addspice
  const Addspice = (spiceItem) => {

    setSpices((prevSpices) => {

      if(prevSpices.includes(spiceItem))
      {
        return prevSpices.filter(s => s !== spiceItem)
      }
      else
      {
        return [...prevSpices, spiceItem]
      }

    })

    // console.log("okay")

  }

  // addsauce
  const Addsauce = (sauceItem) => {

    setSauces((prevSauces) => {

      if(prevSauces.includes(sauceItem))
      {
        return prevSauces.filter(s => s !== sauceItem)
      }
      else
      {
        return [...prevSauces, sauceItem]
      }

    })

  }


  console.log(product)

  useEffect(() => {

    fetchProduct()

    window.scrollTo(0,0)

  },[productId])

  return (
    
    <>

      {!productError && !productLoading && (

       
        <section className="w-full p-5 space-y-20">

            {/* upper section */}
            <div className="w-full flex flex-col md:flex-row gap-x-10 gap-y-14">

                {/* left */}
                <div className="w-full  md:w-3/5 lg:w-1/2  space-y-3">

                    {/* main */}
                    <div className="max-h-[60vh] min-h-[60vh] h-[60vh] w-full border border-zinc-200 rounded-md shadow-md">

                      <img 
                        src={image}
                        alt="" 
                        className="h-full w-full object-fill rounded-md" 
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
                              className={`h-full w-full object-fill border cursor-pointer rounded-md shadow-md ${image === url ? "opacity-100 border-4 border-[#FF9900] ease-linear" :"opacity-80 border-zinc-200" }` }
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
                        {product?.collections}
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

                    {/* Food type */}
                    {product?.type === 'Food' && (

                        <>
                          
                          {/* sauces */}
                          <div className="space-y-2">

                              <h3 className="text-xs font-bold uppercase">select sauces </h3>

                              {product?.sauces?.length === 1 && product?.sauces?.some(sauce => sauce.name === "none") ? 
                                (null) 
                                : 
                                (
                                  <div className="flex gap-x-3 gap-y-1 flex-wrap ">

                                    
                                    {product?.sauces?.map((sauce,index) => (

                                      <span 
                                        key={index}
                                        className={`h-10 w-24 flex justify-center items-center border px-3 py-0.5 rounded-md text-sm font-semibold text-gray-600 cursor-pointer ${sauces?.includes(sauce.name) ? "border-[#FF9900] border-2 shadow-md" : ""}`}
                                        onClick={() => Addsauce(sauce.name)}
                                      >
                                        {sauce?.name}
                                      </span>

                                    ))}

                                  </div>
                                )
                              }

                          </div>

                          {/* spices */}
                          <div className="space-y-2">

                              <h3 className="text-xs font-bold uppercase">select spices</h3>

                              {product?.spices?.length === 1 && product?.spices.some(spice => spice?.name === "none") ? 
                                (null) 
                                : 
                                (
                                  <div className="flex gap-x-3 gap-y-1 flex-wrap ">

                                    
                                    {product?.spices?.map((spice,index) => (

                                      <span 
                                        key={index}
                                        className={`h-10 w-24 flex justify-center items-center border px-3 py-0.5 rounded-md text-sm font-semibold text-gray-600 cursor-pointer ${spices?.includes(spice.name) ? "border-[#FF9900] border-2 shadow-md" : ""}`}
                                        onClick={() => Addspice(spice.name)}
                                      >
                                        {spice?.name}
                                      </span>

                                    ))}

                                  </div>
                                )
                              }

                          </div>

                        </>

                    )}


                    {/* Merchendise type */}
                    {product?.type === 'Merchendise' && (

                      <>


                          {/* sizes */}
                          <div className="space-y-2">

                            <h2 className="text-xs font-bold uppercase">select size</h2>
                            
                            <div className="flex items-center gap-x-3 gap-y-1">

                              {product?.sizes?.map((item,index) => (

                                <span 
                                    key={index} 
                                    className={`h-10 w-24 flex justify-center items-center  border ${item.name === size ? "border-[#FF9900] border-2 shadow-md" : ""} px-3 py-0.5 rounded-md text-base font-bold text-gray-800 cursor-pointer`}
                                    onClick={() => setSize(item.name)}
                                >
                                  {item.name}
                                </span>

                              ))}

                            </div>

                          </div>
                          
                          {/* color */}
                          <div className="space-y-2">

                            <h2 className="text-xs font-bold uppercase">select a color</h2>
                            
                            <div className="flex items-center gap-x-3 gap-y-1">

                              {product?.colors?.map((item,index) => (

                                <span 
                                  key={index} 
                                  className={`h-10 w-24 flex justify-center items-center border ${item.name === color ? "border-[#FF9900] border-2 shadow-md" : ""} px-3 py-0.5 rounded-md text-sm font-medium text-gray-600 cursor-pointer`}
                                  onClick={() => setColor(item.name)}
                                >
                                  {item.name}
                                </span>

                              ))}

                            </div>

                          </div>

                      </>

                    )}

                    {alert && (

                      <Alert color="failure">{alert}</Alert>

                    )}

                    {/* buttons */}
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-y-3 gap-x-5">

                      <button
                        onClick={() => addToCart()} 
                        className="w-full bg-[#FF9900] rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl"
                      >
                        {addCartLoading ? 
                          (
                            <div className="flex justify-center items-center gap-x-3">

                              <span className="animate-spin h-7 w-7  rounded-full border border-white border-r-black block"/> Adding . . . .

                            </div>
                          ) 
                          : 
                          ("ADD TO CART")
                        }
                      </button>

                      <button className="w-full bg-black rounded-md text-white h-14 uppercase font-semibold cursor-pointer shadow-xl">
                        BUY IT NOW
                      </button>

                    </div>


                </div>

            </div>

            {/* lower section */}
            <div className="">

              {/* reveiws */}
              <div className="space-y-4">

                <h2 className="text-xl">Reviews</h2>

                <div className="flex items-center gap-x-2">

                    <span className="text-sm font-semibold">Signed in as :</span>

                    <div className="flex items-center gap-x-2 text-xs cursor-pointer">

                        <Link to="/profile">

                            <img 
                                src={currentUser?.profilePicture}
                                alt="" 
                                className="h-6 w-6 rounded-full" 
                            />

                        </Link>

                        <span className="font-bold tracking-tighter text-blue-700 hover:underline">@{currentUser?.username}</span>

                    </div>

                </div>
                
                <form className="border border-gray-400 w-full max-w-2xl p-3 rounded-md flex flex-col gap-y-4">

                    {/* rarting */}
                    <div className="flex  items-center gap-x-3">

                        <span className="text-red-700 text-xs font-bold">Rate * </span>

                        <Rating 
                            initialRating={product?.rate}
                            emptySymbol={<MdStar className="text-gray-300"/>}
                            fullSymbol={<MdStar className="text-amber-300"/>}
                        />

                    </div>

                    <textarea 
                        name="" 
                        className="block w-full rounded-md bg-white border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"
                        placeholder='type here . . . . '
                    />

                    {/*  */}
                    <div className="flex justify-end">

                        <button className="bg-blue-700 text-white px-5 py-2 rounded-md shadow-md cursor-pointer">
                            Submit
                        </button>

                    </div>

                </form>

              </div>

              {/* Related Product */}
              <div className="space-y-7">
                
                <h2 className="text-2xl/9 lg:text-3xl/9 font-bold tracking-tight text-gray-900">You may also like</h2>

                {/* swiper */}
                <div className="w-full relative">

                    <Swiper
                        className="mySwiper  relative"
                        spaceBetween={10}
                        slidesPerView={4}
                        // loop={true}
                        autoPlay={
                        {
                            delay:2000,
                            disableOnInteraction:false
                        }
                        }
                        modules={[Autoplay,Navigation]}
                        breakpoints={{
                            0: {
                            slidesPerView: 2,
                            spaceBetween:20
                            },
                            640: {
                            slidesPerView:3 ,
                            spaceBetween: 30,
                            },
                            768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                            },
                            1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                            },
                        }} 
                        navigation={{
                        prevEl:'.prev',
                        nextEl:'.next'
                            }}
                    >
                            {ProductType?.map((product,index) => (

                                <SwiperSlide key={index}>

                                  <ProductCard product={product}/>

                                </SwiperSlide>

                            ))}
                    </Swiper>

                    <div className="prev absolute top-1/3 -left-4 z-40 h-6 w-6 bg-orange-100 text-[#FF9900]  rounded-full flex justify-center items-center cursor-pointer">
                        <MdChevronLeft size={32} className=""/>
                    </div>

                    <div className="next absolute top-1/3 -right-4 z-40 h-6 w-6 bg-orange-100 text-[#FF9900] rounded-full flex justify-center items-center cursor-pointer">
                        <MdChevronRight size={32} className=""/>
                    </div>

                </div>

              </div>

            </div>
            
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