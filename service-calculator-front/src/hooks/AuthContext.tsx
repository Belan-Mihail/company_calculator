import React, {createContext, useContext, useState, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode';

// type for context
interface AuthContextType {
    token: string | null
    login: (token: string) => void
    logout: () => void
}

// create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// context provider
export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedExpirationTime = localStorage.getItem('tokenExpirationTime')

        if (storedToken && storedExpirationTime) {
            const expirationTime = parseInt(storedExpirationTime, 10)
            if (expirationTime > Date.now()) {
               setToken(storedToken) 
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('tokenExpirationTime')
            }
        }
        
    }, [])

    const login = (token: string) => {
        // decod token
        const decodedToken = jwtDecode(token) 

        // catch expiration time from token
        const expirationTime = decodedToken.exp * 1000

        localStorage.setItem('token', token)
        localStorage.setItem('tokenExpirationTime', expirationTime.toString())
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpirationTime')
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook for using context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used withing AuthProvider')
    }
    return context
}