/* eslint-disable react-refresh/only-export-components */
import type React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter, createMemoryHistory } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { AuthProvider } from '../contexts/AuthProvider'

// Mock auth context for testing
const mockAuthContext = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    getCurrentUser: async () => false,
    getToken: () => null,
}

// Create a test router
export function createTestRouter(initialPath = '/') {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })

    const router = createRouter({
        routeTree,
        history: createMemoryHistory({
            initialEntries: [initialPath],
        }),
        context: {
            auth: mockAuthContext,
            queryClient,
        },
        defaultPreload: 'intent',
    })

    return { router, queryClient }
}

// Custom render function that wraps components with necessary providers
export function renderWithRouter(component: React.ReactElement, options?: RenderOptions & { initialPath?: string }) {
    const { initialPath = '/', ...renderOptions } = options || {}
    const { router, queryClient } = createTestRouter(initialPath)

    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <QueryClientProvider client={queryClient}>
                <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
        )
    }

    return {
        ...render(component, { wrapper: Wrapper, ...renderOptions }),
        router,
        queryClient,
    }
}

// Helper to render a route component with full router context
export async function renderRoute(initialPath = '/') {
    const { router, queryClient } = createTestRouter(initialPath)

    const rendered = render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    )

    // Wait for router to be ready
    await router.load()

    return {
        ...rendered,
        router,
        queryClient,
    }
}

//
// export * from '@testing-library/jest-dom'
// export * from '@testing-library/react'
