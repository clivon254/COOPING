


import React, { useContext ,useEffect,useState} from 'react'
import { StoreContext } from '../context/store'
import { FaTrashAlt } from 'react-icons/fa'
import Delete from '../components/Delete'
import { toast } from 'sonner'
import axios from 'axios'
import Loader from '../components/loader'
import Error from '../components/Error'
import { GiCheckMark } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";
import _ from "lodash"



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

    const [limit ,setLimit] = useState(10)

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

    setFilteredOrders(products)

  },[products,page])


  // statusHandler
  const statusHandler = async (event,orderId) => {

    try
    {
      const res = await axios.put(url + `/api/order/update-order`,{orderId,status:event.target.value},{headers:{token}})

      if(res.data.success)
      {

        fetchOrders()

        toast.success("order updateed successfully")

      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  // handleDelete
  const handleDelete = async () => {

    try
    {

      const res = await axios.delete(url + `/api/order/delete-order/${orderToDelete}`,{headers:{token}})

      if(res.data.success)
      {

        setOrders((prev) => 
        prev.filter((order) => order._id !== orderToDelete))

        setOpenDelete(false)

        toast.error("order deleted successfully")

        // fetchOrders()

      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


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

    applyFilter()

  },[status])


  useEffect(() => {

    fetchOrder()

  },[orderToDelete])


  useEffect(() => {

    window.scrollTo(0, 0)

    setFilteredOrders(orders)

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

                            <div 
                              className="border border-orange-200 bg-white shadow-xl rounded-md p-4 w-full grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] lg:[2fr_1fr_1fr_1fr] text-xs gap-3 "
                              key={index}
                            >

                              
                              {/* items && details  */}
                              <div className="">

                                <div className="mb-3 flex items-center gap-x-4">

                                  <span className="bg-orange-100 text-xs font-bold text-[#ff9900] h-7 flex justify-center items-center p-2 rounded-md shadow-md">Order N.O </span> 

                                  <span className="bg-green-100 text-green-700 font-bold tracking-wider text-sm h-7 flex justify-center items-center p-2 rounded-md shadow-md">#{order?.orderNumber}</span>

                                </div>

                                {/* order items */}
                                <div className="">

                                  {order?.items?.map((item,i) => (

                                    <div 
                                      className="flex gap-x-3 py-0.5"
                                      key={i}
                                    >

                                      <img 
                                          src={item?.images[0]} 
                                          alt="" 
                                          className="w-16 h-16 rounded-md shadow-xl" 
                                      />

                                      <div className="flex flex-col">

                                        <span className="font-bold">
                                          {item?.name} X {item?.variants?.map((variant) => (variant.quantity))}
                                        </span>

                                        {item?.variants?.map((variant,index) => {

                                          const Item = products.find(ite => ite._id === item._id)

                                          if(item?.type === 'Food')
                                          {
                                            
                                            //sauces
                                            if(Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                                            {

                                              return (

                                                <>

                                                  <span className="">

                                                    <span className="text-xs font-bold text-slate-500">sauces:</span>{variant?.sauces?.map((vant) => (vant)).join(",")}

                                                  </span>

                                                </>

                                              )

                                            } //spices
                                            else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none"))
                                            {

                                              return (

                                                <>

                                                  <span className="">

                                                    <span className="text-xs font-bold text-slate-500" >spices</span>{variant?.spices?.map((vant) => (vant)).join(",")} 

                                                  </span>

                                                </>

                                              )

                                            } //none
                                            else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none") && Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                                            {

                                              return(

                                                <></>

                                              )

                                            } // spices && sauces
                                            else
                                            {

                                              return(

                                                <>

                                                  <span className="text-sm text-gray-700">

                                                    <span className="text-xs font-bold text-slate-500">sauces :</span> {variant?.sauces?.map((vant) => (vant)).join(",")}

                                                  </span>

                                                  <span className="text-sm text-gray-700">

                                                    <span className="text-xs font-bold text-slate-500">spices :</span> {variant?.spices?.map((vant) => (vant)).join(",")} 

                                                  </span>

                                                </>

                                              )

                                            }

                                          }

                                          if(item?.type === 'Merchendise')
                                              {
                                                  
                                                if(Item?.colors?.length === 1 && Item?.colors?.some(color => color.name === "none"))
                                                {
                
                                                  return (
                
                                                    <>
                
                                                      <span className="text-xs">

                                                        <span className="text-xs font-bold text-slate-500">size: </span>{variant?.sizes} 

                                                      </span>
                
                                                    </>
                
                                                  )
                
                                                }
                                                else if(Item?.sizes?.length === 1 && Item?.sizes?.some(size => size.name === "none"))
                                                {
                
                                                  return (
                
                                                    <>
                
                                                      <span className="text-sm">

                                                        <span className="text-xs font-bold text-slate-500">color: </span>{variant?.colors} 

                                                      </span>
                
                                                    </>
                
                                                  )
                
                                                }
                                                else if(Item?.sauces?.length === 1 && Item?.sauces?.some(sauce => sauce.name === "none") && Item?.spices?.length === 1 && Item?.spices?.some(spice => spice.name === "none"))
                                                {
                
                                                  return(
                
                                                    <></>
                
                                                  )
                
                                                }
                                                else
                                                {
                
                                                  return(
                
                                                    <>

                                                      <span className="text-sm">

                                                        <span className="text-xs font-bold text-slate-500">size : </span>{variant?.size} 

                                                      </span>
                
                                                      <span className="text-sm">
                                                        
                                                        <span className="text-xs font-bold text-slate-500">color : </span>{variant?.color} 

                                                      </span>

                                                    </>
                
                                                  )
                
                                                }
                
                                          }

                                        })}

                                      </div>

                                    </div>

                                  ))}

                                </div>

                                {/* name */}
                                <div className="mt-3 font-semibold">
                                  {order?.address?.firstName + " " + order?.address?.lastName}
                                </div>

                                {/* address */}
                                <div className="">

                                  <p className="">{order?.address?.address}</p>

                                  <p className="">{order?.address?.City}</p>

                                </div>

                                {/* phone */}
                                <p className="">
                                  {order?.address?.phone}
                                </p>
                                
                              </div>

                              {/*method ,date,method  */}
                              <div className="space-y-1">

                                <p className="flex  items-center gap-x-2">

                                  <span className="font-bold text-slate-700">Items : </span> 

                                  <span className="font-bold text-slate-900">{order?.items?.length}</span>

                                </p>

                                <p className="flex  items-center gap-x-2">

                                  <span className="font-bold text-slate-700">Method : </span> 

                                  <span className="font-bold text-blue-600">{order?.paymentmethod}</span>

                                </p>

                                <p className="flex  items-center gap-x-2">

                                  <span className="font-bold text-slate-700">Payment : </span> 

                                  <span className="font-bold text-slate-900">{order?.payment ? <GiCheckMark size={20} className="text-green-500 shadow-xl"/> :<RiCloseLargeFill size={20} className="text-red-500 shadow-xl"/>}</span>

                                </p>

                                <p className="flex  items-center gap-x-2">

                                  <span className="font-bold text-slate-900">Date : </span>

                                  <span className="font-bold text-black text-sm">{new Date(order.createdAt).toLocaleString()} </span>
                                
                                </p>

                              </div>

                              {/* amount */}
                              <div className="">

                                <p className="text-xs font-bold text-gray-600">
                                  Amount : <span className="text-sm text-black font-semibold">{(order?.amount)?.toLocaleString('en-KE',{style:'currency' , currency :'KES'})} </span>
                                </p>

                                <p className="text-xs font-bold text-gray-600">
                                    Delivery : <span className="text-sm text-black font-semibold">{order?.delivery?.place} ,{(order?.delivery?.value)?.toLocaleString('en-KE',{style:'currency' , currency :'KES'})}</span>
                                </p>


                              </div>

                              {/* actions */}
                              <div className="flex items-center gap-x-3">

                                {/* status */}
                                <div className="text-xs">
                                  
                                  <select
                                    id="" 
                                    className="rounded-md border border-gray-600 text-xs font-semibold"
                                    value={order?.status}
                                    onChange={(event) => statusHandler(event,order._id)}
                                  >

                                    <option value="Order Placed">Order Placed</option>

                                    <option value="Processing">Processing</option>

                                    <option value="Out for delivery">Out for delivery</option>

                                    <option value="Delivered">Delivered</option>

                                  </select>

                                </div>
                                
                                {/* delete */}
                                <span 
                                  className="cursor-pointer bg-red-100 p-3 rounded-full shadow-md"
                                >

                                  <FaTrashAlt 
                                    size={20}
                                    className="text-red-700"
                                    onClick={() => {

                                      setOpenDelete(true)

                                      setOrderToDelete(order._id)
                                    }}
                                  />

                                </span>

                              </div>


                            </div>

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

      {openDelete && (

        <Delete product={"Order"} item={order?.orderNumber} handleDelete={handleDelete}/>

      )}

    </>
    
  )

}
