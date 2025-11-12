import { createFileRoute } from '@tanstack/react-router'
import { articlesQueryOptions } from '../query/articles/articlesQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { IconButtonNavLink } from '../components/IconButtonNavLink'
import { EditIcon } from '../components/icons/EditIcon'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import { ViewIcon } from '../components/icons/ViewIcon'
import type { Article } from '../lib/articles'
import { ButtonNavLink } from '../components/ButtonNavLink'

export const Route = createFileRoute('/_auth/articles/')({
    loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(articlesQueryOptions),
    component: ArticlesPage,
})

function ArticlesPage() {
    const articlesQuery = useSuspenseQuery(articlesQueryOptions)
    const articles: Article[] = articlesQuery.data
    const isLoading = articlesQuery.isLoading

    if (isLoading) {
        return <p>Loading articles...</p>
    }

    if (!articles || articles.length === 0) {
        return <p className="text-neutral-500">No articles found.</p>
    }

    return (
        <>
            <h1 className="font-semibold text-2xl self-start mb-16">Articles Overview</h1>
            <ul className="space-y-2">
                {articles.map((article) => (
                    <li
                        key={article.id}
                        className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 not-last:mb-4"
                    >
                        <h2 className="text-lg font-medium text-neutral-900 pr-2">{article.title}</h2>

                        <div className="flex items-center gap-1">
                            <IconButtonNavLink
                                to="/articles/$articleId"
                                params={{ articleId: String(article.id) }}
                                icon={<ViewIcon />}
                                label="View article"
                                variant="view"
                            />
                            <IconButtonNavLink
                                to="/articles/$articleId/edit"
                                params={{ articleId: String(article.id) }}
                                icon={<EditIcon />}
                                label="Edit article"
                                variant="edit"
                            />
                            <IconButtonNavLink
                                to="/articles/$articleId"
                                params={{ articleId: String(article.id) }}
                                icon={<DeleteIcon />}
                                label="Delete article"
                                variant="delete"
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-16 text-end">
                <ButtonNavLink to="/articles/create" variant="secondary">
                    Add article
                </ButtonNavLink>
            </div>
        </>
    )
}
