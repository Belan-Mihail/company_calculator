import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

interface ProductFormData {
    productName: string,
    productPrice: number,
    productQuantityInStock: number,
    errorMessage: string
}

const AddProduct: React.FC = () => {
    const navigate = useNavigate()

    // State to hold form values with proper types
    const [formData, setFormData] = useState<ProductFormData>({
        productName: '',
        productPrice: 0,
        productQuantityInStock: 0,
        errorMessage: '',
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
            setFormData((prevData) => ({
                ...prevData, errorMessage: 'All fields are required!',
            }))
            return
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
                    product_price: formData.productPrice,
                    product_quantity: 0,
                    product_quantityInStock: formData.productQuantityInStock,
                }),
            })

            if (response.ok) {
                navigate('/dashboard')
            } else {
                const data = await response.json()
                setFormData((prevData) => ({
                    ...prevData,
                    errorMessage: data.message || 'Failed add product',
                }))
            }
        } catch (error) {
            console.log("Error:", error)
            setFormData((prevData) => ({
                ...prevData, errorMessage: 'Something went wrong'
            }))
        }
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
                <input type="number" id='productPrice' name='productPrice' value={formData.productPrice} onChange={handleChange} placeholder='Enter product price' />
            </div>
        </form>
    </div>
  )
}

export default AddProduct