// import * as React from 'react'
// import { useAuth } from '../hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ context, location }) => {
        const authenticated = await context.auth.getCurrentUser()

        if (!authenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    return <Outlet />
}
