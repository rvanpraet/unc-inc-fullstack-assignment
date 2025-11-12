'use client'

import { useState, useEffect, useMemo } from 'react'
import { debounce } from '../lib/utils/debounce'

interface SearchFieldProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    debounceMs?: number
}

export function SearchField({ value, onChange, placeholder = 'Search...', debounceMs = 400 }: SearchFieldProps) {
    const [localValue, setLocalValue] = useState(value)

    const debouncedOnChange = useMemo(
        () =>
            debounce((newValue: string) => {
                if (newValue !== value) {
                    onChange(newValue)
                }
            }, debounceMs),
        [onChange, debounceMs, value]
    )

    // Sync local value when prop value changes (e.g., URL updates)
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    // Debounce the onChange callback
    useEffect(() => {
        debouncedOnChange(localValue)

        return () => debouncedOnChange.cancel()
    }, [localValue, debouncedOnChange])

    return (
        <div className="mb-6">
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
        </div>
    )
}
