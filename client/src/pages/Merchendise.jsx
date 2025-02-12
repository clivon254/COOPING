


import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Title from '../components/Title'
import SlidingProducts from '../components/SlidingProducts'
import ProductsLoading from '../components/ProductsLoading'
import FoodBanner from '../components/FoodBanner'
import FoodOfferBanner from '../components/FoodOfferBanner'




export default function Food() {

  const {Food,productLoading,productError} = useContext(StoreContext)

  console.log(Food)

  return (

    <section className="">

      <FoodBanner />

      {/* featured */}
      <div className="p-5 flex flex-col gap-y-5 border-b-8 border-[#ff9900]">

        <Title label={"featured food ITEMS"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Food} next={"nextOffer"} prev={"prevOffer"}  />

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Food} next={"nextfeatured"} prev={"prevfeatured"}  />

        )}
        

      </div>

      <FoodOfferBanner/>

      {/* offer */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"Food on offer"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}
        

      </div>

      {/* Snacks */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"SNACKS"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Food} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}
        

      </div>

      {/* STREET FOOD */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"STREET FOOD"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Food} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Food} next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}
        

      </div>


    </section>

  )
}
