

import React from 'react'
import Banner from "../assets/LiqourBanner2.jpeg"



export default function LiqourBanner() {

  return (

    <div 
        className="w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] bg-black/50 border-b-8 border-[#ff9900]"
        style={{
            backgroundImage:`url(${Banner})`,
            backgroundSize:`cover`,
            backgroundPosition:`center`,
        }}
    >

        <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-y-5 bg-black/50">

            <h2 className="hidden md:block text-white text-xl">Get the best deals on</h2>

            <p className="md:text-center font-bold sm:font-sembold text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white max-w-4xl capitalize">
               Wide Variety of Liqour Products; Wines, Whiskeys, Gin & More.
            </p>

            <h2 className="hidden md:block text-white text-xl">FINE TASTE | QUICK DELIVERY | WIDE PRODUCT RANGE</h2>

        </div>

    </div> 

  )

}
