import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form'

interface FormTextFieldProps<T extends FieldValues> {
    id: string
    label: string
    type?: 'text' | 'email' | 'password'
    name: Path<T>
    register: UseFormRegister<T>
    error?: FieldError
    optional?: boolean
}

export function FormTextField<T extends FieldValues>({
    id,
    label,
    type = 'text',
    name,
    register,
    error,
    optional = false,
}: FormTextFieldProps<T>) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
                {label} {optional && <span className="text-neutral-400">(optional)</span>}
            </label>
            <input
                id={id}
                type={type}
                {...register(name)}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            {error && <p className="text-sm text-red-600">{error.message}</p>}
        </div>
    )
}
