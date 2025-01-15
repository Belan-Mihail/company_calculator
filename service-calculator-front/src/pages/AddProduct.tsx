import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

interface ProductFormData {
    productName: string,
    productPrice: string,
    productQuantityInStock: string,
    
}

const AddProduct: React.FC = () => {
    const navigate = useNavigate()

    // State to hold form values with proper types
    const [formData, setFormData] = useState<ProductFormData>({
        productName: '',
        productPrice: '',
        productQuantityInStock: '',
        
    })

    // handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form fields 
        if (!formData.productName || !formData.productPrice || !formData.productQuantityInStock) {
            toast.error('All fields are required!')
            return
        }



        // Convert product price and quantity in stock to numbers
        const price = parseFloat(formData.productPrice)
        const quantityInStock = parseInt(formData.productQuantityInStock, 10)

        if (isNaN(price) || isNaN(quantityInStock)) {
            toast.error('Price and quantity in stock must be valid numbers.')
        }

        try {
            // Make Api request to add the product 
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_name: formData.productName,
                    product_price: price,
                    product_quantity: 0,
                    product_quantityInStock: quantityInStock,
                }),
            })

            if (response.ok) {
                toast.success('Product added successfully!')
                navigate('/dashboard')
            } else {
                const data = await response.json()
                toast.error(data.message || 'Failed add product')
            }
        } catch (error) {
            console.log("Error:", error)
            toast.error('Something went wrong')
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
            </div>
            <div className='mb-4'>
                <label htmlFor="productQuantityInStock" className='block text-sm font-semibold'>Quantity in stock</label>
                <input type="text" id='productQuantityInStock' name='productQuantityInStock' value={formData.productQuantityInStock} onChange={handleChange} placeholder='Enter product quantity in stock' />
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

export default AddProduct