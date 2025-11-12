// apiClient.ts
import { authService } from './auth'

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const accessToken = localStorage.getItem('accessToken')
    const headers = new Headers(init?.headers || {})

    // Automatically inject bearer token if available
    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
    }

    const requestConfig: RequestInit = {
        ...init,
        headers,
    }

    let response = await fetch(input, requestConfig)

    // If access token is expired or invalid
    if (response.status === 401) {
        const refreshed = await authService.refreshToken()

        // Retry the original request with new token if refresh was successful
        if (refreshed) {
            const newAccess = localStorage.getItem('accessToken')
            if (newAccess) {
                headers.set('Authorization', `Bearer ${newAccess}`)
                response = await fetch(input, { ...init, headers })
            }
        }

        // Still unauthorized after refresh
        if (response.status === 401) {
            authService.logout()
            throw new Error('Unauthorized — please log in again')
            // TODO: I might want to redirect to login page here, not sure which part of the app should handle this
        }
    }

    return response
}
