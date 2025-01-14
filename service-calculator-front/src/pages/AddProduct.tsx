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