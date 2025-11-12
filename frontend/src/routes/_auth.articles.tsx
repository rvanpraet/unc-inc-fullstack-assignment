// routes/_auth/articles.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '../layouts/MainLayout'

export const Route = createFileRoute('/_auth/articles')({
    component: () => (
        <MainLayout fullWidth>
            <Outlet />
        </MainLayout>
    ),
})
