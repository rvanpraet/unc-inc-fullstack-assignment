import { useMutation, useQueryClient } from '@tanstack/react-query'
import articleService, { type Article } from '../../lib/articles'

// Small abstraction layer for creating an article
export function useDeleteArticle() {
    const queryClient = useQueryClient()

    // Mutation to create a new article
    return useMutation({
        mutationFn: (articleId: number) => articleService.deleteArticle(articleId),
        onSuccess: (_, id) =>
            queryClient.setQueryData<Article[]>(['articles'], (old) => old?.filter((a) => a.id !== id) ?? []),
        onError: (error) => {
            // Throw the error to be handled by the component
            throw error
        },
    })
}
