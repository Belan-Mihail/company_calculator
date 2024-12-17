import React from 'react'
import { Product } from '../types/Product'

const products: Product[] = [
  {id: 1, name: 'Product 1', price: 2.34, quantity: 0, quantityInStock: 350 },
  {id: 1, name: 'Product 2', price: 3.19, quantity: 0, quantityInStock: 250 },
  {id: 1, name: 'Product 3', price: 2.77, quantity: 0, quantityInStock: 150 },
  {id: 1, name: 'Product 4', price: 4.80, quantity: 0, quantityInStock: 40 },
]

const Calculator = () => {
  return (
    <div>Calculator</div>
  )
}

export default Calculator