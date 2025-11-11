import { createFileRoute } from '@tanstack/react-router'
import { fetchArticleById } from '../lib/article'

export const Route = createFileRoute('/_auth/articles/$articleId/edit')({
    loader: async ({ params: { articleId } }) => {
        return {
            article: await fetchArticleById(parseInt(articleId)),
        }
    },
    component: ArticlePage,
})

function ArticlePage() {
    const { article } = Route.useLoaderData()

    return <section className="grid gap-2">{JSON.stringify(article)}</section>
}
