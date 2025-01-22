
import React from 'react'
import LogoutButton from './components/LogoutButton'
import { Outlet } from 'react-router-dom'
import { useAuth } from './hooks/AuthContext';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const App: React.FC = () => {
  
  const { token } = useAuth();

 

  return (
    <div>
      {token && (
        <div className='fixed top-2.5 right-2.5'>
          <LogoutButton />
        </div>
        
      )}
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default App
