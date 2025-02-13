

import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdTaskAlt } from 'react-icons/md';
import { TbWorldSearch } from "react-icons/tb";
import { SiCommerzbank } from "react-icons/si";
import Banner from "../assets/AboutBanner1.jpeg"


export default function About() {

  return (

    <section className="">

        {/* bread crumb */}
        <div 
            className="w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] bg-black/50 border-b-8 border-[#ff9900]"
            style={{
                backgroundImage:`url(${Banner})`,
                backgroundSize:`cover`,
                backgroundPosition:`center`,
            }}
        >
        
                <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-y-5 bg-black/50">
        
                    <h2 className=" text-white text-4xl">COOPIN</h2>
        
                    <p className="text-center font-sembold text-xl text-white max-w-4xl capitalize">
                        COOPIN is the best budget friendly site for you.With over 1000+ stocked products <span className="text-[#ff9900]">,our foods, drinks ,liqours</span> and  <span className="text-[#ff9900]"> merchendise </span>
                    </p>
        
                </div>
        
        </div> 

        {/* what makes coopin different */}
        <div className="w-full p-5 space-y-10">

            {/* title */}
            <div className="space-y-5">

                <h2 className="text-3xl text-center text-[#FF9900] font-semibold">
                    What makes COOPIN different?
                </h2>

                <p className="text-center text-slate-900 max-w-3xl mx-auto text-xl">
                    As the best budget friendly platform ,COOPIN is committed to giving you the customer service you deserve.It's no just about the products,
                    it's about the experience you have with us, having a lifestyle and having your own
                </p>

            </div>

            {/* incentives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5">


                {/* delivery */}
                <div className="border p-5 rounded-md flex items-center justify-around gap-x-5">

                    <span className="bg-[#FF9900] p-5 rounded-full text-white shadow-2xs">

                      <TbTruckDelivery size={60}/>

                    </span>

                    <span className="text-2xl text-gray-600"> 24hrs Delivery</span>

                </div>

                {/* customer service */}
                <div className="border p-5 rounded-md flex items-center justify-around gap-x-5">

                    <span className="bg-[#FF9900] p-5 rounded-full text-white shadow-2xs">

                        <RiCustomerService2Line size={60}/>

                    </span>

                    <span className="text-2xl text-gray-600">Friendly Customer Service</span>

                </div>

                {/* verfied */}
                <div className="border p-5 rounded-md flex items-center justify-around gap-x-5">

                    <span className="bg-[#FF9900] p-5 rounded-full text-white shadow-2xs">
                        
                        <MdTaskAlt size={60}/>

                    </span>

                    <span className="text-2xl text-gray-600">Verified & Trusted Products</span>

                </div>

                {/* Discover More */}
                <div className="border p-5 rounded-md flex items-center justify-around gap-x-5">

                    <span className="bg-[#FF9900] p-5 rounded-full text-white shadow-2xs">
                       
                        <TbWorldSearch size={60}/>

                    </span>

                    <span className="text-2xl text-gray-600">Discover More</span>

                </div>
                

                {/* Wide Product Range */}
                <div className="border p-5 rounded-md flex items-center justify-around gap-x-5">

                    <span className="bg-[#FF9900] p-5 rounded-full text-white shadow-2xs">
                        <TbWorldSearch size={60}/>
                    </span>

                    <span className="text-2xl text-gray-600">Discover More</span>

                </div>

                {/* eco-friendly */}
                <div className="border p-5 rounded-md flex items-center justify-around gap-x-5">

                    <span className="bg-[#FF9900] p-5 rounded-full text-white shadow-2xs">
                        <SiCommerzbank size={60}/>
                    </span>

                    <span className="text-2xl text-gray-600">Eco-Friendly Delivery</span>

                </div>


            </div>

        </div>


    </section>

  )

}
