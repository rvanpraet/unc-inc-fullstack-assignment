import { createContext } from 'react'
import type { User } from '../lib/auth'

export interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (username: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
