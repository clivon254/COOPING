

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Title from '../components/Title'
import SlidingProducts from '../components/SlidingProducts'
import ProductsLoading from '../components/ProductsLoading'
import LiqourBanner from '../components/LiqourBanner'
import LiqourOfferBanner from '../components/LiqourOfferBanner'





export default function Liqour() {

  const {Liqour,productLoading,productError} = useContext(StoreContext)

  console.log(Liqour)

  return (

    <section className="">

      <LiqourBanner/>

      {/* featured */}
      <div className="p-5 flex flex-col gap-y-5 border-b-8 border-[#ff9900]">

        <Title label={"featured Liqour"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextOffer"} prev={"prevOffer"}  />

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextfeatured"} prev={"prevfeatured"}  />

        )}
        

      </div>

      <LiqourOfferBanner/>

      {/* offer */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"Liqour on offer"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}  />

        )}
        

      </div>

      {/* GIN */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"GIN"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}  />

        )}
        

      </div>

      {/* VODKA*/}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"VODKA"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}  />

        )}
        

      </div>

      {/* WHISKEY */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"VODKA"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}  />

        )}
        

      </div>

      {/* WINES */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"WINES"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}  />

        )}
        

      </div>

      {/* CHAMPAIGNE */}
      <div className="p-5 flex flex-col gap-y-5 py-10 border-b-8 border-[#ff9900]">

        <Title label={"CHAMPAIGNE"}/>
        
        {!productLoading && !productError && (

            <SlidingProducts products={Liqour} next={"nextSnacks"} prev={"prevSnacks"}/>

        )}

        {productLoading && !productError && (

            <ProductsLoading products={Liqour} next={"nextLiqourOffer"} prev={"prevLiqourOffer"}  />

        )}
        
      </div>


    </section>

  )
}
