


import React, { useState } from 'react'
import { FiStar,FiBox } from "react-icons/fi";
import { MdOutlineAccessTime } from 'react-icons/md';
import { Ri24HoursLine } from "react-icons/ri";

export default function Advert() {

    const [data ,setData] = useState([
        {
            icon:<FiStar size={24} className="text-[#003399]"/>,
            title:"Student Deal",
            value:"Get 20% on your first order"
        },
        {
            icon:<MdOutlineAccessTime size={24} className="text-[#003399]"/>,
            title:"Quick Delivery",
            value:"Under 30 minutes or free"
        },
        {
            icon:<FiBox size={24} className="text-[#003399]"/>,
            title:"Daily Specials",
            value:"New Deals every Day"
        },
        {
            icon:<Ri24HoursLine size={24} className="text-[#003399]"/>,
            title:"24/7  Support",
            value:"Get our services at all time"
        }

    ])


  return (

    <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 px-5 py-10 gap-x-5 gap-y-6">

        {data?.map((data,map) => (

            <div className="flex items-start border border-blue-200 shadow-md rounded-sm p-3 gap-x-4">

                <div className="h-12 w-12 bg-blue-50 rounded-md flex items-center justify-center p-2 shadow-sm">

                    {data.icon}

                </div>
                
                <div className=" flex flex-col justify-start gap-y-3">

                    <span className="text-xl font-bold tracking-tight text-gray-900">{data.title}</span>

                    <span className="text-base  text-gray-500 ">{data.value}</span>

                </div>

            </div>

        ))}

    </div>

  )

}
