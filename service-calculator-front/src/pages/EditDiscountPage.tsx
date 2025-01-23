import React, {useEffect, useState} from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Discount } from '../types/Discount'
import {toast, toastContainer } from 'react-toastify'

interface ValidationErrors {
  discountSizeError: string | null
  discountAvailableFromError: string | null
}


const EditDiscountPage = () => {
  const {token} = useAuth()
  const navigate = useNavigate()
  const DiscountId = useParams<{discountId: string}>()

  // state to manage Discount from data
  const [discountData, setDiscountData] = useState<Discount>({
    discount_size: 0,
    available_from: 0
  })

  // state to manage validation error messages
  const [validationError, setValidationErrors] = useState<ValidationErrors>({
    discountSizeError: null,
    discountAvailableFromError: null
  })

  // Fetch discount details on component mount
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchDiscount = async () => {
      try {
        
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong!')
      }
    }
  })

  return (
    <div>EditDiscountPage</div>
  )
}

export default EditDiscountPage