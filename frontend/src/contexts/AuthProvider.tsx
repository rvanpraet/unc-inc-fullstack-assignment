import { useState, useEffect, type ReactNode } from 'react'
import { type User, authService } from '../lib/auth'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated())

    useEffect(() => {
        // Check if user is already authenticated on mount
        authService.getCurrentUser().then((user) => {
            setUser(user)
            setIsLoading(false)
            setIsAuthenticated(true)
        })
    }, [])

    const login = async (username: string, password: string) => {
        const user = await authService.login({ username, password })
        setUser(user)
        setIsAuthenticated(true)
    }

    const register = async (username: string, email: string, password: string) => {
        return await authService.register({ username, email, password })
        // setUser(user)
    }

    const logout = () => {
        authService.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
