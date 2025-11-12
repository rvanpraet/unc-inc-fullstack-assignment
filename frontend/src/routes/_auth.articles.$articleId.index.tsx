import { createFileRoute } from '@tanstack/react-router'
import { articleQueryOptions } from '../query/articles/articleQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ButtonNavLink } from '../components/ButtonNavLink'

export const Route = createFileRoute('/_auth/articles/$articleId/')({
    // Loader to fetch article data based on articleId param
    loader: ({ context: { queryClient }, params: { articleId } }) =>
        queryClient.ensureQueryData(articleQueryOptions(articleId)),

    // Component code-splitting
    component: ArticleDetailPage,
    errorComponent: () => <div>Failed to load article.</div>, //TODO: Decent error component
    notFoundComponent: () => <div>Article not found.</div>, //TODO: Decent not found component
})

function ArticleDetailPage() {
    const articleId = Route.useParams().articleId
    const { data: article, isLoading } = useSuspenseQuery(articleQueryOptions(articleId))

    if (isLoading) {
        return <p>Loading article...</p>
    }

    return (
        <section className="grid gap-4 text-neutral-900">
            <div className="text-start space-y-2">
                <h1 className="heading-1 mb-6">{article.title}</h1>
                <div className="text-base">{article.content}</div>
            </div>

            <ButtonNavLink to="/articles" variant="secondary" className="mt-8 w-fit self-end">
                Back to Articles Overview
            </ButtonNavLink>
        </section>
    )
}
