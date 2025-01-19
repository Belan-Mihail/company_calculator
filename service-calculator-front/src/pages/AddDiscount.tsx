import React from 'react'

interface DiscountFormData {
    discount_size: string
    discount_available_from: string
}

interface ValidationErrors {
    discountSizeError: string | null
    discountAvailableFromError: string | null
}

const AddDiscount = () => {
  return (
    <div>AddDiscount</div>
  )
}

export default AddDiscount