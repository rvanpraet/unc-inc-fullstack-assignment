import { useMutation, useQueryClient } from '@tanstack/react-query'
import articleService from '../../lib/articles'

// Small abstraction layer for creating an article
export function useDeleteArticle() {
    const queryClient = useQueryClient()

    // Mutation to create a new article
    return useMutation({
        mutationFn: (articleId: number) => articleService.deleteArticle(articleId),
        onSuccess: () => {
            // Invalidate and refetch articles list
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        },

        // Could locally update the cache instead of invalidating,
        // but in a scenario where multiple clients are working on the same list it's better to invalidate
        // onSuccess: (_, id) =>
        //     queryClient.setQueryData<Article[]>(['articles', { search }], (old) => old?.filter((a) => a.id !== id) ?? []),

        onError: (error) => {
            // Throw the error to be handled by the component
            throw error
        },
    })
}
