// query/articles/useUpdateArticle.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import articleService, { type Article } from '../../lib/articles'
import type { ArticleFormData } from '../../components/ArticleForm'

interface MutationFnProps {
    id: string
    data: ArticleFormData
}

export function useUpdateArticle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: MutationFnProps) => articleService.updateArticle(id, data),
        onSuccess: (updatedArticle: Article) => {
            // Update the article in the cached articles list
            queryClient.setQueryData<Article[]>(
                ['articles'],
                (old) => old?.map((a) => (a.id === updatedArticle.id ? updatedArticle : a)) ?? []
            )

            // Update the article detail cache
            queryClient.setQueryData(['articles', updatedArticle.id], updatedArticle)
        },
    })
}
