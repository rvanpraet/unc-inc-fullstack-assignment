import type { FieldValues } from 'react-hook-form'

// export type FormErrorRecord = Record<string, string>
export type FormErrorRecord<TFieldValues extends FieldValues> = {
    [K in keyof TFieldValues]?: string
}

export type ApiErrorData = Partial<Record<string, string>>

export interface ApiError extends Error {
    status: number
    data?: ApiErrorData
}
