
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
      <ToastContainer 
              position="top-left" 
              autoClose={2000} 
              hideProgressBar={true} 
              newestOnTop={true} 
              closeOnClick={true} 
              rtl={false} 
              pauseOnFocusLoss
              draggable
              pauseOnHover
             />
    </div>
  )
}

export default App
