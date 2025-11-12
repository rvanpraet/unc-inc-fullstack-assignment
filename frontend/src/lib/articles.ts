import { apiFetch } from './apiClient'
import { prepareRequestBody, transformResponse } from './apiHelpers'

export interface Article {
    id: number
    title: string
    content: string
    createdAt: string
}

interface CreatePostData {
    title: string
    content: string
}

class ArticleService {
    private apiUrl = `${import.meta.env.VITE_API_BASE_URL}/articles` // Update with your Django backend URL

    async getArticles() {
        // TODO: Pagination, filtering, search
        const response = await apiFetch(this.apiUrl + '/')

        // TODO: Error handling
        const data = await response.json()
        return data.map((item: unknown) => transformResponse<Article>(item))
    }

    async getArticleById(id: string) {
        const response = await apiFetch(`${this.apiUrl}/${id}/`)
        return transformResponse<Article>(await response.json())
    }

    async createArticle(articleData: CreatePostData) {
        const body = prepareRequestBody(articleData)
        const response = await apiFetch(this.apiUrl + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        return response.json()
    }

    async deleteArticle(id: number) {
        const response = await apiFetch(`${this.apiUrl}/${id}/`, {
            method: 'DELETE',
        })

        return response.ok
    }
}

const articleService = new ArticleService()

export default articleService
