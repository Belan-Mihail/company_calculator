import React from 'react'import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const Dashboard = () => {
  const navigate = useNavigate()

  const handleReturnToMainPage = () => {
    navigate('/')
  }
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard