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

            
        } catch (error) {
            console.log("Error:", error)
            setFormData((prevData) => ({
                ...prevData, errorMessage: 'Something went wrong'
            }))
        }
    }
    

  return (
    <div>AddProduct</div>
  )
}

export default AddProduct