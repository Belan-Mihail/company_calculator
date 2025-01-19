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

  return (
    <div>AddDiscount</div>
  )
}

export default AddDiscount