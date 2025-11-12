import { twMerge } from 'tailwind-merge'
import NavBar from '../components/NavBar'

interface Props {
    title?: string
    subTitle?: string
    children: React.ReactNode
    width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    fullWidth?: boolean
    align?: 'start' | 'center' | 'end'
    className?: string
}

export function MainLayout({
    title,
    subTitle,
    children,
    width = 'md',
    fullWidth = false,
    align = 'start',
    className = '',
}: Props) {
    const widthClass = fullWidth ? 'w-screen' : `max-w-${width}`

    const classes = twMerge('relative flex min-h-screen items-center justify-center bg-neutral-50', className)
    const wrapperClasses = twMerge(
        'space-y-6 border border-neutral-200 bg-white p-8 shadow-sm',
        `text-${align}`,
        widthClass
    )

    return (
        <div className={classes}>
            <NavBar />
            <div className={wrapperClasses}>
                {(title || subTitle) && (
                    <div className="mb-12 text-center">
                        {title && <h1 className="heading-1 mb-4">{title}</h1>}
                        {subTitle && <p className="text-sm text-neutral-600">{subTitle}</p>}
                    </div>
                )}

                {children}
            </div>
        </div>
    )
}
