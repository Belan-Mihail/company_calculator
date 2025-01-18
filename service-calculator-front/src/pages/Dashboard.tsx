import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types/Product'
import { Discount } from '../types/Discount'

const Dashboard = () => {
  const navigate = useNavigate()

//  states for products and discounts
const [products, setProducts] = useState<Product[]>([])
const [discounts, setDiscounts] = useState<Discount[]>([])
const [isModalOpen, setIsModalOpen] = useState(false)

const handleModalOpen = () => {
  setIsModalOpen(true)
}

const handleModalClose = () => {
  setIsModalOpen(false)
}

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
    setIsModalOpen(false)
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
    setIsModalOpen(false)
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
    <div className='flex flex-col items-center justify-center m-8 p-4 gap-2 rounded main mx-auto mt-10 w-max'>
      <h2 className='text-xl font-bold'>Dashboard Page</h2>
      <div>
        <button className='main-button' type='button' onClick={handleReturnToMainPage}>Back to Main Page</button>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <h3 className='text-lg font-bold'>Current Products</h3>
        {products.length > 0 ? (
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-gray-600'>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Product Name</th>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Price</th>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Quantity In Stock</th>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Edit Action</th>
                <th className='text-center text-white border-2 border-gray-600 border-l-white p-2'>Delete Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className='text-center border border-gray-500 p-2'>{product.product_name}</td>
                  <td className='text-center border border-gray-500 p-2'>{product.product_price}</td>
                  <td className='text-center border border-gray-500 p-2'>{product.product_quantityInStock}</td>
                  <td className='text-center border border-gray-500 p-2 cursor-pointer hover:text-[#fe8924] hover:bg-[#e6e9f1]' onClick={() => handleEditProduct(product.product_id)}>Edit product</td>
                  <td className='text-center border border-gray-500 p-2 cursor-pointer hover:text-[#fe8924] hover:bg-[#e6e9f1]' onClick={() => handleDeleteProduct(product.product_id)}>Delete Product</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>There are no products available</p>
        )}
        <div className='flex justify-center'>
          <button className='main-button' type='button' onClick={handleAddProduct}>Add Product</button>
        </div>
        
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <h3 className='text-lg font-bold'>Current Discount</h3>
        {discounts.length > 0 ? (
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-gray-600'>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Discount Size</th>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Available From</th>
                <th className='text-center text-white border-2 border-gray-600 border-r-white p-2'>Edit Action</th>
                <th className='text-center text-white border-2 border-gray-600 border-l-white p-2'>Delete Action</th>
              </tr>
            </thead>
            
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount._id} >
                  <td className='text-center border border-gray-500 p-2'>{discount.discount_size}</td>
                  <td className='text-center border border-gray-500 p-2'>{discount.available_from}</td>
                  <td onClick={() => handleEditDiscount(discount._id)} className='text-center border border-gray-500 p-2 cursor-pointer hover:text-[#fe8924] hover:bg-[#e6e9f1]'>Edit Discount</td>
                  <td onClick={() => handleDeleteDiscount(discount._id)} className='text-center border border-gray-500 p-2 cursor-pointer hover:text-[#fe8924] hover:bg-[#e6e9f1]'>Delete Discount</td>
                </tr>
              ))}
            </tbody>
            
          </table>
        ) : (
          <p>There are no products available</p>
        )}
        <div className='flex justify-center'>
          <button className='main-button' type='button' onClick={handleAddDiscount}>Add Discount</button>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard