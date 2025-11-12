import { createContext } from 'react'
import type { LoginCredentials, RegisterCredentials, User } from '../lib/auth'

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (data: LoginCredentials) => Promise<void>
    register: (data: RegisterCredentials) => Promise<User>
    logout: () => void
    getToken: () => string | null
    getCurrentUser: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
