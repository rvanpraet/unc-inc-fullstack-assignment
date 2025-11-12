import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderRoute } from '../../test/test-utils'

// Mock the auth hook
vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        isAuthenticated: false,
        user: null,
        isLoading: false,
    })),
}))

describe('Index Page (Home)', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the home page with correct header text', async () => {
        await renderRoute('/')

        await waitFor(() => {
            expect(screen.getByText('Home Page')).toBeInTheDocument()
        })

        expect(
            screen.getByText('Welcome to the Unc Inc Fullstack Assignment. Where would you like to go next?')
        ).toBeInTheDocument()
    })

    it('shows login and register links for unauthenticated users', async () => {
        await renderRoute('/')

        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument()
        })

        expect(screen.getByText('Register')).toBeInTheDocument()

        // Check that the links have correct href attributes
        const loginLink = screen.getByText('Login')
        expect(loginLink).toHaveAttribute('href', '/login')

        const registerLink = screen.getByText('Register')
        expect(registerLink).toHaveAttribute('href', '/register')
    })

    it('has proper navigation structure', async () => {
        await renderRoute('/')

        await waitFor(() => {
            const links = screen.getAllByRole('link')
            expect(links.length).toBeGreaterThan(0)
        })
    })
})
