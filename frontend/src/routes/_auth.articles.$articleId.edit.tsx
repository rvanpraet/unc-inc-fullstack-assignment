import { createFileRoute } from '@tanstack/react-router'
import { ArticleForm, type ArticleFormData } from '../components/ArticleForm'
import { useUpdateArticle } from '../query/articles/useUpdateArticle'
import { articleQueryOptions } from '../query/articles/articleQueryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_auth/articles/$articleId/edit')({
    loader: ({ context: { queryClient }, params: { articleId } }) =>
        queryClient.ensureQueryData(articleQueryOptions(articleId)),

    // Component code-splitting
    component: ArticleEditPage,
    errorComponent: () => <div>Failed to load article for editing.</div>, //TODO: Decent error component
    notFoundComponent: () => <div>Article not found.</div>, //TODO: Decent not found component
})

function ArticleEditPage() {
    const articleQuery = useSuspenseQuery(articleQueryOptions(Route.useParams().articleId))
    const article = articleQuery.data
    const isLoading = articleQuery.isLoading // Unsure about the difference between isLoading, isFetching and isPending

    const updateArticle = useUpdateArticle()

    const onSubmitForm = async (data: ArticleFormData) => {
        await updateArticle.mutateAsync({ id: `${article.id}`, data })
    }

    // TODO: add loading skeletons for the form
    if (isLoading) {
        return <p>Loading article...</p>
    }

    return (
        <>
            <h1 className="text-xl font-semibold mb-16">Edit article</h1>
            <ArticleForm
                onSubmit={onSubmitForm}
                initialData={article}
                submitButtonText="Save"
                successText="Article updated successfully!"
            />
        </>
    )
}
