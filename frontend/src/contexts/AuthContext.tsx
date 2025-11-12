import { createContext } from 'react'
import type { LoginCredentials, RegisterCredentials, User } from '../lib/auth'

export interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (data: LoginCredentials) => Promise<void>
    register: (data: RegisterCredentials) => Promise<User | void>
    logout: () => void
    getToken: () => string | null
    getCurrentUser: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
