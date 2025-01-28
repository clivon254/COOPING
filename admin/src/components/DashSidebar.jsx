

import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { StoreContext } from '../context/store';



export default function DashSidebar() {

    const {open,setOpen} = useContext(StoreContext)


  return (

    
    <div className="">

        <div className="flex flex-col gap-y-3">

           <NavLink
                to = "/"
                onClick={() => setOpen(false)}
           >

               <span className="flex items-center gap-x-5">

                    <MdOutlineDashboardCustomize /> Dashboard

               </span>

           </NavLink>

        </div>

    </div>

  )

}
