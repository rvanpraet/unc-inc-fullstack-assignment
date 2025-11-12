'use client'

import { useState, useEffect } from 'react'

interface SearchFieldProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    debounceMs?: number
}

export function SearchField({ value, onChange, placeholder = 'Search...', debounceMs = 400 }: SearchFieldProps) {
    const [localValue, setLocalValue] = useState(value)

    // Sync local value when prop value changes (e.g., URL updates)
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    // Debounce the onChange callback
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== value) {
                onChange(localValue)
            }
        }, debounceMs)

        return () => clearTimeout(timer)
    }, [localValue, value, onChange, debounceMs])

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
