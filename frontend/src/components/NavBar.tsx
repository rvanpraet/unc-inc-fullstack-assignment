import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { Button } from './Button'
// import { ButtonNavLink } from './ButtonNavLink'

export default function NavBar() {
    const { isAuthenticated } = useAuth()

    return (
        <nav className="absolute top-0 z-40 w-full px-4">
            <div className="w-full px-4">
                <div className="flex w-full items-center justify-between h-16">
                    {/* Auth Actions */}
                    <div className="w-full flex items-center justify-between">
                        {isAuthenticated ? <AuthenticatedNavBar /> : null}
                    </div>
                </div>
            </div>
        </nav>
    )
}

function AuthenticatedNavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const onLogoutClick = () => {
        logout()

        // Redirect to home page after logout
        navigate({ to: '/' })
    }

    return (
        <>
            <span className="text-sm text-neutral-600">
                Welcome, <span className="font-medium text-neutral-900">{user?.firstName}</span>
            </span>

            <Button className="w-fit" onClick={onLogoutClick}>
                Logout
            </Button>
        </>
    )
}

// function UnauthenticatedNavBar() {
//     return (
//         <>
//             <ButtonNavLink to="/login" variant="secondary">
//                 Login
//             </ButtonNavLink>
//             <ButtonNavLink to="/register" variant="primary">
//                 Register
//             </ButtonNavLink>
//         </>
//     )
// }
