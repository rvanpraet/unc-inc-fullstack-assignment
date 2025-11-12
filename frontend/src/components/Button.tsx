import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    // children: React.ReactNode
}

export function Button({ className = '', children, ...props }: ButtonProps) {
    // Could add variant-based styles here in the future

    const baseClasses =
        'w-full rounded-md bg-neutral-900 px-4 py-2 text-sm! font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50'
    const classes = twMerge(baseClasses, className)

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}
