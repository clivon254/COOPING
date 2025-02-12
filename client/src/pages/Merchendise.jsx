


import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Title from '../components/Title'
import SlidingProducts from '../components/SlidingProducts'
import ProductsLoading from '../components/ProductsLoading'
import FoodBanner from '../components/FoodBanner'
import FoodOfferBanner from '../components/FoodOfferBanner'
import MerchendiseBanner from '../components/MerchendiseBanner'
import MerchendiseOfferBanner from '../components/MerchendiseOfferBanner'




export default function Merchendise() {

  const {Merchendise,productLoading,productError} = useContext(StoreContext)

  console.log(Merchendise)

  return (

    <section className="">

      <MerchendiseBanner/>

      {/* featured */}
      <div className="p-5 flex flex-col gap-y-5 border-b-8 border-[#ff9900]">

        <Title label={"featured"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Merchendise} next={"nextOffer"} prev={"prevOffer"}  />

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Merchendise} next={"nextfeatured"} prev={"prevfeatured"}  />

        )}
        

      </div>

      <MerchendiseOfferBanner/>

      {/* offer */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"Merchendise offer"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Merchendise} next={"nextMerchendiseOffer"} prev={"prevMerchendiseOffer"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Merchendise} next={"nextMerchendiseOffer"} prev={"prevMerchendiseOffer"}  />

        )}
        

      </div>

      {/* Hoody */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"HOODY"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Merchendise} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Merchendise} next={"nextMerchendiseOffer"} prev={"prevMerchendiseOffer"}  />

        )}
        

      </div>

      {/* sweat shirt */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"sweat shirt"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Merchendise} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Merchendise} next={"nextMerchendiseOffer"} prev={"prevMerchendiseOffer"}  />

        )}
        

      </div>

    </section>

  )
}
