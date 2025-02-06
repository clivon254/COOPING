

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
import { Table } from 'flowbite-react'




export default function DashBoard() {

  const {adminStats,adminStatsLoading,adminStatsError,fetchAdminStats,setNumOfDays,numOfDays} = useContext(StoreContext)

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

  const [loader ,setLoader] = useState([
    {},{},{},{},{},{},{},{}
  ])

  const [most ,setMost] = useState([
    {},{},{},{},{}
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
              value={numOfDays}
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

          {/*  */}
          <div className="">

            <h2 className="text-xl font-bold tracking-tighter">Statistics from the last {numOfDays} Days</h2>

          </div>

          {/* stats */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">

            {data?.map((stat,index) => (

              <div 
                key={index} 
                className="border border-orange-100 rounded-md shadow-md p-3"
              >

                <span className="flex justify-between items-center">

                  <span className="uppercase font-semibold">{stat.title}</span>

                  <span className=" bg-orange-100 p-2 rounded-full h-18 w-18 flex justify-center items-center shadow-md">{stat.icon}</span>

                </span>

                <span className="text-base font-bold text-gray-700">{stat.value}</span>

              </div>

            ))}
            
          </div>

          {/*most && reveiwed products  */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">

            {/* most sold products */}
            <div className="space-y-5">

              <h2 className="text-xl font-bold tracking-tighter">Most sold products</h2>

              <Table>

                <Table.Head>

                  <Table.HeadCell>Image</Table.HeadCell>

                  <Table.HeadCell>Name</Table.HeadCell>

                  <Table.HeadCell>Sold</Table.HeadCell>

                </Table.Head>

                {adminStats?.mostSoldProducts?.length > 0 ? (
               
                  <>

                    {adminStats?.mostSoldProducts?.map((product,index) => (

                      <Table.Body key={index}>


                        <Table.Cell>

                          <div className="h-14 w-14 min-w-14 min-h-14">

                            <img src={product.images[0]} alt="" className="h-full w-full rounded-md shadow-md" />

                          </div>

                        </Table.Cell>

                        <Table.Cell className="font-semibold">{product?.name}</Table.Cell>

                        <Table.Cell>{product?.sold}</Table.Cell>

                      </Table.Body>

                    ))}

                  </>

                ) 
                : 
                (

                  <Table.Body>

                    <Table.Cell colSpan={5} className=" text-xl font-semibold text-center">
                      There are no products yet!!!
                    </Table.Cell>

                  </Table.Body>
                )}

              </Table>

            </div>

            {/* most reveiwed products */}
            <div className="space-y-5">

              <h2 className="text-xl font-bold tracking-tighter">Most reveiwed products</h2>

              <Table>

                <Table.Head>

                  <Table.HeadCell>Image</Table.HeadCell>

                  <Table.HeadCell>Name</Table.HeadCell>

                  <Table.HeadCell>Reveiw</Table.HeadCell>

                </Table.Head>

                {adminStats?.mostReveiwedProducts?.length > 0 ? (
               
                  <>

                    {adminStats?.mostReveiwedProducts?.map((product,index) => (

                      <Table.Body key={index}>


                        <Table.Cell>

                          <div className="h-14 w-14 min-w-14 min-h-14">

                            <img src={product.images[0]} alt="" className="h-full w-full rounded-md shadow-md" />

                          </div>

                        </Table.Cell>

                        <Table.Cell className="font-semibold">{product?.name}</Table.Cell>

                        <Table.Cell>{product?.sold}</Table.Cell>

                      </Table.Body>

                    ))}

                  </>

                ) 
                : 
                (

                  <Table.Body>

                    <Table.Cell colSpan={5} className=" text-xl font-semibold text-center">
                      There are no products yet!!!
                    </Table.Cell>

                  </Table.Body>
                )}

              </Table>

            </div>

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

        <section className="w-full p-5 space-y-10">

          {/* header */}
          <div className="flex flex-col gap-y-5 sm:flex-row sm:justify-between sm:items-center">

            {/* title */}
            <div className="space-y-1">

              <span className="animate-pulse block rounded-md bg-slate-300 h-7 w-52"/>

              <span className="animate-pulse block rounded-md bg-slate-300 h-5 w-100"/>

            </div>

            {/* button */}
            <span className="animate-pulse block rounded-md bg-slate-300 h-5 w-70"/>

          </div>

          {/* lina */}
          <div className="">

            <span className="animate-pulse block rounded-md bg-slate-300 h-3 w-60"/>

          </div>

          {/* stats */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">

            {loader?.map((stat,index) => (

              <div 
                key={index} 
                className="border border-orange-100 rounded-md shadow-md p-3 bg-slate-100 "
              >

                <span className="flex justify-between items-center gap-x-4">

                    <span className="animate-pulse block rounded-md bg-slate-300 h-4 w-40"/>

                    <span className="animate-pulse block rounded-full shadow-md bg-slate-300 h-10 w-10"/>

                </span>

                <span className="animate-pulse block rounded-md bg-slate-300 h-4 w-4"/>

              </div>

            ))}

          </div>

          {/*most && reveiwed products  */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">

            {/* most sold products */}
            <div className="space-y-5">

              <h2 className="text-xl font-bold tracking-tighter">Most sold products</h2>

              <Table>

                <Table.Head>

                  <Table.HeadCell>Image</Table.HeadCell>

                  <Table.HeadCell>Name</Table.HeadCell>

                  <Table.HeadCell>Sold</Table.HeadCell>

                </Table.Head>
  
                {most?.map((product,index) => (

                  <Table.Body key={index}>


                    <Table.Cell>

                      <span className="animate-pulse block rounded-md bg-slate-300 h-10 w-10"/>

                    </Table.Cell>

                    <Table.Cell className="font-semibold">

                        <span className="animate-pulse block rounded-md bg-slate-300 h-4 w-30"/>

                    </Table.Cell>

                    <Table.Cell>

                        <span className="animate-pulse block rounded-md bg-slate-300 h-4 w-4"/>

                    </Table.Cell>

                  </Table.Body>

                ))}

              </Table>

            </div>

            {/* most reveiwed products */}
            <div className="space-y-5">

              <h2 className="text-xl font-bold tracking-tighter">Most reveiwed products</h2>

              <Table>

                <Table.Head>

                  <Table.HeadCell>Image</Table.HeadCell>

                  <Table.HeadCell>Name</Table.HeadCell>

                  <Table.HeadCell>Rate</Table.HeadCell>

                </Table.Head>
  
                {most?.map((product,index) => (

                  <Table.Body key={index}>


                    <Table.Cell>

                      <span className="animate-pulse block rounded-md bg-slate-300 h-10 w-10"/>

                    </Table.Cell>

                    <Table.Cell className="font-semibold">

                        <span className="animate-pulse block rounded-md bg-slate-300 h-4 w-30"/>

                    </Table.Cell>

                    <Table.Cell>

                        <span className="animate-pulse block rounded-md bg-slate-300 h-4 w-4"/>

                    </Table.Cell>

                  </Table.Body>

                ))}

              </Table>

            </div>

            
          </div>


        </section>
        
      )}

      {adminStatsError && (

        <Error retry={fetchAdminStats}/>
        
      )}

    </>

  )

}
