import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

interface ProductFormData {
    productName: string,
    productPrice: number,
    productQuantityInStock: number,
    errorMessage: string
}

const AddProduct = () => {
    const navigate = useNavigate()

    

  return (
    <div>AddProduct</div>
  )
}

export default AddProduct