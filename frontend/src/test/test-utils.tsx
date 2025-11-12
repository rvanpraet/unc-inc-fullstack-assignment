import type React from 'react'
import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { AuthProvider } from '../contexts/AuthProvider'

// Create a test router
function createTestRouter() {
    return createRouter({
        routeTree,
        context: {
            queryClient: new QueryClient({
                defaultOptions: {
                    queries: { retry: false },
                    mutations: { retry: false },
                },
            }),
            auth: {
                isAuthenticated: false,
                user: null,
                login: async () => {},
                logout: async () => {},
                register: async () => {},
            },
        },
    })
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    initialRoute?: string
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    )

    return render(ui, { wrapper: Wrapper, ...options })
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render, createTestRouter }
