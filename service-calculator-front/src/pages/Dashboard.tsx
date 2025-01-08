import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types/Product'
import { Discount } from '../types/Discount'

const Dashboard = () => {
  const navigate = useNavigate()

//  states for products and discounts
const [products, setProducts] = useState<Product[]>([])
const [discounts, setDiscounts] = useState<Discount[]>([])

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    const data = await response.json()
    setProducts(data)
  } catch (error) {
    console.log(error)
  }
}

const fetchDiscounts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/discounts')
    const data = await response.json()
    setDiscounts(data)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchProducts()
  fetchDiscounts()
 
}, [])


  const handleReturnToMainPage = () => {
    navigate('/')
  }

  const handleDeleteProduct = async (productId:string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {method: 'DELETE'})
        if (response.ok) {
          fetchProducts()
        }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteDiscount = async (discountId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/discounts/${discountId}`, {method: 'DELETE'})
      if (response.ok) {
        fetchDiscounts()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditProduct = (productId: string) => {
    navigate(`/edit-products/${productId}`)
  }

  const handleEditDiscount = (discountId: string) => {
    navigate(`/edit-discounts/${discountId}`)
  }

  const handleAddProduct = () => {
    navigate('/add-product')
  }

  const handleAddDiscount = () => {
    navigate('/add-discount')
  }
  
  return (
    <div>
      <h2 className='my-4'>Dashboard Page</h2>
      <div>
        <button className='main' type='button' onClick={handleReturnToMainPage}>Back to Main Page</button>
      </div>
    </div>
  )
}

export default Dashboard