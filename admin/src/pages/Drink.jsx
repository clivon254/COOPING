



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
import _ from "lodash"


export default function Drink() {

  const {openDelete , setOpenDelete ,url , token ,products ,setProducts ,productLoading ,productError,fetchProducts} = useContext(StoreContext)

  const [loader ,setLoader] = useState([{},{},{},{}])

  const [product ,setProduct] = useState({})

  const [fetchingProductLoading , setFetchingProductLoading] = useState(false)

  const [fetchingProductError , setFetchingProductError] = useState(false)

  const [productToDelete , setProductToDelete] = useState("")

  const Drinks = products.filter(product => product.type === "Drink")

  const [filteredDrink , setFilteredDrink] = useState(Drinks)
  
  const [searchDrink , setSearchDrink] = useState("")


    // ***  PAGINATION  START***//
    
        const [page ,setPage] = useState(1)
    
        const [limit ,setLimit] = useState(8)
    
        const [siblings ,setSiblings] = useState(1)
    
    
        // getproducts
        const getProducts = (page,limit) => {
    
            let array = []
    
            for(let i = (page -1) * limit ; i < (page * limit) && filteredDrink[i] ; i++)
            {
                array.push(filteredDrink[i])
            }
    
            return array;
    
        }
    
        const finalProducts = getProducts(page,limit)
    
        const finalLength = filteredDrink?.length
    
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

    

  // handle Search
  const handleSearch = (e) => {

    const searchDrink = e.target.value 

    setSearchDrink(searchDrink)

    const filtered = Drinks?.filter((product) => product.name.toLowerCase().includes(searchDrink.toLowerCase()))

    setFilteredDrink(filtered)

  }

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

            <h2 className="text-4xl 2xl:text-5xl font-bold font-title">Drinks</h2>

            <h4 className="text-xs md:text-sm 2xl:text-xl text-slate-600">Different type of drink we have</h4>

          </div>

          {/* button */}
          <button className="flex  justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 ">

            <Link to="/add-drink" className="flex items-center gap-x-3">

              <IoMdAdd /> Add Drink

            </Link>

          </button>

        </div>

        {/* search */}
        <div className="flex justify-between items-center gap-x-5">

          <input 
            type="text" 
            className="block w-full shadow-xl rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FF9900] sm:text-sm/6"
            placeholder='enter drink . . . '
            onChange={handleSearch}
          />
         

          {/* button */}
          <button 
              className="flex  w-full justify-center rounded-md bg-[#FF9900] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:bg-[#ff9900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] disabled:cursor-not-allowed cursor-pointer disabled:bg-[#FF9900]/80 "
          >
            search
          </button>

        </div>

        {/* Drink */}
        <div 
          className="able-auto overflow-x-scroll md:mx-auto scrollbar 
          scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 
          dark:scrollbar-thumb-slate-500 "
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

                  {finalProducts.length > 0 ? (

                   <>

                      {finalProducts.map((food,index) => (

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

                                <Link to={`/update-drink/${food._id}`}>

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
                        You have no Drinks yet
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

        <Delete product={"Food"} item={product?.name} handleDelete={handleDelete}/>

      )}
    
    </>
  )

}
