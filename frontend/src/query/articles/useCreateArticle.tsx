import { useMutation, useQueryClient } from '@tanstack/react-query'
import articleService from '../../lib/articles'
import { useNavigate } from '@tanstack/react-router'
import type { ArticleFormData } from '../../components/ArticleForm'

// Small abstraction layer for creating an article
export function useCreateArticle() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // Mutation to create a new article
    return useMutation({
        mutationFn: (data: ArticleFormData) => articleService.createArticle(data),
        onSuccess: () => {
            // Re-fetch list after a new article is created
            queryClient.invalidateQueries({ queryKey: ['articles'] })
            navigate({ to: '/articles' })
        },
    })
}
