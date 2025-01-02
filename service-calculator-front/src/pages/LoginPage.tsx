import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setErorr] = useState<string>('')
    const navigate = useNavigate()


  return (
    <div>LoginPage</div>
  )
}

export default LoginPage