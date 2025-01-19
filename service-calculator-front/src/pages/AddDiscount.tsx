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

  return (
    <div>AddDiscount</div>
  )
}

export default AddDiscount