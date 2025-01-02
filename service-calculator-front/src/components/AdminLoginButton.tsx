import React from 'react'
import { useHistory } from 'react-router-dom'

const AdminLoginButton:React.FC = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push('/login')
    }

  return (
    <div>AdminLoginButton</div>
  )
}

export default AdminLoginButton