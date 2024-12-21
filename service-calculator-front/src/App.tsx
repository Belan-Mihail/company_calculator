import { useState } from 'react'
import './index.css'
import Calculator from './components/Calculator'

function App() {
  

  return (
    <div className='flex flex-col items-center justify-center border-red-400 border-solid border-2'>
      <Calculator />
    </div>
  )
}

export default App
