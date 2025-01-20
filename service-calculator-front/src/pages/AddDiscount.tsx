import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

interface DiscountFormData {
    discount_size: string
    discount_available_from: string
}

interface ValidationErrors {
    discountSizeError: string | null
    discountAvailableFromError: string | null
}

const AddDiscount:React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<DiscountFormData>({
        discount_size: '',
        discount_available_from: '',
    })

    
    // State to manage validation error messages
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        discountSizeError: null,
        discountAvailableFromError: null,
    })

    // handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    // validate form fields
    const validateFields = () => {
        let isValid = true
        const newValidationErrors:ValidationErrors = {
            discountSizeError: null,
            discountAvailableFromError: null,
        }

        const discount_size = parseInt(formData.discount_size, 10)
        const discount_available_from = parseInt(formData.discount_available_from, 10)

        if(isNaN(discount_size)) {
            newValidationErrors.discountSizeError = 'Discount size must be a valid number'
            isValid = false
        }

        if(isNaN(discount_available_from)) {
            newValidationErrors.discountAvailableFromError = 'This amount must be a valid number'
            isValid = false
        }

        setValidationErrors(newValidationErrors)
        return isValid
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        // Validate form fields 
        if (!formData.discount_size || !formData.discount_available_from) {
            toast.error('All fields are required!')
            return
        }

        // Validate form fields before submitting
        if(!validateFields()) {
            return
        }

        const token = localStorage.getItem('token') // Retrieve token from localStorage

        try {
            // Convert form data to numbers
            const discount_size = parseInt(formData.discount_size, 10)
            const discount_available_from = parseInt(formData.discount_available_from, 10)

            // Make Api request to add the discount
            const response = await fetch('http://localhost:3000/api/discounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    discount_size, discount_available_from
                })
            }) 

            if (response.ok) {
                toast.success('Discount added successfully')
                setFormData({
                    discount_size: '',
                    discount_available_from: ''
                })
                navigate('/dashboard')
            } else {
                const data = await response.json()
                toast.error(data.message || 'Failed add discount')
                setFormData({
                    discount_size: '',
                    discount_available_from: ''
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }

    const handleReturnToMainPage = () => {
        navigate('/')
    }

  return (
    <div className='flex flex-col items-center  justify-center m-8 p-4 gap-2 rounded-lg main mx-auto mt-10 w-max'>
        <h2 className='text-xl font-bold'>Add New Product</h2>
        <form onSubmit={handleSubmit} className='w-full max-w-lg'>
            <div className='mb-4'>
                <label htmlFor="productName" className='block text-sm font-semibold'>
                    Product Name
                </label>
                <input type="text" id='productName' name='productName' value={formData.productName} onChange={handleChange} placeholder='Enter product name' />
            </div>
            <div className='mb-4'>
                <label htmlFor="productPrice" className='block text-sm font-semibold'>Product Price</label>
                <input type="text" id='productPrice' name='productPrice' value={formData.productPrice} onChange={handleChange} placeholder='Enter product price' />
                {validationErrors.productPriceError && (
                        <p className="text-red-500 text-xs">{validationErrors.productPriceError}</p>
                    )}
            </div>
            <div className='mb-4'>
                <label htmlFor="productQuantityInStock" className='block text-sm font-semibold'>Quantity in stock</label>
                <input type="text" id='productQuantityInStock' name='productQuantityInStock' value={formData.productQuantityInStock} onChange={handleChange} placeholder='Enter product quantity in stock' />
                {validationErrors.productQuantityInStockError && (
                        <p className="text-red-500 text-xs">{validationErrors.productQuantityInStockError}</p>
                    )}
            </div>
            
            <div className='flex flex-col gap-4 justify-center'>
                <button type='submit' className='main-button'>Add Product</button>
                <button onClick={handleReturnToMainPage} type='button' className='main-button'>Return to Main Page</button>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}

export default AddDiscount