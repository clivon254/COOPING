

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Title from '../components/Title'
import SlidingProducts from '../components/SlidingProducts'
import ProductsLoading from '../components/ProductsLoading'
import DrinkBanner from '../components/DrinkBanner'
import DrinkOfferBanner from '../components/DrinkOfferBanner'




export default function Drink() {

  const {Drink,productLoading,productError} = useContext(StoreContext)


  return (

    <section className="">

      <DrinkBanner/>

      {/* featured */}
      <div className="p-5 flex flex-col gap-y-5 border-b-8 border-[#ff9900]">

        <Title label={"featured Drinks"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Drink} next={"nextOffer"} prev={"prevOffer"}  />

        )}

        {productLoading && !productError && (

            <ProductsLoading  next={"nextfeatured"} prev={"prevfeatured"}  />

        )}
        

      </div>

      <DrinkOfferBanner/>

      {/* offer */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"Drinks on offer"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Drink} next={"nextFoodOffer"} prev={"prevFoodOffer"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading  next={"nextFoodOffer"} prev={"prevFoodOffer"}  />

        )}
        

      </div>

      {/* Smoothies */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"SMOOTHIES"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Drink} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Drink} next={"nextDrinkOffer"} prev={"prevDrinkOffer"}  />

        )}
        

      </div>

      {/* soft Drinks */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"Soft Drinks"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Drink} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading  next={"nextDrinkOffer"} prev={"prevDrinkOffer"}  />

        )}
        

      </div>


    </section>

  )
}
