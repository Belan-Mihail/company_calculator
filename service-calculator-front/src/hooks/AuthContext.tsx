import React, {createContext, useContext, useState, useEffect} from 'react'

// type for context
interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
}

const AuthContext = () => {
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext