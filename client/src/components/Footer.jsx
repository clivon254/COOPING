

import React from 'react'
import LOGO from "../assets/LOGOO.png"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF,FaWhatsapp,FaTiktok } from "react-icons/fa";



export default function Footer() {

  const current_year = new Date().getFullYear()

  return (

    <footer className="w-full border-t-2 border-orange-400 p-5 space-y-3">

      {/* upper */} 
      <div className="w-full flex justify-between flex-wrap gap-x-10 gap-y-2">

        {/*info */}
        <div className="space-y-2">

          {/* image */}
          <div className="h-12 w-36 sm:h-16 sm:w-48 md:h-20 md:w-60 lg:h-24 lg:w-72 ">

            <img 
              src={LOGO} 
              alt="" 
              className="h-full w-full" 
            />

          </div>

          <div className="flex flex-col gap-y-2 text-sm font-semibold">

            <span className="">

              <span className="font-bold">Address : </span> <span className="">Nairobi , Kenya</span>

            </span>

            <span className="">

              <span className="font-bold"> Contact : </span> <span className=""> + 254111202895</span>

            </span>

            <span className="">

              <span className="font-bold">Email : </span> <span className="">cooping@gmail.com</span>

            </span>

            <span className="">

              <span className="font-bold">Working Hours: </span> <span className="">8:00 am - 10:00 pm , Mon - Mon </span>

            </span>

          </div>

          {/* socials */}
          <div className="flex items-center mt-5 gap-x-5">

            <span className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-[#FF9900] shadow-md cursor-pointer">
              
              <FaInstagram className=""/>

            </span>

            <span className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-[#FF9900] shadow-md cursor-pointer">
              
              <FaFacebookF />

            </span>

            <span className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-[#FF9900] shadow-md cursor-pointer">
              <FaTiktok />
            </span>

            <span className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-[#FF9900] shadow-md cursor-pointer">
              <FaWhatsapp />
            </span>

          </div>


        </div>

        {/* useful links  */}
        <div className="space-y-3">

          <h2 className="text-xl font-bold tracking-tighter text-slate-500">useful link</h2>

          <div className="flex flex-col gap-y-1 text-sm font-semibold">

            <span className="">Contact us</span>

            <span className="">About us</span>

            <span className="">Food</span>

            <span className="">Merchendise</span>

            <span className="">Liqour</span>

            <span className="">Drink</span>

          </div>

        </div>

        {/* support  */}
        <div className="space-y-2">

          <h2 className="text-xl font-bold tracking-tighter text-slate-500">Support</h2>

          <div className="flex flex-col gap-y-1 text-sm font-semibold">

            <span className="">Return & Exchnage</span>

            <span className="">FAQ</span>

            <span className="">Shipping & Delivery</span>

          </div>

        </div>

        {/*legal  */}
        <div className="space-y-2">

          <h2 className="text-xl font-bold tracking-tighter text-slate-500">Legal</h2>

          <div className="flex flex-col gap-y-2 text-sm font-semibold">

            <span className="">Privacy Policy</span>

            <span className="">Terms of Service</span>

            <span className="">Cookie Policy</span>

          </div>

        </div>

      </div>

      <hr />

      {/* lower */}
      <div className="text-sm">

        <p className="text-center">Copyright {current_year} &copy;  Cooping | | All rights Reserved</p>

      </div>

    </footer>

  )

}
