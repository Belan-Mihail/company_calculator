import React from 'react'import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Dashboard = () => {
  const navigate = useNavigate()

  const handleReturnToMainPage = () => {
    navigate('/')
  }
  
  return (
    <div>
      <h2 className='my-4'>Dashboard Page</h2>
      <div>
        <button className='main' type='button' onClick={handleReturnToMainPage}>Back to Main Page</button>
      </div>
    </div>
  )
}

export default Dashboard