import { useState } from 'react'
import './index.css'
import './App.css'
import Calculator from './components/Calculator'
import AdminLoginButton from './components/AdminLoginButton'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center m-8 rounded main mx-auto mt-10 w-max'>
        <Calculator />
        
      </div>
      <AdminLoginButton />
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={true} 
        newestOnTop={true} 
        closeOnClick={true} 
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    
  )
}

export default App
