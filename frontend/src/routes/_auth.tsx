// import * as React from 'react'
// import { useAuth } from '../hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: ({ context, location }) => {
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
    // const router = useRouter()
    // const navigate = Route.useNavigate()
    // const auth = useAuth()

    // const handleLogout = () => {
    //     if (window.confirm('Are you sure you want to logout?')) {
    //         auth.logout().then(() => {
    //             router.invalidate().finally(() => {
    //                 navigate({ to: '/' })
    //             })
    //         })
    //     }
    // }

    return (
        <div className="p-2 h-full">
            <h1>My small articles app</h1>

            <Outlet />
        </div>
    )
}
