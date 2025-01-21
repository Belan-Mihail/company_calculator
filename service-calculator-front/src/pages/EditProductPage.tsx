import React from 'react'
import { useAuth } from '../hooks/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const EditProductPage:React.FC = () => {
    const {token} = useAuth()
    const {productId} = useParams()
    const navigate = useNavigate()

    
  return (
    <div>EditProductPage</div>
  )
}

export default EditProductPage