import { Link, type LinkProps } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'

type ButtonNavLinkProps = Omit<LinkProps, 'className'> & {
    variant?: 'primary' | 'secondary'
}

export function ButtonNavLink({ variant = 'primary', children, ...props }: ButtonNavLinkProps) {
    const baseClasses =
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2'

    const variantClasses = {
        primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
        secondary: 'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50',
    }

    const classes = twMerge(baseClasses, variantClasses[variant])

    return (
        <Link {...props} className={classes}>
            {children}
        </Link>
    )
}
