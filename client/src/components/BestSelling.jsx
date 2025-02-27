

import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import SlidingProducts from './SlidingProducts'
import ProductsLoading from './ProductsLoading'
import Title from "./Title"


export default function BestSelling() {
  
    const {products,productLoading,productError} = useContext(StoreContext)

    console.log(products)
    
    return (
        
        <div className="w-full p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

            <Title label={"Best Selling"}/>

            {!productLoading && !productError && (

                <SlidingProducts products={products} next={"nextBest"} prev={"prevBest"}/>

            )}

            {productLoading && !productError && (

                <ProductsLoading/>

            )}

        </div>

    )

}
