
import React, { useState } from 'react'
import LogoutButton from './components/LogoutButton'
import { Outlet } from 'react-router-dom'

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)

  

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
