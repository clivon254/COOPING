


import React, { useContext ,useEffect,useState} from 'react'
import { StoreContext } from '../context/store'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'sonner'
import axios from 'axios'
import Loader from '../components/loader'
import Error from '../components/Error'
import { GiCheckMark } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";
import _ from "lodash"
import OrderCard from '../components/OrderCard'



export default function Orders() {

  const {url,token,orders,ordersLoading,ordersError,products,openDelete,setOpenDelete,fetchOrders,setOrders} = useContext(StoreContext)
  
  const [order ,setOrder] = useState(null)

  const [fetchOrderLoading , setFetchOrderLoading] = useState(false)

  const [fetchOrderError , setFetchOrderError] = useState(false)

  const [orderToDelete , setOrderToDelete] = useState("")

  const [orderNumber , setOrderNumber] = useState("")

  const [filteredOrders ,setFilteredOrders] = useState(orders)

  const [status , setStatus] = useState([])



  // ***  PAGINATION  START***//

    const [page ,setPage] = useState(1)

    const [limit ,setLimit] = useState(5)

    const [siblings ,setSiblings] = useState(1)


    // getproducts
    const getProducts = (page,limit) => {

        let array = []

        for(let i = (page -1) * limit ; i < (page * limit) && filteredOrders[i] ; i++)
        {
            array.push(filteredOrders[i])
        }

        return array;

    }

    const finalProducts = getProducts(page,limit)

    const finalLength = filteredOrders?.length

    const totalPage = Math.ceil(finalLength / limit)


    // returnPaginationPage
    const returnPaginationPage = (totalPage ,page ,limit,siblings) => {

        let totalPageNoInArrray = 7 + siblings

        if(totalPageNoInArrray >= totalPage)
        {
            return _.range(1 ,totalPage + 1)
        }

        let leftSiblingsIndex = Math.max(page - siblings , 1)

        let rightSiblingsIndex = Math.min(page + siblings, totalPage)


        let showLeftDots = leftSiblingsIndex > 2 ;

        let showRightDots = rightSiblingsIndex < totalPage - 2

        if(!showLeftDots && showRightDots)
        {
            let leftItemsCount = 3 + 2 * siblings ;

            let leftRange = _.range(1 ,leftItemsCount + 1)

            return [...leftRange ,"...", totalPage]
        }
        else if(showLeftDots && !showRightDots)
        {
            let rightItemsCount = 3 + 2 * siblings

            let rightRange = _.range(totalPage - rightItemsCount + 1,totalPage +1)

            return [1, "...", ...rightRange]
        }
        else
        {
            let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)

            return[1,"...",...middleRange,"...",totalPage]
        }

    }

    const array = returnPaginationPage(totalPage,page,limit,siblings)

    // handlePageChange
    const handlePageChange = (value) => {

        if(value === "&laquo;")
        {
            setPage(1)
        }
        else if(value === "&lsquo;")
        {
            if(page !== 1)
            {
                setPage(page -1)
            }
        }
        else if(value === "&raquo;" )
        {
            if(page !== totalPage)
            {
                setPage(page+1)
            }
        }
        else if(value === "&rsquo;")
        {
            setPage(totalPage)
        }
        else
        {
            setPage(value)
        }

    }


  // ***  PAGINATION  END ***//
  


  useEffect(() => {

    window.scrollTo(0, 0);

    setFilteredOrders(orders)

  },[products,page])




  // fetchOrder
  const fetchOrder = async () => {

    try
    {
      setFetchOrderLoading(true)

      setFetchOrderError(false)

      const res = await axios.get(url + `/api/order/get-order/${orderToDelete}`)

      if(res.data.success)
      {
        setOrder(res.data.order)

        setFetchOrderLoading(false)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setFetchOrderLoading(false)

      setFetchOrderError(true)
    }

  }


  // handleSearch
  const handleSearch = (e) => {

    const searchNumber = e.target.value 

    const filtered = orders.filter((order) => order.orderNumber.toLowerCase().includes(searchNumber.toLowerCase()))

    setFilteredOrders(filtered)

  }


  // toggleStatus
  const toggleStatus = (e) => {

    if(status.includes(e.target.value))
    {

      setStatus(prev => prev.filter(item => item !== e.target.value))

    }
    else
    {
      setStatus(prev => [...prev, e.target.value])
    }

  }


  // applyfilter
  const applyFilter = () => {

    let ordersCopy = orders.slice()

    if(status.length > 0)
    {

      ordersCopy = ordersCopy.filter(order => status.includes(order.status))

    }

    setFilteredOrders(ordersCopy)

  }


  useEffect(() => {

    window.scrollTo(0,0)

    setFilteredOrders(orders)

  },[orders])

  
  useEffect(() => {

    applyFilter()

  },[status])




  useEffect(() => {

    window.scrollTo(0, 0)

  },[])

  

  return (

    <>

      <section className="w-full p-5 space-y-8">

        {/* header */}
        <div className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center">

            {/* title */}
            <div className="space-y-1">

              <h2 className="text-4xl 2xl:text-5xl font-bold font-title">Orders</h2>

              <h4 className="text-xs md:text-sm 2xl:text-xl text-slate-600">Orders by the client</h4>

            </div>

        </div>

        {/* search */}
        <div className="flex justify-between items-center gap-x-5">

            <input 
              type="text" 
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 shadow-xl"
              placeholder='enter order Number'
              onChange={handleSearch}
            />
            
            {/* date */}
            <input 
              type="date" 
              className="lg:block hidden w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 shadow-xl" 
            />

            {/* button */}
            <select 
              name="" 
              value={"Order Placed"}
              onChange={toggleStatus}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6 shadow-xl"
            >

              <option value="Order Placed">Order Placed</option>

              <option value="Processing">Processing</option>

              <option value="Out for delivery">Out for delivery</option>

              <option value="Delivered">Delivered</option>

            </select>

        </div>

        {/* orders */}
        <div className="">

          {!ordersLoading && !ordersError && (

            <>

                {/* orders */}
                <div className="">

                  {finalProducts.length > 0 ? 
                    (

                      <>
                        
                        <div className="space-y-3">

                          {finalProducts.map((order,index) => (

                            <OrderCard order={order} key={index}/>

                          ))}

                        </div>

                      </>

                    ) 
                    : 
                    (

                      <>

                        <div className="h-[40vh]">

                          <p className="text-center text-xl text-gray-700 font-semibold">Sorry , No order found!!!!</p>

                        </div>

                      </>

                    )
                  }

                </div>
            
            </>

          )}

          {ordersLoading && !ordersError && (

            <Loader/>
            
          )}

          {ordersError && (

           <Error retry={fetchOrders}/>
            
          )}

        </div>

        {/* pagignation */}
        {finalProducts.length > 0 && (

          <div className="w-full flex justify-center items-center">

            <ul className="flex py-4 ">

                <li className="border border-orange-200 bg-orange-50 text-[#ff9900] flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200 rounded-l-md">
                    <span onClick={() => handlePageChange("&laquo;")} className="">&laquo;</span>
                </li>

                <li className="border border-orange-200 bg-orange-50 text-[#ff9900] flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                    <span onClick={() => handlePageChange("&lsquo;")} className="">&lsaquo;</span>
                </li>

                {array.map(value => {

                    if(value === page)
                    {
                        return (
                            <li className="font-bold border border-orange-200 bg-orange-200 flex items-center justify-center h-10 w-10 cursor-pointer bg-primary text-[#FF9900]">
                                <span onClick={() => handlePageChange(value)} className="">{value}</span>
                            </li>
                        )
                    }
                    else
                    {
                        return (
                            <li className="font-bold border border-orange-200 bg-orange-50 flex items-center justify-center h-10 w-10 cursor-pointer text-[#FF9900]">
                                <span onClick={() => handlePageChange(value)} className="">{value}</span>
                            </li>
                        )
                    }

                })}
                
                <li className="border border-orange-200 bg-orange-50 text-[#ff9900] flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200">
                    <span onClick={() => handlePageChange("&raquo;")} className="">&rsaquo;</span>
                </li>

                <li className="border border-orange-200 bg-orange-50 text-[#ff9900] flex items-center justify-center h-10 w-10 cursor-pointer hover:bg-slate-200 rounded-r-md">
                    <span onClick={() => handlePageChange("&rsquo;")} className="">&raquo;</span>
                </li>

            </ul>

          </div>

        )}


      </section>

    

    </>
    
  )

}