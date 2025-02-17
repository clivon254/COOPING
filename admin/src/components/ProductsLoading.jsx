

import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"



export default function ProductsLoading() {

    const [loader ,setLoader] = useState([
        {},{},{},{},{}
    ])

  return (

    <>

        {/* swiper */}
        <div className="w-full relative">
        
            <Swiper
                className="mySwiper  relative"
                spaceBetween={10}
                slidesPerView={4}
                // loop={true}
                autoPlay={
                {
                    delay:2000,
                    disableOnInteraction:false
                }
                }
                modules={[Autoplay,Navigation]}
                breakpoints={{
                    0: {
                    slidesPerView: 2,
                    spaceBetween:20
                    },
                    640: {
                    slidesPerView:3 ,
                    spaceBetween: 30,
                    },
                    768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    },
                    1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    },
                }} 
                navigation={{
                    prevEl:'.prev',
                    nextEl:'.next'
                }}
            >

                {loader?.map((product,index) => (

                    <SwiperSlide key={index}>

                        <div 
                            className="cursor-pointer space-y-2 w-full"
                        >

                            {/* image */}
                            <div className="h-[250px] md:h-[300px] xl:h-[280px] w-full animate-pulse bg-slate-300 shadow rounded-md"/>

                            <div className="space-y-1">

                                <span className="block w-[65%] h-6 animate-pulse bg-slate-300 rounded-md"/>

                                <span className="block w-[45%] h-4 animate-pulse bg-slate-300 rounded-md"/>

                            </div>

                        </div>

                    </SwiperSlide>

                ))}

            </Swiper>

            <div className="prev absolute top-1/3 -left-4 z-40 h-6 w-6 bg-orange-100 text-[#FF9900]  rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronLeft size={32} className=""/>
            </div>

            <div className="next absolute top-1/3 -right-4 z-40 h-6 w-6 bg-orange-100 text-[#FF9900] rounded-full flex justify-center items-center cursor-pointer">
                <MdChevronRight size={32} className=""/>
            </div>
        
        </div>
    
    </>

  )

}