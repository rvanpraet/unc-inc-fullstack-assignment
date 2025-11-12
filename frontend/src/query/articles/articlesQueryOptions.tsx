import { queryOptions } from '@tanstack/react-query'
import articleService from '../../lib/articles'

export const articlesQueryOptions = queryOptions({
    queryKey: ['articles'],
    queryFn: () => articleService.getArticles(),
})
