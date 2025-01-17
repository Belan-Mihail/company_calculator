
import React, { useEffect, useState } from 'react'
import LogoutButton from './components/LogoutButton'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

  // Check for the token on initial mount and whenever the localStorage changes
  useEffect(() => {
    
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'))
    }

    window.addEventListener('storage', handleStorageChange)

    // clean Listener
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }

  }, [])

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
