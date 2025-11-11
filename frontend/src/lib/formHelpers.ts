import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { FormErrorRecord } from '../types/error'

export function mapServerErrorsToForm<T extends FieldValues>(
    serverErrors: FormErrorRecord<T>,
    setError: UseFormSetError<T>
): void {
    // Map each server error to the corresponding form field
    ;(Object.entries(serverErrors) as [Path<T>, string][]).forEach(([key, message]) => {
        setError(key, { message })
    })
}
