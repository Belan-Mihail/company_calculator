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
    console.log(data)
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

  const handleDeleteProduct = async (productId:number) => {
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

  const handleEditProduct = (productId: number) => {
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
  // !!!!!!!!!!!!!!!!!!!! edt toast
  
  return (
    <div>
      <h2 className='my-4'>Dashboard Page</h2>
      <div>
        <button className='main' type='button' onClick={handleReturnToMainPage}>Back to Main Page</button>
      </div>
      <div>
        <h3>Current Products</h3>
        {products.length > 0 ? (
          <div>
            {/* edit as table */}
            {products.map((product) => (
              <div key={product.product_id} className='flex items-center justify-around gap-4'>
                <p>{product.product_name}</p>
                <p>Price: {product.product_price}$</p>
                <p>Quantity On Stock: {product.product_quantityInStock}$</p>
                <button className='main' type='button' onClick={() => handleEditProduct(product.product_id)}>Edit Product</button>
                <button className='main' type='button' onClick={() => handleDeleteProduct(product.product_id)}>Delete Product</button>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no products available</p>
        )}
        <button className='main' type='button' onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h3>Current Discount</h3>
        {discounts.length > 0 ? (
          <div>
            {/* edit as table */}
            {discounts.map((discount) => (
              <div key={discount._id} className='flex items-center justify-between gap-4'>
                <p>Discount Size: {discount.discount_size}</p>
                <p>Discount available from: {discount.available_from}</p>
                <button className='main' type='button' onClick={() => handleEditDiscount(discount._id)}>Edit Discount</button>
                <button className='main' type='button' onClick={() => handleDeleteDiscount(discount._id)}>Delete Discount</button>
              </div>
            ))}
          </div>
        ) : (
          <p>There are no products available</p>
        )}
        <button className='main' type='button' onClick={handleAddDiscount}>Add Discount</button>
      </div>
    </div>
  )
}

export default Dashboard