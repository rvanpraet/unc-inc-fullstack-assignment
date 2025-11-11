import { createFileRoute } from '@tanstack/react-router'
// import { useAuth } from '../hooks/useAuth'
import { fetchArticles } from '../lib/article'

export const Route = createFileRoute('/_auth/articles')({
    loader: async () => {
        return {
            articles: await fetchArticles(),
        }
    },
    component: ArticlesPage,
})

function ArticlesPage() {
    // const auth = useAuth()

    return (
        <section className="grid gap-2 p-2">
            <p>You are currently on the articles route.</p>
        </section>
    )
}
