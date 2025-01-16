
import React from 'react'
import LogoutButton from './components/LogoutButton'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
  const token = localStorage.getItem('token')

  return (
    <div>
      {token && (
        <div className=' fixed top-2.5 right-2.5'>
          <LogoutButton />
        </div>
        
      )}
      <Outlet />
    </div>
  )
}

export default App
