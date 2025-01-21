import React, { useState } from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../types/Product'

interface productData {
    productName: string,
    productPrice: number,
    productQuantityInStock: number
}

const EditProductPage:React.FC = () => {
    const {token} = useAuth()
    const {productId} = useParams()
    const navigate = useNavigate()

    // state to manage product form data
    const [productData, setProductData] = useState<productData>({
        productName: '',
        productPrice: 0,
        productQuantityInStock: 0,
    })


  return (
    <div>EditProductPage</div>
  )
}

export default EditProductPage