import React, {useEffect, useState} from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Discount } from '../types/Discount'
import {toast, toastContainer } from 'react-toastify'


const EditDiscountPage = () => {
  const {token} = useAuth()
  const navigate = useNavigate()
  const DiscountId = useParams<{discountId: string}>()

  return (
    <div>EditDiscountPage</div>
  )
}

export default EditDiscountPage