import { queryOptions } from '@tanstack/react-query'
import articleService from '../../lib/articles'

export const articleQueryOptions = (articleId: string) =>
    queryOptions({
        queryKey: ['articles', { articleId }],
        queryFn: () => articleService.getArticleById(articleId),
    })
