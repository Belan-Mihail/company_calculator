import React from 'react'
import { useNavigate } from 'react-router-dom'


const ReturnToMainButton = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

  return (
    <div>ReturnToMainButton</div>
  )
}

export default ReturnToMainButton