import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext';

const LogoutButton:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth(); 

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleLogout = async () => {
        try {
            // Make a request to the backend to log the user out
            const response = await fetch('http://localhost:3000/api/admin/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.ok) {
                 // If logout is successful, clear the local token and redirect to login page
                 logout()
                 navigate('/')
            } else {
                const data = await response.json()
                console.log('Logout failed: ', data.message)
            }
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false)
    }


  return (
    <button className='main-button' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton