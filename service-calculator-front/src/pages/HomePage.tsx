import React from 'react'
import Calculator from '../components/Calculator'
import AdminLoginButton from '../components/AdminLoginButton'
import '../index.css'
import '../App.css'
import DashboardButton from '../components/DashboardButton'
import { useAuth } from '../hooks/AuthContext'

const HomePage:React.FC = () => {
    const { token } = useAuth();

   

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center m-8 rounded main mx-auto mt-10 w-max'>
        <Calculator />
        
      </div>
      {!token ? (
        <AdminLoginButton />
      ) : (
        <DashboardButton />
      )}
      
    </div>
  )
}

export default HomePage