

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'

export default function ProductCard({product}) {

    const {products} = useContext(StoreContext)

    const navigate = useNavigate()


  return (

    <div 
        className="cursor-pointer space-y-2" 
        onClick={() => navigate(`/product/${product?._id}`)}
    >

        {/* image */}
        <div className="h-[222px] w-full ">

            <img 
              src={product.images[0]}
              alt="" 
              className="w-full h-full shadow-sm" 
            />

        </div>

        <div className="space-y-1">

            <h1 className="text-base font-semibold">{product.name}</h1>

            <div className="">

                {product?.offer ? 
                    (
                        <div className=" flex items-center gap-x-2">

                            <span className="line-through text-sm font-thin text-gray-600">{product?.discountPrice?.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}</span>

                            <span className="">{product?.regularPrice?.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}</span>

                        </div>
                    ) 
                    : 
                    (
                        <span className="">
                            {product?.regularPrice?.toLocaleString('en-Kenya',{style:'currency', currency:'KES'})}
                        </span>
                    )
                }

            </div>

        </div>

    </div>

  )

}
