// General form error component
import React from 'react'

export function GeneralFormError({ message }: { message: string }) {
    return <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{message}</div>
}
