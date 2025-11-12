// import * as React from 'react'
// import { useAuth } from '../hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: ({ context, location }) => {
        console.log('Auth route beforeLoad check ::: ', context.auth)
        if (!context.auth.isAuthenticated) {
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
