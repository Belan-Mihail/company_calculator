import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types/Product'
import { Discount } from '../types/Discount'

const Dashboard = () => {
  const navigate = useNavigate()

//  states for products and discounts
const [product, setProduct] = useState<Product[]>([])
const [discount, setDiscount] = useState<Discount[]>([])

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