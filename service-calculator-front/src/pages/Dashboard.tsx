import React, { useState } from 'react'
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

  const handleReturnToMainPage = () => {
    navigate('/')
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