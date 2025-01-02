import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setErorr] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        } catch (error: any) {
            setErorr(error.message || 'Something went wrong')
        }
    }

    const handleReturnToMainPage = () => {
        navigate('/')
    }


  return (
    <div>LoginPage</div>
  )
}

export default LoginPage