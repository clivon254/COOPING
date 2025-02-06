

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Loader from '../components/loader'
import Error from '../components/Error'
import Graph from '../components/Graph'
import {AiOutlineProduct} from "react-icons/ai"
import { FaUsers } from 'react-icons/fa6'
import { MdLiquor, MdRestaurant } from 'react-icons/md'
import { IoRestaurantSharp } from 'react-icons/io5'
import {RiDrinks2Line} from "react-icons/ri"
import { GiClothes, GiClothesline } from 'react-icons/gi'
import { TbTruckDelivery } from 'react-icons/tb'




export default function DashBoard() {

  const {adminStats,adminStatsLoading,adminStatsError,fetchAdminStats,setNumOfDays} = useContext(StoreContext)

  const [data ,setData] = useState([
    {
      title:"total users",
      value:(adminStats?.Users || 0),
      icon:<FaUsers className="text-[#FF9900]" size={30}/>
    },
    {
      title:"total Food",
      value:(adminStats?.totalFood || 0),
      icon:<RiDrinks2Line  className="text-[#FF9900]" size={30}/>
    },
    {
      title:"total Drinks",
      value:(adminStats?.totalDrinks || 0),
      icon:<IoRestaurantSharp className="text-[#FF9900]" size={30}/>
    },
    {
      title:"total Merchendise",
      value:(adminStats?.totalMerchendise || 0),
      icon:<GiClothes className="text-[#FF9900]" size={30}/>
    },
    {
      title:"total Liqour",
      value:(adminStats?.totalLiqour || 0),
      icon:<MdLiquor className="text-[#FF9900]" size={30}/>
    },
    {
      title:"Order Placed",
      value:(adminStats?.orderPlaced || 0),
      icon:<TbTruckDelivery className="text-[#FF9900]" size={30}/>
    }
    
  ])

  // onDateChange
  const onDateChange = (e) => {

    setNumOfDays(e.target.value)

  }

  console.log(adminStats)

  return (
    
    <>

      {!adminStatsLoading && !adminStatsError && (

        <section className="w-full p-5 space-y-10">

          {/* header */}
          <div className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center">

            {/* title */}
            <div className="space-y-1">

              <h2 className="text-4xl 2xl:text-5xl font-bold font-title">Dashboard</h2>

              <h4 className="text-xs md:text-sm 2xl:text-xl text-slate-600">Get statics of our store at glance</h4>

            </div>

            {/* button */}
            <select 
              name=""
              onChange={onDateChange}
              className="block min-w-80 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 shadow-xl"
            >

              <option value="7">7 Days</option>

              <option value="14">14 Days</option>

              <option value="30">30 Days</option>

              <option value="90">90 Days</option>

              <option value="120">120 Days</option>

              <option value="365">365 Days</option>

            </select>

          </div>

          {/* stats */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">

            {data?.map((stat,index) => (

              <div 
                key={index} 
                className="border border-orange-200 rounded-md shadow-md p-3"
              >

                <span className="flex justify-between items-center">

                  <span className="uppercase font-semibold">{stat.title}</span>

                  <span className=" bg-orange-100 p-2 rounded-full h-18 w-18 flex justify-center items-center shadow-md">{stat.icon}</span>

                </span>

                <span className="text-base font-bold text-gray-700">{stat.value}</span>

              </div>

            ))}
          </div>

          {/* graphs */}
          <div className="space-y-8">

            {/* sales Graph */}
            <div className="w-full space-y-5">

              <h2 className="text-xl font-semibold tracking-tighter">Sales stats</h2>

              <Graph dt={adminStats?.saleStats}/>

            </div>

            {/* Users Graph */}
            <div className="w-full space-y-5">

              <h2 className="text-xl font-semibold tracking-tighter">User stats</h2>

              <Graph dt={adminStats?.userStats}/>

            </div>

          </div>



        </section>

      )}

      {adminStatsLoading && !adminStatsError && (

        <Loader/>
        
      )}

      {adminStatsError && (

        <Error retry={fetchAdminStats}/>
        
      )}

    </>

  )

}
