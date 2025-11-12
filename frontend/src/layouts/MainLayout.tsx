import NavBar from '../components/NavBar'

interface Props {
    title?: string
    subTitle?: string
    children: React.ReactNode
    width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    fullWidth?: boolean
}

export function MainLayout({ title, subTitle, children, width = 'md', fullWidth = false }: Props) {
    const widthClass = fullWidth ? 'w-screen' : `max-w-${width}`
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-neutral-50">
            <NavBar />
            <div className={`${widthClass} space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm`}>
                {(title || subTitle) && (
                    <div className="space-t-2 space-b-4 md:space-b-6 lg:space-b-12 text-center">
                        {title && <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>}
                        {subTitle && <p className="text-sm text-neutral-600">{subTitle}</p>}
                    </div>
                )}

                {children}
            </div>
        </div>
    )
}
