

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoRestaurantSharp } from "react-icons/io5";
import { StoreContext } from '../context/store';
import { RiDrinks2Line } from "react-icons/ri";
import { MdLiquor } from "react-icons/md";
import { TbCalendarEvent } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";




export default function DashSidebar() {

    const {open,setOpen} = useContext(StoreContext)


  return (

    
    <div className="w-full">

        <div className="flex flex-col gap-y-4">

            {/* Dashboard */}
           <NavLink
                to = "/"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                    <MdOutlineDashboardCustomize /> Dashboard

               </span>

           </NavLink>

            {/* orders */}
            <NavLink
                to = "/orders"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                    <TbTruckDelivery size={24} /> Orders

               </span>

           </NavLink>

            {/* food */}
           <NavLink
                to = "/food"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                    <IoRestaurantSharp size={24} /> Food

               </span>

           </NavLink>

            {/* drinks */}
           <NavLink
                to = "/drink"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                    <RiDrinks2Line size={24} /> Drinks

               </span>

           </NavLink>

            {/* liqour */}
           <NavLink
                to = "/liquor"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                    <MdLiquor size={24} /> Liquor

               </span>

           </NavLink>

            {/* merchendise */}
           <NavLink
                to = "/merchendise"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                    <GiClothes  size={24} /> Merchendise

               </span>

           </NavLink>

           {/* events */}
           <NavLink
                to = "/event"
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "bg-orange-100 text-orange-500 px-3 py-1 text-base/9 font-semibold rounded-xl" : "font-semibold text-base/9"}
           >

               <span className="flex items-center gap-x-5">

                     <TbCalendarEvent size={24} /> Event

               </span>

           </NavLink>


        </div>

    </div>

  )

}
