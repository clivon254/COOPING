

import React from 'react'
import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md'
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import ProductCard from '../components/ProductCard';


export default function SlidingProducts({products,prev,next}) {

  return (

    <div className="w-full relative">
        
        <Swiper
            className="mySwiper relative"
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
                slidesPerView: 5,
                spaceBetween: 40,
                },
            }} 
            navigation={{
            prevEl:`.${prev}`,
            nextEl:`.${next}`
            }}
        >

            {products?.map((product,index) => (

                <SwiperSlide key={index}>

                    <ProductCard product={product}/>

                </SwiperSlide>

            ))}

        </Swiper>

        <div className={`${prev} absolute top-1/3 -right-6 z-40 h-6 w-6 bg-orange-100 text-[#FF9900] rounded-full flex justify-center items-center cursor-pointer`}>

            <MdChevronRight size={32} className=""/>

        </div>
        
        <div className={`${next} absolute top-1/3 -left-6 z-40 h-6 w-6 bg-orange-100 text-[#FF9900]  rounded-full flex justify-center items-center cursor-pointer`}>

            <MdChevronLeft size={32} className=""/>

        </div>
        
    </div>

  )

}
