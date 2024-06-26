"use client"

import Loading from '@/app/loading'
import ProductForm from '@/components/products/ProductForm'
import React, { useEffect, useState } from 'react'

// interface ProductResponse {
//   product: CartProducts;
//   status: number;
// }

const ProductDetails = ({ params }: { params: { Id: string }}) => {
  const [loading, setLoading] = useState(true)
  const [productDetails, setProductDetails] = useState<CartProducts | null>(null)

  const getProductDetails = async () => {
    try { 
      const res = await fetch(`/api/products/${params.Id}`, {
        method: "GET"
      })
      const data = await res.json()
      setProductDetails(data.product)
      console.log("ProductDetails : ",data)
      setLoading(false)
    } catch (err) {
      console.log("[productId_GET]", err)
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  return loading ? <Loading /> : (
    <ProductForm initialData={productDetails} />
  )
}

export default ProductDetails