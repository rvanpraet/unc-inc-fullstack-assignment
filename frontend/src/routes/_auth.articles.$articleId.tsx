import { createFileRoute, Outlet } from '@tanstack/react-router'

// Base route for distinguishing between article detail and edit routes
export const Route = createFileRoute('/_auth/articles/$articleId')({
    component: ArticleDetailIndexPage,
})

function ArticleDetailIndexPage() {
    return <Outlet />
}
