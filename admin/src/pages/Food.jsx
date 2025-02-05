

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import Delete from '../components/Delete'
import axios from 'axios'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { Table } from 'flowbite-react'
import { MdOutlinePreview } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import Error from '../components/Error'


export default function Food() {

  const {openDelete , setOpenDelete ,url , token ,products ,setProducts ,productLoading ,productError,fetchProducts} = useContext(StoreContext)

  const [loader ,setLoader] = useState([{},{},{},{}])

  const [product ,setProduct] = useState({})

  const [fetchingProductLoading , setFetchingProductLoading] = useState(false)

  const [fetchingProductError , setFetchingProductError] = useState(false)

  const [productToDelete , setProductToDelete] = useState("")


  const Foods = products.filter(product => product.type === "Food")


  console.log(Foods)

  // fetchProduct
  const fetchProduct = async () => {

    try
    {
      setFetchingProductLoading(true)

      setFetchingProductError(false)

      const res = await axios.get(url + `/api/product/get-product/${productToDelete}`)

      if(res.data.success)
      {
        setProduct(res.data.product)

        setFetchingProductLoading(false)
      }

    }
    catch(error)
    {
      console.log(error)

      setFetchingProductError(true)
    }

  }

  // handleDelete
  const handleDelete = async () => {

    try{

      const res = await axios.delete(url + `/api/product/delete-product/${productToDelete}`,{headers:{token}})

      if(res.data.success)
      {

        setProducts(prev => 
          prev.filter(product => product._id !== productToDelete)
        )

        setOpenDelete(false)

        toast.error(`${product.name} is deleted successfully`)

      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  useEffect(() => {

    fetchProduct()

  },[productToDelete])

  return (
    
    <>

      <section className="w-full p-5 space-y-10">

        {/* header */}
        <div className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center">

          {/* title */}
          <div className="space-y-1">

            <h2 className="text-4xl 2xl:text-5xl font-bold font-title">Food Items</h2>

            <h4 className="text-xs md:text-sm 2xl:text-xl text-slate-600">Detailed information about the food items</h4>

          </div>

          {/* button */}
          <button className="flex  justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 ">

            <Link to="/add-food" className="flex items-center gap-x-3">

              <IoMdAdd /> Add Food Item

            </Link>

          </button>

        </div>

        {/* search */}
        <div className="flex justify-between items-center gap-x-5">

          <input 
            type="text" 
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"
            placeholder='enter food'
          />
          
          {/* category */}
          <select 
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"  
          >

          </select>

          {/* button */}
          <button 
              className="flex  w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
          >
            search
          </button>

        </div>

        {/* foods */}
        <div 
          className="table-auto overflow-x-scroll md:mx-auto scrollbar 
         scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 
         dark:scrollbar-thumb-slate-500 z-40"
        >

          <Table>

              <Table.Head>

                  <Table.HeadCell></Table.HeadCell>

                  <Table.HeadCell>image</Table.HeadCell>

                  <Table.HeadCell>name</Table.HeadCell>

                  <Table.HeadCell>category</Table.HeadCell>

                  <Table.HeadCell>sold</Table.HeadCell>

                  <Table.HeadCell>actions</Table.HeadCell>

              </Table.Head>

              {!productLoading && !productError && (

                <>

                  {Foods.length > 0 ? (

                   <>

                      {Foods.map((food,index) => (

                        <Table.Body>

                          <Table.Cell>{index+1}.</Table.Cell>

                          <Table.Cell>

                            <img 
                              src={food?.images[0]} 
                              alt="" 
                              className="h-16 w-16" 
                            />

                          </Table.Cell>

                          <Table.Cell>{food?.name}</Table.Cell>

                          <Table.Cell>{food?.category}</Table.Cell>

                          <Table.Cell>{food?.sold}</Table.Cell>

                          <Table.Cell>

                            <div className="flex items-center gap-x-3">

                              <span className="cursor-pointer">

                                  <Link to={`/product/${food._id}`}>

                                      <MdOutlinePreview size={24} className="text-[#003399]"/>

                                  </Link>

                              </span>

                              <span className="cursor-pointer">

                                <Link to={`/update-food/${food._id}`}>

                                  <FaEdit size={24} className="text-[#00CC00]"/>

                                </Link>

                              </span>

                              <span 
                                  className="cursor-pointer"
                                  onClick={() => {

                                    setOpenDelete(true)

                                    setProductToDelete(food._id)

                                  }}
                              >

                                <FaTrashAlt size={24} className="text-red-700"/>

                              </span>

                            </div>

                          </Table.Cell>

                        </Table.Body>

                      ))}

                   </>

                  ) 
                  : 
                  (

                    <Table.Body>

                      <Table.Cell colSpan={6} className='text-xl text-center text-slate-600 font-semibold'>
                        You have no food item yet
                      </Table.Cell>

                    </Table.Body>

                  )
                  }
                </>
              )}

              {productLoading && !productError && (

                <>

                  {loader.map((load,index) => (

                    <Table.Body>

                      <Table.Cell>

                        <span className="block h-5 w-5 rounded-md animate-pulse bg-slate-300"/>

                      </Table.Cell>

                      <Table.Cell>

                          <span className="block h-10 w-12 rounded-md animate-pulse bg-slate-300"/>

                      </Table.Cell>

                      <Table.Cell>

                          <span className="block h-5 w-20 rounded-md animate-pulse bg-slate-300"/>

                      </Table.Cell>

                      <Table.Cell>

                          <span className="block h-5 w-20 rounded-md animate-pulse bg-slate-300"/>

                      </Table.Cell>

                      <Table.Cell>

                        <span className="block h-5 w-12 rounded-md animate-pulse bg-slate-300"/>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="flex items-center gap-x-3">

                          <span className="block h-5 w-5 rounded-full animate-pulse bg-slate-300"/>

                          <span className="block h-5 w-5 rounded-full animate-pulse bg-slate-300"/>

                          <span className="block h-5 w-5 rounded-full animate-pulse bg-slate-300"/>

                        </div>

                      </Table.Cell>

                    </Table.Body>

                  ))}

                </>

              )}

              {productError && (

                <Table.Body>

                  <Table.Cell colSpan={6}>

                      <Error retry={fetchProducts}/>

                  </Table.Cell>

                </Table.Body>

              )}

          </Table>
        </div>

      </section>

      {openDelete && (

        <Delete product={"Food"} item={product?.name} handleDelete={handleDelete}/>

      )}
    
    </>
  )

}
