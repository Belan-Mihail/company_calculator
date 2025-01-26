import React, {ChangeEvent, useEffect, useState} from 'react'
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
  const discountId = useParams<{discountId: string}>()

  // state to manage Discount from data
  const [discountData, setDiscountData] = useState<Discount>({
    discount_size: 0,
    available_from: 0
  })

  // state to manage initial discount data
  const [initialDiscount, setInitialDiscount] = useState<Discount>({
    discount_size: 0,
    available_from: 0
  })

  // state to manage validation error messages
  const [validationError, setValidationErrors] = useState<ValidationErrors>({
    discountSizeError: null,
    discountAvailableFromError: null
  })

  // state to track if any field is changed
  const [isFieldsChanged, setIsFieldsChanged] = useState(false)

  // Fetch discount details on component mount
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchDiscount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/discounts/${discountId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (response.ok) {
          setDiscountData({
            discount_size: data.discount_size,
            available_from: data.available_from
          })
        } else {
          toast.error( data.message || 'Error fetching discount')
        }

      } catch (error) {
        console.log(error)
        toast.error('Something went wrong!')
      }
    }

    if (discountId) {
      fetchDiscount()
    }
  }, [token, discountId, navigate])

  // function to validate form fields
  const validateFields = () => {
    let isValid = true
    const NewValidationError: any = {
      discountSizeError: null,
    discountAvailableFromError: null
    }

    if (isNaN(discountData.discount_size) || discountData.discount_size < 0) {
      NewValidationError.discountSizeError = 'Discount size must be a valid number greater than 0.'
      isValid = false
    }

    if (isNaN(discountData.available_from) || discountData.available_from < 0) {
      NewValidationError.discountAvailableFromError = 'Discount available from amoung must be a valid number greater than 0.'
      isValid = false
    }

    setValidationErrors(NewValidationError)
    return isValid
  }

  // submit form function
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()

    // viladate form fields
    if (!validateFields()) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/api/discounts/${discountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          discount_size: discountData.discount_size,
          available_from: discountData.available_from
        })
      })

      
      if (response.ok) {
          toast.success('Discount updated successfully!')
          navigate('/dashboard')
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to update discount')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  // Handler for changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setDiscountData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handler for Cancel button Click
  const handleCancel = () => {
    setDiscountData({
      discount_size: 0,
      available_from: 0
    })
  }

  return (
    <div>EditDiscountPage</div>
  )
}

export default EditDiscountPage