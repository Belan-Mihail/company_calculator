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
    <div className='flex flex-col items-center justify-center m-8 p-4 gap-4 rounded main mx-auto mt-10 w-max'>
      <h2 className='my-4'>Dashboard Page</h2>
      <div>
        <button className='main p-2' type='button' onClick={handleReturnToMainPage}>Back to Main Page</button>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <h3>Current Products</h3>
        {products.length > 0 ? (
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity In Stock</th>
                <th>Edit Product</th>
                <th>Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>{product.product_quantityInStock}</td>
                  <td onClick={() => handleEditProduct(product.product_id)}>Edit product</td>
                  <td onClick={() => handleDeleteProduct(product.product_id)}>Delete Product</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>There are no products available</p>
        )}
        <button className='main w-max p-2' type='button' onClick={handleAddProduct}>Add Product</button>
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