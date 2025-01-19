import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    }

  return (
    <div>AddDiscount</div>
  )
}

export default AddDiscount