

import React from 'react'
import Banner from "../assets/DrinkBanner1.jpeg"


export default function DrinkOfferBanner() {

  return (

    <div 
        className="w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] bg-black border-b-8 border-[#ff9900]"
        style={{
            backgroundImage:`url(${Banner})`,
            backgroundSize:`cover`,
            backgroundPosition:`center`,
        }}
    >

        <div className="bg-black/50 w-full h-full flex flex-col gap-y-5 justify-center items-center">

            <h2 className="text-white text-4xl sm:text-5xl tracking-wider text-center font-semibold">GET UPTO 30% OFF</h2>
            
            <p className="text-center max-w-2xl text-white text-xl sm:font-semibold">
                With new deals daily and evey week for you.Get your favourite food at the best price with our offers.
            </p>


        </div>

    </div>

  )

}
