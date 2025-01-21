import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import { toast, ToastContainer } from 'react-toastify'


const EditProductPage:React.FC = () => {
    const {token} = useAuth()
    const {productId} = useParams()
    const navigate = useNavigate()

    // state to manage product form data
    const [productData, setProductData] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        quantityInStock: 0,
    })

    // state to manage validation errors
    const [validationErrors, setValidationErrors] = useState({
        productNameError: null,
        productPriceError: null,
        productQuantityInStockError: null
    })

    // Fetch product details on component mount
    useEffect(() => {
        // check token or redirect user to login page
        if (!token) {
            navigate('/login')
            return
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json()
                if (response.ok) {
                    setProductData(data)
                } else {
                    toast.error(data.message || 'Error fetching product')
                }
            } catch (error) {
                console.log(error)
                toast.error('Failed to fetch product')
            }
        }

        if (productId) {
            fetchProduct()
        }
    }, [token, productId, navigate])

     // function to validate form fields
     const validateFields = () => {
        let isValid = true
        const NewValidationErrors: any = {
            productNameError: null,
            productPriceError: null,
            productQuantityInStockError: null
        }

        if (productData.name.trim()) {
            NewValidationErrors.productNameError = 'Product name is required'
            isValid = false
        }

        if (isNaN(productData.price) || productData.price <= 0) {
            NewValidationErrors.productPriceError = 'Price must be a valid number greater than 0.'
            isValid = false
        }

        if (isNaN(productData.quantityInStock) || productData.quantityInStock <= 0) {
            NewValidationErrors.productQuantityInStockError = 'Quantity in stock must be a valid number greater than or equal to 0.'
            isValid = false
        }

        setValidationErrors(NewValidationErrors)
        return isValid
     }

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // viladate form fields
        if (!validateFields()) {
            return
        }

        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'apllication/json',
                    'Authorization': `Bearer ${token}` 
                }, 
                body: JSON.stringify({
                    product_name: productData.name,
                    product_price: productData.price,
                    product_quantity: 0,
                    product_quantityInStock: productData.quantityInStock
                })
            })

            if (response.ok) {
                toast.success('Product updated successfully!')
                navigate('/dashboard')
            } else {
                const data = await response.json()
                toast.error( data.message || 'Failed to update product')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
     }

     // Handler for changes in form fields
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setProductData((prevData) => ({
            ...prevData, [name]: value
        }))
     }

     const handleReturnToMainPage = () => {
        navigate('/')
     }


  return (
    <div className='flex flex-col items-center  justify-center m-8 p-4 gap-2 rounded-lg main mx-auto mt-10 w-max'>
        <h2 className='text-xl font-bold'>Ecit Product</h2>
        <form onSubmit={handleSubmit} className='w-full max-w-lg'>
            <div className='mb-4'>
                <label htmlFor="productName" className='block text-sm font-semibold'>
                    Product Name
                </label>
                <input type="text" id='productName' name='name' value={productData.name} onChange={handleChange} placeholder='Enter product name' />
            </div>
            <div className='mb-4'>
                <label htmlFor="productPrice" className='block text-sm font-semibold'>Product Price</label>
                <input type="text" id='productPrice' name='price' value={productData.price} onChange={handleChange} placeholder='Enter product price' />
                {validationErrors.productPriceError && (
                        <p className="text-red-500 text-xs">{validationErrors.productPriceError}</p>
                    )}
            </div>
            <div className='mb-4'>
                <label htmlFor="productQuantityInStock" className='block text-sm font-semibold'>Quantity in stock</label>
                <input type="text" id='productQuantityInStock' name='quantityInStock' value={productData.quantityInStock} onChange={handleChange} placeholder='Enter product quantity in stock' />
                {validationErrors.productQuantityInStockError && (
                        <p className="text-red-500 text-xs">{validationErrors.productQuantityInStockError}</p>
                    )}
            </div>
            
            <div className='flex flex-col gap-4 justify-center'>
                <button type='submit' className='main-button'>Edit Product</button>
                <button type='button' className='main-button' onClick={handleCancel}>Cancel</button>
                <button onClick={handleReturnToMainPage} type='button' className='main-button'>Return to Main Page</button>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}

export default EditProductPage