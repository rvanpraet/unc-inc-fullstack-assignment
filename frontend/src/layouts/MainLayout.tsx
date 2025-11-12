import NavBar from '../components/NavBar'

interface Props {
    title?: string
    subTitle?: string
    children: React.ReactNode
}

export function MainLayout({ title, subTitle, children }: Props) {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <NavBar />
            <div className="w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    {title && <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>}
                    {subTitle && <p className="text-sm text-neutral-600">{subTitle}</p>}
                </div>
                {children}
            </div>
        </div>
    )
}
