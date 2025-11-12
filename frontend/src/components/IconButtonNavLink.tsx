import type React from 'react'
import { Link, type LinkProps } from '@tanstack/react-router'

type IconButtonNavLinkProps = Omit<LinkProps, 'className'> & {
    icon: React.ReactNode
    label: string
    variant?: 'view' | 'edit' | 'delete'
}

export function IconButtonNavLink({ icon, label, variant = 'view', ...props }: IconButtonNavLinkProps) {
    const baseClasses =
        'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1'

    const variantClasses = {
        view: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
        edit: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
        delete: 'text-red-600 hover:bg-red-50 hover:text-red-700',
    }

    return (
        <Link {...props} className={`${baseClasses} ${variantClasses[variant]}`} title={label} aria-label={label}>
            {icon}
        </Link>
    )
}
