import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { articlesQueryOptions } from '../query/articles/articlesQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { Article } from '../lib/articles'
import { ButtonNavLink } from '../components/ButtonNavLink'
import { useDeleteArticle } from '../query/articles/useDeleteArticle'
import { SearchField } from '../components/SearchField'
import { z } from 'zod'
import { GeneralErrorMessage } from '../components/GeneralErrorMessage'
import ArticleListItem from '../components/ArticleListItem'

const articlesSearchSchema = z.object({
    search: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_auth/articles/')({
    validateSearch: articlesSearchSchema,
    loaderDeps: ({ search }) => ({ search: search.search }), // I find this kind of verbose but ok
    loader: ({ context: { queryClient }, deps }) => queryClient.ensureQueryData(articlesQueryOptions(deps.search)),
    component: ArticlesPage,
    errorComponent: () => <div>Failed to load articles.</div>,

    //TODO: It would be good if Django returned 404 when there are no articles so this can be code-split as well
    notFoundComponent: () => <div>No articles found.</div>,
})

function ArticlesPage() {
    // Navigation logic
    const navigate = useNavigate({ from: Route.fullPath })
    const { search } = Route.useSearch()

    // Query logic
    const articlesQuery = useSuspenseQuery(articlesQueryOptions(search))
    const articles: Article[] = articlesQuery.data
    const isLoading = articlesQuery.isLoading

    // Delete article mutation
    const deleteArticle = useDeleteArticle()
    const onDeleteClick = (articleId: number) => {
        deleteArticle.mutate(articleId)
    }

    // Search handling
    const handleSearchChange = (newSearch: string) => {
        navigate({
            search: { search: newSearch || undefined },
        })
    }

    // Render logic

    // Loading and empty states
    if (isLoading) {
        return <p>Loading articles...</p>
    }

    // Main render
    return (
        <>
            <OverviewTitle />
            <SearchField
                className="max-w-sm max-md:pr-2"
                value={search || ''}
                onChange={handleSearchChange}
                placeholder="Search articles by title..."
            />
            {deleteArticle.error && <GeneralErrorMessage message={deleteArticle.error.message} />}

            {articles.length === 0 && <p className="text-neutral-600">No articles found.</p>}
            {articles.length > 0 && (
                // Fixed the max height to avoid overflow issues with many articles
                // Ideally would have pagination
                <ul className="space-y-2 overflow-y-scroll max-h-[33vh] max-md:pr-2 ">
                    {articles.map((article) => (
                        <ArticleListItem key={article.id} article={article} onDeleteClick={onDeleteClick} />
                    ))}
                </ul>
            )}
            <div className="pt-8 mt-8 border-t border-neutral-200 text-end">
                <ButtonNavLink to="/articles/create" variant="secondary">
                    Add article
                </ButtonNavLink>
            </div>
        </>
    )
}

function OverviewTitle() {
    return <h1 className="heading-1 mb-16">Articles Overview</h1>
}
