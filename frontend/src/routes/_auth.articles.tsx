import { createFileRoute } from '@tanstack/react-router'
import { fetchArticles } from '../lib/article'
import { useAuth } from '../hooks/useAuth'
import { MainLayout } from '../layouts/MainLayout'

export const Route = createFileRoute('/_auth/articles')({
    loader: async () => {
        return {
            articles: await fetchArticles(),
        }
    },
    component: ArticlesPage,
})

function ArticlesPage() {
    const { user } = useAuth()

    return (
        <MainLayout title="Articles" subTitle="List of articles">
            <section className="grid gap-2 p-2">
                <h2>Welcome, {user?.firstName}!</h2>
                <p>You are currently on the articles route.</p>
            </section>
        </MainLayout>
    )
}
