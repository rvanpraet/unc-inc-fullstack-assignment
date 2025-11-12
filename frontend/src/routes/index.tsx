// import * as React from 'react'
// import { Link } from '@tanstack/react-router'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { MainLayout } from '../layouts/MainLayout'
import { ButtonNavLink } from '../components/ButtonNavLink'
import { useAuth } from '../hooks/useAuth'

export const Route = createFileRoute('/')({
    component: HomeComponent,
    beforeLoad: async ({ context, location }) => {
        await context.auth.getCurrentUser()

        console.log('Root route beforeLoad check ::: ', context.auth)
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: '/articles',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
})

function HomeComponent() {
    const { isAuthenticated } = useAuth()
    return (
        <MainLayout
            title="Home Page"
            subTitle="Welcome to the Unc Inc Fullstack Assignment. Where would you like to go next?"
        >
            {isAuthenticated ? <AuthenticatedHomeSection /> : <UnauthenticatedHomeSection />}
        </MainLayout>
    )
}

function AuthenticatedHomeSection() {
    return (
        <div className="flex flex-row justify-center gap-4">
            <ButtonNavLink variant="secondary" to="/articles">
                Go to Articles
            </ButtonNavLink>
        </div>
    )
}
function UnauthenticatedHomeSection() {
    return (
        <div className="flex flex-row justify-center gap-4">
            <Link to="/login" className="text-blue-500 hover:underline">
                Login
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
                Register
            </Link>
        </div>
    )
}
