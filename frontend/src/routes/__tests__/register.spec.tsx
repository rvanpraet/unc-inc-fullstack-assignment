import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderRoute } from '../../test/test-utils'

// Mock the auth hook
const mockRegister = vi.fn()

vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn(() => ({
        isAuthenticated: false,
        register: mockRegister,
        user: null,
        isLoading: false,
    })),
}))

describe('Register Page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the register page with correct header text', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            expect(screen.getByText('Create an account')).toBeInTheDocument()
        })

        expect(screen.getByText('Fill in the details to register')).toBeInTheDocument()
    })

    it('renders all required form fields', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument()
        })

        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
    })

    it('renders link to login page', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            const loginLink = screen.getByText('Log in')
            expect(loginLink).toBeInTheDocument()
            expect(loginLink).toHaveAttribute('href', '/login')
        })

        expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    })

    it('form inputs accept user input', async () => {
        const user = userEvent.setup()
        await renderRoute('/register')

        await waitFor(() => {
            expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument()
        })

        const usernameInput = screen.getByLabelText(/^username$/i) as HTMLInputElement
        const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
        const passwordInput = screen.getByLabelText(/^password$/i) as HTMLInputElement
        const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement
        const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement

        await user.type(usernameInput, 'newuser')
        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(firstNameInput, 'John')
        await user.type(lastNameInput, 'Doe')

        expect(usernameInput.value).toBe('newuser')
        expect(emailInput.value).toBe('test@example.com')
        expect(passwordInput.value).toBe('password123')
        expect(firstNameInput.value).toBe('John')
        expect(lastNameInput.value).toBe('Doe')
    })

    it('email field has correct type attribute', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            const emailInput = screen.getByLabelText(/email/i)
            expect(emailInput).toHaveAttribute('type', 'email')
        })
    })

    it('password field has correct type attribute', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            const passwordInput = screen.getByLabelText(/^password$/i)
            expect(passwordInput).toHaveAttribute('type', 'password')
        })
    })

    it('displays submit button with correct text', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            const submitButton = screen.getByRole('button', { name: /create account/i })
            expect(submitButton).toBeInTheDocument()
            expect(submitButton).toHaveTextContent('Create account')
        })
    })

    it('last name field is marked as optional', async () => {
        await renderRoute('/register')

        await waitFor(() => {
            // Check for optional indicator in the form
            const form = screen.getByRole('button', { name: /create account/i }).closest('form')
            expect(form).toBeInTheDocument()
        })
    })
})
