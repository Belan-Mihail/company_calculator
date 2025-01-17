
import React from 'react'
import LogoutButton from './components/LogoutButton'
import { Outlet } from 'react-router-dom'
import { useAuth } from './hooks/AuthContext';

const App: React.FC = () => {
  
  const { token } = useAuth();

 

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
