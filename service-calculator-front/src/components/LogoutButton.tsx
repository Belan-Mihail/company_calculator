import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton:React.FC = () => {
    const navigate = useNavigate()

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
                 localStorage.removeItem('token')
                 navigate('/')
            } else {
                const data = await response.json()
                console.log('Logout failed: ', data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>LogoutButton</div>
  )
}

export default LogoutButton