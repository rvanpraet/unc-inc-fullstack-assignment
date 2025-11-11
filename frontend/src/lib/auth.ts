// Authentication service to handle Django backend integration
export interface User {
    id: number
    username: string
    email: string
}

export interface LoginCredentials {
    username: string
    password: string
}

export interface RegisterCredentials {
    username: string
    email: string
    password: string
}

class AuthService {
    private apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/` // Update with your Django backend URL

    // Login method
    async login(credentials: LoginCredentials): Promise<User> {
        const response = await fetch(`${this.apiUrl}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        // TODO: Handle errors more gracefully at login screen
        if (!response.ok) {
            throw new Error('Login failed')
        }

        // TODO: Ensure data structure matches your backend response
        const data = await response.json()
        // Store token in localStorage (adjust based on your Django auth setup)

        if (data.access) {
            localStorage.setItem('accessToken', data.access)
        }

        if (data.refresh) {
            localStorage.setItem('refreshToken', data.refresh)
        }

        // Check the data structure
        console.log('Login response data:', data) // Debugging line

        return data.user
    }

    // New register method
    async register(credentials: RegisterCredentials): Promise<User> {
        const response = await fetch(`${this.apiUrl}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        // TODO: Handle errors more gracefully at registration screen
        if (!response.ok) {
            throw new Error('Registration failed')
        }

        // TODO: Ensure data structure matches your backend response
        const data = await response.json()

        console.log('Registration response data:', data) // Debugging line

        // Store token in localStorage (adjust based on Django auth setup)
        // if (data.token) {
        //     localStorage.setItem('authToken', data.token)
        // }

        return data.user
    }

    async refreshToken(): Promise<void> {
        const refreshToken = localStorage.getItem('refreshToken')

        // No refresh token means the user should not be logged in
        if (!refreshToken) {
            this.logout()
            return
        }

        // Attempt to refresh the token
        try {
            const response = await fetch(`${this.apiUrl}/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            })

            if (!response.ok) {
                this.logout()
                return
            }

            const data = await response.json()
            if (data.access) {
                localStorage.setItem('accessToken', data.access)
            }
        } catch (error) {
            console.error('Error refreshing token:', error)
            this.logout()
        }
    }

    async getCurrentUser(): Promise<User | null> {
        const token = localStorage.getItem('accessToken')

        if (!token) {
            return null
        }

        try {
            const response = await fetch(`${this.apiUrl}/auth/user/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                this.logout()
                return null
            }

            return await response.json()
        } catch (error) {
            // Debugging line
            console.error('Error fetching current user:', error)

            this.logout()
            return null
        }
    }

    logout(): void {
        localStorage.removeItem('accessToken')
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken')
    }
}

// Singleton AuthService class
export const authService = new AuthService()
