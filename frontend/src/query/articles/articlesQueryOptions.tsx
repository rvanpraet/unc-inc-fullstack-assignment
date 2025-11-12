import { queryOptions } from '@tanstack/react-query'
import articleService from '../../lib/articles'

export const articlesQueryOptions = (search?: string) =>
    queryOptions({
        queryKey: ['articles', search ?? ''],
        queryFn: () => articleService.getArticles(search),
    })
