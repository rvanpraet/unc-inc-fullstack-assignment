import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '../../test/test-utils'

// Mock the auth hook
const mockLogin = vi.fn()

vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        isAuthenticated: false,
        login: mockLogin,
        user: null,
        isLoading: false,
    })),
}))

describe('Login Page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the login page with correct header text', async () => {
        await renderRoute('/login')

        await waitFor(() => {
            expect(screen.getByText('Welcome back')).toBeInTheDocument()
        })

        expect(screen.getByText('Enter your credentials to sign in')).toBeInTheDocument()
    })

    it('renders all required form fields', async () => {
        await renderRoute('/login')

        await waitFor(() => {
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
        })

        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('renders link to register page', async () => {
        await renderRoute('/login')

        await waitFor(() => {
            const registerLink = screen.getByText('Register')
            expect(registerLink).toBeInTheDocument()
            expect(registerLink).toHaveAttribute('href', '/register')
        })

        expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    })

    it('form inputs accept user input', async () => {
        const user = userEvent.setup()
        await renderRoute('/login')

        await waitFor(() => {
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
        })

        const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
        const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

        await user.type(usernameInput, 'testuser')
        await user.type(passwordInput, 'password123')

        expect(usernameInput.value).not('testuser')
        expect(passwordInput.value).toBe('password123')
    })

    it('password field has correct type attribute', async () => {
        await renderRoute('/login')

        await waitFor(() => {
            const passwordInput = screen.getByLabelText(/password/i)
            expect(passwordInput).toHaveAttribute('type', 'password')
        })
    })

    it('displays button text correctly', async () => {
        await renderRoute('/login')

        await waitFor(() => {
            const submitButton = screen.getByRole('button', { name: /sign in/i })
            expect(submitButton).toBeInTheDocument()
            expect(submitButton).toHaveTextContent('Sign in')
        })
    })
})
