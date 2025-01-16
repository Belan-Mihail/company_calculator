import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardButton: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/dashboard')
    }

  return (
    <>
        <button className='main-button' onClick={handleClick}>Go to Dashboard</button>
    </>
  )
}

export default DashboardButton