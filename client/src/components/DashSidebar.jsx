

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { NavLink } from 'react-router-dom'

export default function DashSidebar() {

  const {NavLinks,setOpen} = useContext(StoreContext)

  return (

    <>

        <div className="flex flex-col gap-y-3">

            {NavLinks?.map((nav,index) => (

                    <NavLink
                        key={index}
                        to={`${nav.path}`}
                        className={({isActive}) => isActive ? "flex items-center gap-x-1 text-sm font-semibold text-orange-600" : "flex items-center gap-x-1 text-sm font-semibold"}
                        onClick={() => setOpen(false)}
                    >

                    <span className="">{nav?.icon}</span>{nav?.name}

                    </NavLink>

            ))}

        </div>
    
    </>

  )

}
