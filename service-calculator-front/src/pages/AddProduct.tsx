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
    </div>
  )
}

export default AddProduct