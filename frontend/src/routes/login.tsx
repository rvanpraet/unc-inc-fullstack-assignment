import { redirect, createFileRoute } from '@tanstack/react-router'
// import { Route as rootRoute } from './__root'
// import { authService } from '../lib/auth'
import z from 'zod'

const fallback = '/articles' as const

export const Route = createFileRoute('/login')({
    validateSearch: z.object({
        redirect: z.string().optional().catch(''),
    }),
    beforeLoad: ({ context, search }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: search.redirect || fallback })
        }
    },
    component: LoginComponent,
})

function LoginComponent() {
    return (
        <div>
            <h1>Login Route</h1>
            <p>This is the login page. Form will be added later.</p>
        </div>
    )
}
