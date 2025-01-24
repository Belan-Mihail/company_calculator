import React from 'react'
import { useNavigate } from 'react-router-dom'


const ReturnToMainButton = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

  return (
    <button onClick={handleClick} className='main-button' type='button'>Return to Main Page</button>
  )
}

export default ReturnToMainButton