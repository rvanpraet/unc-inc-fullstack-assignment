import { useState, useEffect, type ReactNode, useCallback } from 'react'
import { type LoginCredentials, type RegisterCredentials, type User, authService } from '../lib/auth'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const getToken = () => {
        return localStorage.getItem('accessToken')
    }

    const login = async (data: LoginCredentials) => {
        const user = await authService.login(data)
        console.log('Login successful ::: ', user)
        setUser(user)
        setIsAuthenticated(true)
    }

    const register = async (data: RegisterCredentials) => {
        return await authService.register(data)
    }

    const logout = useCallback(() => {
        authService.logout()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await authService.getCurrentUser()
            setUser(currentUser)
            setIsAuthenticated(!!currentUser)
            setIsLoading(false)
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    )
}
