import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()

        // Validate form fields 
        if (!formData.discount_size || !formData.discount_available_from) {
            toast.error('All fields are required!')
            return
        }
    }

  return (
    <div>AddDiscount</div>
  )
}

export default AddDiscount