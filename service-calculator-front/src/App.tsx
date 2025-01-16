
import React from 'react'
import LogoutButton from './components/LogoutButton'

const App: React.FC = () => {
  const token = localStorage.getItem('token')

  return (
    <div>
      {token && (
        <div className=' fixed top-2.5 right-2.5'>
          <LogoutButton />
        </div>
        
      )}
    </div>
  )
}

export default App
