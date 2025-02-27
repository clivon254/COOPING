

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { NavLink } from 'react-router-dom'
import { MdPermDeviceInformation } from 'react-icons/md'
import { FaInfo , FaQuestion } from "react-icons/fa";


export default function DashSidebar() {

  const {NavLinks,setOpen} = useContext(StoreContext)

  return (

    <>

        <div className="flex flex-col gap-y-4">

            {NavLinks?.map((nav,index) => (

                    <NavLink
                        key={index}
                        to={`${nav.path}`}
                        className={({isActive}) => isActive ? "flex items-center gap-x-1 text-base font-semibold text-primary" : "flex items-center gap-x-1 text-base font-semibold"}
                        onClick={() => setOpen(false)}
                    >

                    <span className="">{nav?.icon}</span>{nav?.name}

                    </NavLink>

            ))}

            <NavLink
                to={`/about`}
                className={({isActive}) => isActive ? "flex items-center gap-x-1 text-base font-semibold text-primary" : "flex items-center gap-x-1 text-base font-semibold"}
                onClick={() => setOpen(false)}
            >

            <span className=""><FaInfo/></span> About

            </NavLink>

            <NavLink
                to={`/contact`}
                className={({isActive}) => isActive ? "flex items-center gap-x-1 text-base font-semibold text-primary" : "flex items-center gap-x-1 text-base font-semibold"}
                onClick={() => setOpen(false)}
            >

              <span className=""><MdPermDeviceInformation/></span> contact

            </NavLink>

            <NavLink
                to={`/faq`}
                className={({isActive}) => isActive ? "flex items-center gap-x-1 text-base font-semibold text-primary" : "flex items-center gap-x-1 text-base font-semibold"}
                onClick={() => setOpen(false)}
            >

              <span className=""><FaQuestion/></span> FAQ

            </NavLink>

        </div>
    
    </>

  )

}
