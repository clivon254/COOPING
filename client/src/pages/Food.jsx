

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Title from '../components/Title'
import SlidingProducts from '../components/SlidingProducts'
import ProductsLoading from '../components/ProductsLoading'
import FoodBanner from '../components/FoodBanner'

export default function Food() {

  const {Food,productLoading,productError} = useContext(StoreContext)

  console.log(Food)

  return (

    <section className="">

      <FoodBanner />

      {/* featured */}
      <div className="px-5 flex flex-col gap-y-5 py-7">

        <Title label={"featured food"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Food} next={"nextFoodfeatured"} prev={"prevFoodfeatured"}  />

        )}
        

      </div>

      {/* offer */}
      <div className="px-5 flex flex-col gap-y-5 py-10">

        <Title label={"Food on offer"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}
        

      </div>


    </section>

  )
}
