import { useState } from 'react'
import './index.css'
import './App.css'
import Calculator from './components/Calculator'
import AdminLoginButton from './components/AdminLoginButton'

function App() {
  

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center m-8 rounded main mx-auto mt-10 w-max'>
        <Calculator />
        
      </div>
      <AdminLoginButton />
    </div>
    
  )
}

export default App
