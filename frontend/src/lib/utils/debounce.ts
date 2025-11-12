/**
 * Creates a debounced function that delays invoking the callback until after
 * the specified delay has elapsed since the last time it was invoked.
 *
 * @param callback - The function to debounce
 * @param delay - The number of milliseconds to delay
 * @returns A debounced version of the callback function with a cancel method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const debounced = (...args: Parameters<T>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            callback(...args)
            timeoutId = null
        }, delay)
    }

    debounced.cancel = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    return debounced
}
