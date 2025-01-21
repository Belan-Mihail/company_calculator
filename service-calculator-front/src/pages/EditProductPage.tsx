import React, { useState } from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../types/Product'

interface productData {
    productName: string,
    productPrice: number,
    producQuantityInStock: number
}

const EditProductPage:React.FC = () => {
    const {token} = useAuth()
    const {productId} = useParams()
    const navigate = useNavigate()

    


  return (
    <div>EditProductPage</div>
  )
}

export default EditProductPage