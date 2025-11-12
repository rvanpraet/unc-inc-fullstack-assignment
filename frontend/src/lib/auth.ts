import { handleApiError, prepareRequestBody, transformResponse } from './apiHelpers'

// Authentication service to handle Django backend integration
export interface User {
    id: number
    username: string
    email: string
    firstName: string
    lastName?: string
}

export interface LoginCredentials {
    username: string
    password: string
}

export interface RegisterCredentials {
    username: string
    email: string
    password: string
    firstName: string
    lastName?: string
}

// AuthService class to manage authentication-related operations
class AuthService {
    private apiUrl = `${import.meta.env.VITE_API_BASE_URL}`

    // Login method
    async login(credentials: LoginCredentials): Promise<User> {
        const body = prepareRequestBody(credentials)

        // Fetch tokens from the backend
        const response = await fetch(`${this.apiUrl}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        // Handle API errors
        if (!response.ok) {
            await handleApiError(response)
        }

        // Store tokens in localStorage
        const data = await response.json()
        if (data.access) {
            localStorage.setItem('accessToken', data.access)
        }
        if (data.refresh) {
            localStorage.setItem('refreshToken', data.refresh)
        }

        // Fetch and return current user data
        const user = await this.getCurrentUser()

        if (!user) {
            throw new Error('Failed to fetch user data after login')
        }

        return user
    }

    // New register method
    async register(credentials: RegisterCredentials): Promise<User> {
        const body = prepareRequestBody(credentials)

        const response = await fetch(`${this.apiUrl}/users/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        // Handle API errors
        // No return value because handleApiError throws and register page catches
        if (!response.ok) {
            await handleApiError(response)
        }

        // TODO: Ensure data structure matches your backend response
        const data = await response.json()
        return data.user
    }

    async getCurrentUser(): Promise<User | null> {
        const token = localStorage.getItem('accessToken')

        // No token means no authenticated user
        if (!token) {
            return null
        }

        // Fetch user data from the backend
        const response = await fetch(`${this.apiUrl}/users/me/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        // If token expired, try refresh once
        if (response.status === 401) {
            const refreshed = await this.refreshToken()

            if (!refreshed) {
                this.logout()
                return null
            }

            // Retry with new access token
            const newToken = localStorage.getItem('accessToken')
            const retryResponse = await fetch(`${this.apiUrl}/users/me/`, {
                headers: { Authorization: `Bearer ${newToken}` },
            })

            if (!retryResponse.ok) return null
            return await retryResponse.json()
        }

        // Other errors results in no authenticated user
        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return transformResponse(data) as User
    }

    async refreshToken(): Promise<boolean> {
        const refreshToken = localStorage.getItem('refreshToken')

        // No refresh token means the user should not be logged in
        if (!refreshToken) {
            this.logout()
            return false
        }

        // Attempt to refresh the token
        const response = await fetch(`${this.apiUrl}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        })

        // Refresh attempt failed
        if (!response.ok) {
            return false
        }

        // Refresh successful, store new access token and return boolean response
        const data = await response.json()
        localStorage.setItem('accessToken', data.access)
        return !!data.access
    }

    logout(): void {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    async isAuthenticated(): Promise<boolean> {
        if (!localStorage.getItem('accessToken')) {
            return false
        }

        await this.getCurrentUser()

        return !!localStorage.getItem('accessToken')
    }
}

// Singleton AuthService class
export const authService = new AuthService()
