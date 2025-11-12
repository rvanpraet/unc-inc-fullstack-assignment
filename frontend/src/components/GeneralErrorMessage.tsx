import { twMerge } from 'tailwind-merge'

interface GeneralErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string
}

export function GeneralErrorMessage({ message, className }: GeneralErrorMessageProps) {
    const classes = twMerge('rounded-md bg-red-50 p-3 text-sm text-red-800', className)

    return <div className={classes}>{message}</div>
}
