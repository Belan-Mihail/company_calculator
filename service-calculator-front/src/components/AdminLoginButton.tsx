import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLoginButton:React.FC = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

  return (
    <>
        <button className='main-button' onClick={handleClick}>
        Log as Admin
    </button>
    </>
    
  )
}

export default AdminLoginButton