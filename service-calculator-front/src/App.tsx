import { useState } from 'react'
import './index.css'
import './App.css'
import Calculator from './components/Calculator'

function App() {
  

  return (
    <div className='flex flex-col items-center justify-center m-8 rounded main mx-auto mt-10 w-max'>
      <Calculator />
    </div>
  )
}

export default App
