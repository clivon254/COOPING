

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Loader from '../components/loader'
import Error from '../components/Error'
import Rating from "react-rating"
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import ProductsLoading from '../components/ProductsLoading'
import moment from "moment"
import {FaStar} from "react-icons/fa"
import Title from '../components/Title'



export default function ProductReveiw() {

  const {url,token,products,fetchCart,fetchProducts,productLoading,productError} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const {productId} = useParams()

  const [product ,setProduct] = useState({})

  const [fetchProductLoading ,setFetchProductLoading] = useState(false)

  const [fetchProductError ,setFetchProductError] = useState(false)

  const [image, setImage] = useState(null)

  const [imagesLoading ,setImagesLoading] = useState([{},{},{},{},{}])

  const [reveiwsLoading ,setReveiwsLoading] = useState([{},{},{},{},{}])

  const ProductType = products.filter((item) => item.type === product.type)

  const [alert , setAlert] = useState(null)

  const [size , setSize] = useState(null)

  const [color , setColor] = useState(null)

  const [sauces , setSauces] = useState([])

  const [spices , setSpices] = useState([])

  const [addCartLoading , setAddCartLoading] = useState(false)

  const [addCartError , setAddCartError] = useState(false)

  const [formData ,setFormData] = useState({
    productId,
  })

  const navigate = useNavigate()

  const [reveiws , setReveiws] = useState([])

  const [fetchReveiwsLoading ,setFetchReveiwLoading] = useState(false)

  const [fetchReveiwsError ,setFetchReveiwError] = useState(false)

  const [reveiwLoading ,setReveiwLoading] = useState(false)

  const [reveiwError ,setReveiwError] = useState(null)


  // fetchProduct
  const fetchProduct = async () => {

    try
    {
    
      setFetchProductLoading(true)

      setFetchProductError(false)

      fetchProducts()

      const res = await axios.get(url + `/api/product/get-product/${productId}`)

      if(res.data.success)
      {
        setFetchProductLoading(false)

        setProduct(res.data.product)

        setImage(res.data.product.images[0])

      }

    }
    catch(error)
    {
      console.log(error.message)

      setFetchProductError(true)

      setFetchProductLoading(false)
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

  // handleChangeReveiw
  const handleChangeReveiw = (e) => {
    
    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // handleChangeRate
  const handleChangeRate = (rate) => {

    setFormData({...formData,rate : rate})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

        setReveiwError(null)

        setReveiwLoading(true)

        const res = await axios.post(url + `/api/reveiw/add-reveiw`,formData,{headers:{token}})

        if(res.data.success)
        {
            setReveiwLoading(false) 

            fetchReveiws()

            setFormData({})
        }

    }
    catch(error)
    {
        console.log(error.message)

        
        setReveiwLoading(false)

        if(error.response)
        {
            setReveiwError(error.response.data.message)
        }
        else
        {
            setReveiwError(error.message)

        }

    }

  }

  // fetchReveiws
  const fetchReveiws = async () => {

    try
    {

        setFetchReveiwError(false)

        setFetchReveiwLoading(true)

        const res = await axios.get(url + `/api/reveiw/get-reveiws/${productId}`)

        if(res.data.success)
        {
            setFetchReveiwLoading(false)

            setReveiws(res.data.reveiws)
        }


    }
    catch(error)
    {
        console.log(error?.message)

        setFetchReveiwError(true)

        setFetchReveiwLoading(false)
    }

  }



  console.log(product)

  console.log(reveiws)


  useEffect(() => {

    fetchProduct()

    fetchReveiws()

    window.scrollTo(0,0)

  },[productId])
  
  console.log(formData)

  return (
    
    <>

      {!fetchProductError && !fetchProductLoading && (
       
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

                      <div className="">

                        <Rating 
                            initialRating={product?.rate}
                            emptySymbol={<MdStar className="text-gray-300"/>}
                            fullSymbol={<MdStar className="text-amber-300"/>}
                            readonly
                        />

                      </div>
                      
                      <span className="font-semibold">({reveiws?.length})</span>

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
            <div className="space-y-10">
            
              {/*reveiws  */}
              {!currentUser ? 
                (

                    <>

                        <div className="w-full max-w-2xl">

                            <span 
                                className="text-xl border w-full block text-center rounded-full px-2 py-3 font-semibold cursor-pointer hover:text-[#FF9900] shadow"
                                onClick={() => navigate('/sign-in')}
                            >
                                Sign in to review the product
                            </span>
                            
                        </div>

                    </>

                ) 
                : 
                (

                    <>

                        {/* REVEIW*/}
                        <div className="space-y-4 max-w-2xl">

                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter">Reviews</h2>

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
                            
                            <form onSubmit={handleSubmit} className="border border-gray-200 w-full  p-3 rounded-md flex flex-col gap-y-4">

                                {/* rating */}
                                <div className="flex  items-center gap-x-3">

                                    <span className="text-red-700 text-xs font-bold">Rate * </span>

                                    <Rating 
                                        initialRating={formData?.rate}
                                        emptySymbol={<MdStar className="text-gray-300"/>}
                                        fullSymbol={<MdStar className="text-amber-300"/>}
                                        onChange={handleChangeRate}
                                    />

                                </div>

                                <textarea 
                                    name="content" 
                                    className="block w-full rounded-md bg-white border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"
                                    placeholder='type here . . . . '
                                    onChange={handleChangeReveiw}
                                    value={formData?.Reveiw}
                                />

                                {reveiwError && (

                                    <div className="bg-red-100 w-full p-2 rounded-md">

                                        <p className="text-red-600">{reveiwError}</p>

                                    </div>

                                )}

                                {/*button  */}
                                <div className="flex justify-end">

                                    <button 
                                        className="bg-blue-700 text-white px-5 py-2 rounded-md shadow-md cursor-pointer"
                                        type="submit"
                                    >
                                        {reveiwLoading ? 
                                        (
                                            <div className="flex justify-center items-center">

                                                <span className="h-5 w-5 rounded-full animate-spin border border-r-black"/>

                                            </div>
                                        ) 
                                        :
                                        ("submit")
                                    }
                                    </button>

                                </div>

                            </form>

                            {/*reveiws  */}
                            <div className="">
                                
                                {!fetchReveiwsLoading && !fetchReveiwsError && (

                                    <>

                                        {reveiws.length > 0 ? 
                                            (
                                                <>
                                                    {reveiws.map((reveiw,index) => (

                                                        <div key={index} className="flex p-4 text-sm border-b border-orange-200">

                                                            {/* image */}
                                                            <div className="h-12 w-12 flex shrink-0  mr-3">

                                                                <img 
                                                                    src={reveiw?.userId?.profilePicture}
                                                                    alt=""
                                                                    className="w-full h-full rounded-full"
                                                                />

                                                            </div>

                                                            <div className="flex-1">

                                                                {/* rating */}
                                                                <div className="">

                                                                    <Rating 
                                                                        initialRating={reveiw.rate}
                                                                        emptySymbol={<FaStar className="text-gray-300"/>}
                                                                        fullSymbol={<FaStar className="text-amber-300"/>}
                                                                        readonly
                                                                    />

                                                                </div>

                                                                {/* user details */}
                                                                <div className="flex items-center mb-1">

                                                                    <span className="font-bold mr-1 text-xs truncate">
                                                                        {reveiw?.userId?.username}
                                                                    </span>

                                                                    <span className="text-gray-500 text-xs">
                                                                        {moment(reveiw.created).fromNow()}
                                                                    </span>

                                                                </div>

                                                                <p className="text-gray-600 pb-2">{reveiw?.content}</p>

                                                            </div>

                                                        </div>

                                                    ))}
                                                </>
                                            ) 
                                            : 
                                            (
                                                <>

                                                    <p className="text-xl font-semibold text-gray-700 text-center">
                                                        There are no reveiws yet .Be the first one to reveiw
                                                    </p>
                                                
                                                </>
                                            )
                                        }

                                    </>

                                )}

                                {fetchReveiwsLoading && fetchReveiwsError && (

                                   <>
                                    {reveiwsLoading?.map((reveiw,index) => (
    
                                        <div key={index} className="flex p-4 text-sm border-b border-orange-200">
    
                                            {/* image */}
                                            <div className="h-12 w-12 flex shrink-0  mr-3 rounded-full  bg-slate-300  animate-pulse"/>
    
    
                                            <div className="flex-1">
    
                                                {/* rating */}
                                                <div className="">
    
                                                    <Rating 
                                                        initialRating={reveiw.rate}
                                                        emptySymbol={<FaStar className="text-gray-300"/>}
                                                        fullSymbol={<FaStar className="text-amber-300"/>}
                                                        readonly
                                                    />
    
                                                </div>
    
                                                {/* user details */}
                                                <div className="flex items-center mb-1">
    
                                                   <span className="w-12 h-2 rounded-md block bg-slate-300  animate-pulse mr-1"/>
    
                                                   <span className="w-8 h-2 rounded-md block bg-slate-300  animate-pulse"/>
    
                                                </div>
    
                                                <span className="w-full h-10 rounded-md block bg-slate-300  animate-pulse"/>
    
                                            </div>
    
                                        </div>
    
                                    ))}
                                   </>

                                )}

                            </div>

                        </div>

                   </>

              )}

              {/* Related Product */}
              <div className="flex flex-col gap-y-5">
                
            
                <Title label={"You may also like"} />

                {!productLoading && !productError && (

                  <SlidingProducts products={ProductType} next={"nextYouMay"} prev={"prevYouMay"}/>

                )}

                {productLoading && !productError && (

                   <ProductsLoading/>

                )}

              </div>

            </div>
            
        </section>

      )}

      {fetchProductLoading && !fetchProductError && (

        <section className="w-full p-5 space-y-20">

            {/* upper section */}
            <div className="w-full flex flex-col md:flex-row gap-x-10 gap-y-14">

                {/* left */}
                <div className="w-full  md:w-3/5 lg:w-1/2  space-y-3">

                    {/* main */}
                    <div className="max-h-[60vh] min-h-[60vh] h-[60vh] w-full border border-zinc-200 rounded-md shadow-md animate-pulse bg-slate-300"/>
                    
                    {/* thumbnails */}
                    <div className="w-full flex gap-x-3 overflow-hidden overflow-x-scroll">

                      {imagesLoading.map((url,index) => (

                        <div key={index} className="min-h-20 min-w-20 max-h-20 max-w-20 bg-slate-300 rounded-md animate animate-pulse"/>

                      ))}

                    </div>

                </div>

                {/* right */}
                <div className="w-full md:w-2/5 lg:w-1/2 space-y-5">
                      
                   <span className="w-full h-6 rounded-md block bg-slate-300  animate-pulse"/>

                    {/* ratings */}
                    <div className="flex items-center gap-x-2">

                      <div className="">

                        <Rating 
                            initialRating={product?.rate}
                            emptySymbol={<MdStar className="text-gray-300"/>}
                            fullSymbol={<MdStar className="text-amber-300"/>}
                            readonly
                        />

                      </div>

                    </div>

                    {/* brand & category */}
                    <div className="flex gap-x-3">

                        <span className="w-24 h-4 rounded-md block bg-slate-300  animate-pulse"/>

                        <span className="w-24 h-4 rounded-md block bg-slate-300  animate-pulse"/>

                    </div>
                      
                    {/* price */}
                    <div className="flex items-center gap-x-3">
                      
                        <span className="w-40 h-6 rounded-md block bg-slate-300  animate-pulse"/>
                      
                    </div>

                    {/* descrption */}
                    <span className="w-full h-40 rounded-md block bg-slate-300  animate-pulse"/>
                          
                    {/* variants */}
                    <div className="space-y-2">

                        <h3 className="text-xs font-bold uppercase">select sauces </h3>

                        <div className="flex gap-x-3 gap-y-1 flex-wrap ">


                            <span className="w-24 h-10 rounded-md block bg-slate-300  animate-pulse"/>


                            <span className="w-24 h-10 rounded-md block bg-slate-300  animate-pulse"/>

                        

                        </div>       

                    </div>
 

                    {/* buttons */}
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-y-3 gap-x-5">

                      <span className="w-full h-14 rounded-md block bg-slate-300  animate-pulse"/>

                      <span className="w-full h-14 rounded-md block bg-slate-300  animate-pulse"/>

                    </div>


                </div>

            </div>

            {/* lower section */}
            <div className="space-y-10">
               
                <>

                    {/* REVEIW*/}
                    <div className="space-y-4 max-w-2xl">

                        <h2 className="text-xl sm:text-2xl font-semibold tracking-tighter">Reviews</h2>

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
                        
                        <form onSubmit={handleSubmit} className="border border-gray-200 w-full  p-3 rounded-md flex flex-col gap-y-4">

                            {/* rating */}
                            <div className="flex  items-center gap-x-3">

                                <span className="text-red-700 text-xs font-bold">Rate * </span>

                                <Rating 
                                    initialRating={formData?.rate}
                                    emptySymbol={<MdStar className="text-gray-300"/>}
                                    fullSymbol={<MdStar className="text-amber-300"/>}
                                    onChange={handleChangeRate}
                                />

                            </div>

                            <textarea 
                                name="content" 
                                className="block w-full rounded-md bg-white border border-gray-400 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"
                                placeholder='type here . . . . '
                                onChange={handleChangeReveiw}
                                value={formData?.Reveiw}
                            />

                            {reveiwError && (

                                <div className="bg-red-100 w-full p-2 rounded-md">

                                    <p className="text-red-600">{reveiwError}</p>

                                </div>

                            )}

                            {/*button  */}
                            <div className="flex justify-end">

                                <button 
                                    className="bg-blue-700 text-white px-5 py-2 rounded-md shadow-md cursor-pointer"
                                    type="submit"
                                >
                                    {reveiwLoading ? 
                                    (
                                        <div className="flex justify-center items-center">

                                            <span className="h-5 w-5 rounded-full animate-spin border border-r-black"/>

                                        </div>
                                    ) 
                                    :
                                    ("submit")
                                }
                                </button>

                            </div>

                        </form>

                        {/*reveiws  */}
                        <div className="">

                            <>
                                {reveiwsLoading?.map((reveiw,index) => (

                                    <div key={index} className="flex p-4 text-sm border-b border-orange-200">

                                        {/* image */}
                                        <div className="h-12 w-12 flex shrink-0  mr-3 rounded-full  bg-slate-300  animate-pulse"/>


                                        <div className="flex-1">

                                            {/* rating */}
                                            <div className="">

                                                <Rating 
                                                    initialRating={reveiw.rate}
                                                    emptySymbol={<FaStar className="text-gray-300"/>}
                                                    fullSymbol={<FaStar className="text-amber-300"/>}
                                                    readonly
                                                />

                                            </div>

                                            {/* user details */}
                                            <div className="flex items-center mb-1">

                                               <span className="w-12 h-2 rounded-md block bg-slate-300  animate-pulse mr-1"/>

                                               <span className="w-8 h-2 rounded-md block bg-slate-300  animate-pulse"/>

                                            </div>

                                            <span className="w-full h-10 rounded-md block bg-slate-300  animate-pulse"/>

                                        </div>

                                    </div>

                                ))}
                            </>
                              
                        </div>

                    </div>

                </>

              {/* Related Product */}
              <div className="flex flex-col gap-y-10">
                
                <Title label={"You may also like"} />

                <ProductsLoading/>

              </div>

            </div>
            
        </section>

      )}

      {fetchProductError && (

        <Error retry={fetchProduct}/>

      )}

    </>

  )

}