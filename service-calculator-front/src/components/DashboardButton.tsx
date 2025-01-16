import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardButton: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/dashboard')
    }

  return (
    <div>DashboardButton</div>
  )
}

export default DashboardButton