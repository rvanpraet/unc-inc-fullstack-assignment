import { createContext } from 'react'
import type { RegisterCredentials, User } from '../lib/auth'

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<void>
    register: (data: RegisterCredentials) => Promise<User>
    logout: () => void
    getToken: () => string | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
