

import React from 'react'


export default function FoodBanner() {

  return (

    <div 
        className="w-full h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] bg-black/50"
        style={{
            backgroundImage:``,
            backgroundSize:`cover`,
            backgroundPosition:`center`,
        }}
    >

        <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-y-5">

            <h2 className="hidden md:block">Get the best deals on</h2>

            <p className="md:text-center font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white">
                Wide Variety of food products ; Snack , Main course , street foods & More
            </p>

            <h2 className="hidden md:block">FINE TASTE | QUICK DELIVERY | WIDE PRODUCT RANGE</h2>

        </div>

    </div> 

  )

}
