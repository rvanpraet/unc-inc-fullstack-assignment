import { createFileRoute } from '@tanstack/react-router'
import { ArticleForm, type ArticleFormData } from '../components/ArticleForm'
import { useCreateArticle } from '../query/articles/useCreateArticle'

export const Route = createFileRoute('/_auth/articles/create')({
    // Component code-splitting
    component: ArticleCreatePage,
    errorComponent: () => <div>Failed to load article creation page.</div>, //TODO: Decent error component
    notFoundComponent: () => <div>Page not found.</div>, //TODO: Decent not found component
})

function ArticleCreatePage() {
    const createArticle = useCreateArticle()

    const onSubmitForm = async (data: ArticleFormData) => {
        await createArticle.mutateAsync(data)
    }

    return (
        <>
            <h1 className="heading-1 mb-16">Create a new article</h1>
            <ArticleForm onSubmit={onSubmitForm} submitButtonText="Create" />
        </>
    )
}
