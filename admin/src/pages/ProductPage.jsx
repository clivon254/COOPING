

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Loader from '../components/loader'
import Error from '../components/Error'

export default function ProductPage() {

  const {url,token,products} = useContext(StoreContext)

  const {productId} = useParams()

  const [product ,setProduct] = useState({})

  const [productLoading ,setProductLoading] = useState(false)

  const [productError ,setProductError] = useState(false)

  // fetchProduct
  const fetchProduct = async () => {

    try
    {

      setProductLoading(true)

      setProductError(false)

      const res = await axios.get(url + `/api/product/get-product/${productId}`)

      if(res.data.success)
      {
        setProductLoading(false)

        setProduct(res.data.product)

      }

    }
    catch(error)
    {
      console.log(error.message)

      setProductError(true)

      setProductLoading(false)
    }

  }

  console.log(product)

  useEffect(() => {

    fetchProduct()

  },[productId])

  return (
    
    <>

      {!productError && !productLoading && (

       
        <section className="w">


        </section>

      )}

      {productLoading && !productError && (

        <Loader/>

      )}

      {productError && (

        <Error retry={fetchProduct}/>

      )}

    </>

  )

}
