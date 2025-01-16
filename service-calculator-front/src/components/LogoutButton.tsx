import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutButton:React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>LogoutButton</div>
  )
}

export default LogoutButton