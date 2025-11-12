import { useAuth } from '../hooks/useAuth'
import { ButtonNavLink } from './ButtonNavLink'

export default function NavBar() {
    const { isAuthenticated } = useAuth()

    return (
        <nav className="absolute top-0 z-40 w-full bg-white">
            <div className="w-full px-4">
                <div className="flex w-full h-16 items-center justify-end">
                    {/* Auth Actions */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
                    </div>
                </div>
            </div>
        </nav>
    )
}

function AuthenticatedNavBar() {
    const { user, logout } = useAuth()

    return (
        <>
            <span className="text-sm text-neutral-600">
                Welcome, <span className="font-medium text-neutral-900">{user?.firstName}</span>
            </span>
            <button
                onClick={logout}
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            >
                Logout
            </button>
        </>
    )
}

function UnauthenticatedNavBar() {
    return (
        <>
            <ButtonNavLink to="/login" variant="secondary">
                Login
            </ButtonNavLink>
            <ButtonNavLink to="/register" variant="primary">
                Register
            </ButtonNavLink>
        </>
    )
}
