import type { ArticleFormData } from '../components/ArticleForm'
import { apiFetch } from './apiClient'
import { handleApiError, prepareRequestBody, transformResponse } from './apiHelpers'

export interface Article {
    id: number
    title: string
    content: string
    createdAt: string
}

// Service class to handle article-related API interactions
class ArticleService {
    // public get apiUrl: string
    // private apiUrl = `${import.meta.env.VITE_API_BASE_URL}/articles`
    public get apiUrl() {
        return `${import.meta.env.VITE_API_BASE_URL}/articles`
    }

    // constructor() {
    //     this.apiUrl = `${import.meta.env.VITE_API_BASE_URL}/articles`
    // }

    async getArticles(search?: string) {
        const baseUrl = this.apiUrl + '/'
        const searchParam = search ? `?search=${encodeURIComponent(search)}` : ''
        const fetchUrl = baseUrl + searchParam

        // TODO: Pagination, filtering, search
        const response = await apiFetch(fetchUrl)

        // TODO: Error handling
        const data = await response.json()
        return data.map((item: unknown) => transformResponse<Article>(item))
    }

    async getArticleById(id: string) {
        const response = await apiFetch(`${this.apiUrl}/${id}/`)
        return transformResponse<Article>(await response.json())
    }

    async createArticle(articleData: ArticleFormData) {
        const body = prepareRequestBody(articleData)

        console.log('Creating article with data:', body)
        console.log('API URL:', this.apiUrl + '/')

        const response = await apiFetch(this.apiUrl + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        // Handle API errors
        if (!response.ok) {
            await handleApiError(response)
        }

        return response.json()
    }

    async updateArticle(id: string, articleData: ArticleFormData) {
        const body = prepareRequestBody(articleData)

        const response = await apiFetch(`${this.apiUrl}/${id}/`, {
            method: 'PUT',
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
