import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form'

interface FormTextAreaProps<T extends FieldValues> {
    id: string
    label: string
    name: Path<T>
    register: UseFormRegister<T>
    error?: FieldError
    rows?: number
    optional?: boolean
}

export function FormTextArea<T extends FieldValues>({
    id,
    label,
    name,
    register,
    error,
    rows = 6,
    optional = false,
}: FormTextAreaProps<T>) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
                {label} {optional && <span className="text-neutral-400">(optional)</span>}
            </label>
            <textarea
                id={id}
                rows={rows}
                {...register(name)}
                className="w-full resize-y rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    )
}
