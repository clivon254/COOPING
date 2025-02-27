

import React from 'react'
import LOGO from "../assets/LOGOO.png"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF,FaWhatsapp,FaTiktok } from "react-icons/fa";
import {Link} from "react-router-dom"
import { CiLocationOn } from "react-icons/ci";
import { RiUserLocationLine } from "react-icons/ri";
import { SlEnvolope } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";




export default function Footer() {

  const current_year = new Date().getFullYear()

  return (

    <footer className="w-full border-t-2 border-orange-400 p-5 space-y-3">

      {/* upper */} 
      <div className="w-full flex justify-between flex-wrap gap-x-10 gap-y-5">

        {/*info */}
        <div className="space-y-5">

          {/* logo*/}
          <div className="h-12 w-36 sm:h-16 sm:w-48 md:h-20 md:w-60 lg:h-24 lg:w-72 ">

            <img 
              src={LOGO} 
              alt="" 
              className="h-full w-full" 
            />

          </div>

          {/* details */}
          <div className="flex flex-col gap-y-3 text-sm font-semibold">

            <div className="flex gap-x-1">

              <span className="font-bold flex gap-x-1 items-center"> <CiLocationOn size={18}/> Address : </span> 
              
              <span className="">Nairobi , Kenya</span>

            </div>

            <span className="flex gap-x-1">

              <span className="font-bold flex gap-x-1 items-center"> <RiUserLocationLine size={18}/> Contact : </span> <span className=""> + 254111202895</span>

            </span>

            <span className="flex gap-x-1">

              <span className="font-bold flex gap-x-1 items-center"> <SlEnvolope size={18}/> Email : </span> <span className="">cooping@gmail.com</span>

            </span>

            <span className="flex gap-x-1">

              <span className="font-bold flex gap-x-1 items-center"> <FaRegClock size={18}/> Working Hours: </span> <span className="">8:00 am - 10:00 pm , Mon - Mon </span>

            </span>

          </div>

          {/* socials */}
          <div className="flex items-center mt-5 gap-x-5">

            <span className="h-12 w-12 bg-orange-100 hover:bg-black rounded-md flex items-center justify-center text-[#FF9900] hover:text-rose-500 shadow cursor-pointer">
              
              <FaInstagram className=""/>

            </span>

            <span className="h-12 w-12 bg-orange-100 hover:bg-blue-600 rounded-md flex items-center justify-center text-[#FF9900] hover:text-white shadow cursor-pointer">
              
              <FaFacebookF />

            </span>

            <span className="h-12 w-12 bg-orange-100 hover:bg-black rounded-md flex items-center justify-center text-[#FF9900] hover:text-rose-500 shadow cursor-pointer">
              <FaTiktok />
            </span>

            <span className="h-12 w-12 bg-orange-100 hover:bg-white rounded-md flex items-center justify-center text-[#FF9900] hover:text-green-500 shadow cursor-pointer">
              <FaWhatsapp />
            </span>

          </div>


        </div>

        {/* useful links  */}
        <div className="space-y-3">

          <h2 className="text-xl font-bold tracking-tighter text-primary">useful link</h2>

          <div className="flex flex-col gap-y-1 text-sm font-semibold">

            <span className="">

              <Link to="/contact">Contact us</Link>

            </span>

            <span className="">

              <Link to="/about">About us</Link>

            </span>

            <span className="">

              <Link to="/food">Food</Link>

            </span>

            <span className="">

              <Link to="/merchendise">Merchendise</Link>

            </span>

            <span className="">

              <Link to="/liqour">booze</Link>

            </span>

            <span className="">

              <Link to="/drink">Drink</Link>

            </span>

          </div>

        </div>

        {/* support  */}
        <div className="space-y-2">

          <h2 className="text-xl font-bold tracking-tighter text-primary">Support</h2>

          <div className="flex flex-col gap-y-1 text-sm font-semibold">

            <span className="">Return & Exchnage</span>

            <span className="">FAQ</span>

            <span className="">Shipping & Delivery</span>

          </div>

        </div>

        {/*legal  */}
        <div className="space-y-2">

          <h2 className="text-xl font-bold tracking-tighter text-primary">Legal</h2>

          <div className="flex flex-col gap-y-2 text-sm font-semibold">

            <span className="">Privacy Policy</span>

            <span className="">Terms of Service</span>

            <span className="">Cookie Policy</span>

          </div>

        </div>

      </div>

      <hr className="bg-primary h-1/2"/>

      {/* lower */}
      <div className="text-sm font-semibold">

        <p className="text-center">Copyright {current_year} &copy;  Cooping | | All rights Reserved</p>

      </div>

    </footer>

  )

}
