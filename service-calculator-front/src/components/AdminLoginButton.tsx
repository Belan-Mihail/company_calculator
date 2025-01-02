import React from 'react'
import { useHistory } from 'react-router-dom'

const AdminLoginButton:React.FC = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push('/login')
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