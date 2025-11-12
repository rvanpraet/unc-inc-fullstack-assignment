import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { Route } from './index' // Assuming Route.component should be Home

describe('Home Page', () => {
    it('shows "Home Page" title', () => {
        const Component = Route.options.component!
        render(<Component />)

        const heading = screen.getByRole('heading', { name: /home page/i })
        expect(heading).toBeInTheDocument()
    })

    it('shows a link with "Login"', () => {
        const Component = Route.options.component!
        render(<Component />)

        // The Login link is in the MainLayout navigation
        const loginLink = screen.getByRole('link', { name: /login/i })
        expect(loginLink).toBeInTheDocument()
    })

    it('shows a link with "Register"', () => {
        const Component = Route.options.component!
        render(<Component />)

        // The Register link is in the MainLayout navigation
        const registerLink = screen.getByRole('link', { name: /register/i })
        expect(registerLink).toBeInTheDocument()
    })
})
