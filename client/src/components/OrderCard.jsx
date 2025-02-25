

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import {RiCloseLargeFill} from "react-icons/ri"
import {GiCheckMark} from "react-icons/gi"
import { useNavigate } from 'react-router-dom'
import OrderSteps from './OrderSteps'


export default function OrderCard({order}) {

    const {products} = useContext(StoreContext)

    const navigate = useNavigate()

  return (

    <div 
        className="border border-orange-200 bg-white shadow-xl rounded-md p-4 w-full text-xs gap-3 space-y-5"
    >

        {/* header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-5">

            {/* title */}
            <div className="flex items-center gap-x-4 text-green-700 ">

                <span className="text-sm font-semibold">Order N.O :</span> 

                <span className="text-base font-bold lg:text-xl">#{order?.orderNumber}</span>

            </div>

            {/* order steps */}
            <div className="w-full md:w-2/3 lg:w-1/2">

               <OrderSteps orderr={order}/>

            </div>

        </div>

        {/* body */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] lg:[2fr_1fr_1fr_1fr] gap-y-3">   
                            
            {/* items && details  */}
            <div className="">

                {/* order items */}
                <div className="">

                    {order?.items?.map((item,i) => (

                        <div 
                            className="flex gap-x-3 py-0.5 items-start"
                            key={i}
                        >

                            <img 
                                src={item?.images[0]} 
                                alt="" 
                                className="w-16 h-16 rounded-md shadow-xl" 
                            />

                            <div className="flex flex-col">

                                <span className="font-bold">
                                    {item?.name} X {item?.variants?.map((variant) => (variant.quantity))}
                                </span>

                                {item?.variants?.map((variant,index) => {

                                    const Item = products.find(ite => ite._id === item._id)

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

                            <button 
                                className="bg-black text-white px-4 py-1 rounded-md font-semibold cursor-pointer capitalize"
                                onClick={() => navigate(`/product-reveiw/${item._id}`)}
                            >
                                review 
                            </button>

                        </div>

                    ))}

                </div>

                {/* name */}
                <div className="mt-3 font-semibold">
                    {order?.address?.firstName + " " + order?.address?.lastName}
                </div>

                {/* address */}
                <div className="">

                    <p className="">{order?.address?.address}</p>

                    <p className="">{order?.address?.City}</p>

                </div>

                {/* phone */}
                <p className="">
                    {order?.address?.phone}
                </p>
            
            </div>

            {/*method ,date,method  */}
            <div className="space-y-1">
                
                {/* number of items */}
                <p className="flex  items-center gap-x-2">

                    <span className="font-bold text-slate-700">Items : </span> 

                    <span className="font-bold text-slate-900">{order?.items?.length}</span>

                </p>
            
                {/* method of payment */}
                <p className="flex  items-center gap-x-2">

                    <span className="font-bold text-slate-700">Method : </span> 

                    <span className="font-bold text-primary">{order?.paymentmethod}</span>

                </p>
                
                {/* payment */}
                <p className="flex  items-center gap-x-2">

                    <span className="font-bold text-slate-700">Payment : </span> 

                    <span className="font-bold text-slate-900">{order?.payment ? <GiCheckMark size={20} className="text-green-500 shadow-xl"/> :<RiCloseLargeFill size={20} className="text-red-500 shadow-xl"/>}</span>

                </p>
                
                {/* date */}
                <p className="flex  items-center gap-x-2">

                    <span className="font-bold text-slate-900">Date : </span>

                    <span className="font-bold text-black text-sm">{new Date(order.createdAt).toLocaleString()} </span>
                
                </p>

            </div>

            {/* amount */}
            <div className="">

            <p className="text-xs font-bold text-gray-600">
                Amount : <span className="text-sm text-black font-semibold">{(order?.amount)?.toLocaleString('en-KE',{style:'currency' , currency :'KES'})} </span>
            </p>

            <p className="text-xs font-bold text-gray-600">
                Delivery : <span className="text-sm text-black font-semibold">{order?.delivery?.place} ,{(order?.delivery?.value)?.toLocaleString('en-KE',{style:'currency' , currency :'KES'})}</span>
            </p>


            </div>

                
        </div>   
    
    </div>

  )
}
