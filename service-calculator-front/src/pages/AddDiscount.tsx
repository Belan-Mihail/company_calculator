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

  return (
    <div>AddDiscount</div>
  )
}

export default AddDiscount