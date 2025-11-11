// apiHelpers.ts
import { camelKeys, snakeKeys } from 'js-convert-case'
import type { ApiError } from '../types/error'

// TODO: Check if snake case converted object type can be inferred from T

export function transformResponse<T>(data: unknown): T {
    // assuming `data` is your parsed JSON from fetch
    return camelKeys(data as object, { recursive: true }) as T
}

export function prepareRequestBody<T>(body: T): unknown {
    // convert body (camelCase) into snake_case before sending to backend
    return snakeKeys(body as object, { recursive: true })
}

// Extends the error object with status and data so the response can be handled properly
export async function handleApiError(response: Response): Promise<void> {
    const error: ApiError = { ...new Error('API request failed'), status: response.status }

    error.data = await response.json()
    // No need to catch here

    throw error
}
