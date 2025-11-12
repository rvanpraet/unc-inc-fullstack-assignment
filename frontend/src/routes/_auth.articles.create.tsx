import { createFileRoute } from '@tanstack/react-router'
// import articleService from '../lib/articles'

export const Route = createFileRoute('/_auth/articles/create')({
    // loader: async ({ params: { articleId } }) => {
    //     return {
    //         article: await fetchArticleById(parseInt(articleId)),
    //     }
    // },
    component: ArticleCreatePage,
})

function ArticleCreatePage() {
    return <section className="grid gap-2">Create Article Page - To be implemented</section>
    // const { article } = Route.useLoaderData()

    // return <section className="grid gap-2">{JSON.stringify(article)}</section>
}
