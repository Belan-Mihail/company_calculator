import React, {createContext, useContext, useState, useEffect} from 'react'

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
        setToken(storedToken)
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem('token')
    }
}