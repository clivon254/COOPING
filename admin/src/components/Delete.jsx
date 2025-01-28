

import React, { useContext } from 'react'
import { HiExclamation, HiExclamationCircle } from "react-icons/hi"
import { StoreContext } from '../context/store'

export default function Delete({product,item,handleDelete}) {

    const {setOpenDelete} = useContext(StoreContext)

  return (

    <div className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-black/50 backdrop-blur-sm">

        <div className="space-y-5 p-4 w-[80%] lg:w-[40%] 2xl:w-[30%] mx-auto shadow-md bg-white transition-all duration-500 ease-in rounded-md">

                <HiExclamationCircle size={50} className="mx-auto"/>

                <h2 className="text-center text-xl font-semibold text-slate-700">
                    Are you want to delete {product} ,{item} ?
                </h2>

                <div className="flex justify-around items-center gap-x-4">

                    <button 
                        className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed cursor-pointer disabled:bg-red-400/80 "
                        onClick={() => handleDelete()}
                    >
                        Yes , Im Sure
                    </button>

                    <button 
                        className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed cursor-pointer disabled:bg-black/80 "
                        onClick={() => setOpenDelete()}
                    >
                        No , Cancel
                    </button>

                </div>

        </div>

    </div>

  )

}
