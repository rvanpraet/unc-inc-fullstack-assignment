import type { HTMLAttributes } from 'react'
import { IconButton } from './IconButton'
import { IconButtonNavLink } from './IconButtonNavLink'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'
import { ViewIcon } from './icons/ViewIcon'
import type { Article } from '../lib/articles'
import { twMerge } from 'tailwind-merge'
import { motion } from 'motion/react'

interface ArticleListItemProps extends HTMLAttributes<HTMLLIElement> {
    article: Article
    onDeleteClick: (articleId: number) => void
}

export default function ArticleListItem({ className, article, onDeleteClick }: ArticleListItemProps) {
    const baseClasses =
        'flex items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 not-last:mb-4'
    const classes = twMerge(baseClasses, className)

    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: (article.id - 1) * 0.05, ease: 'easeInOut' }}
            className={classes}
        >
            <h2 className="text-lg font-medium text-neutral-900 pr-2">{article.title}</h2>

            <div className="flex items-center gap-1">
                <IconButtonNavLink
                    to="/articles/$articleId"
                    params={{ articleId: String(article.id) }}
                    icon={<ViewIcon />}
                    label="View article"
                    variant="view"
                />
                <IconButtonNavLink
                    to="/articles/$articleId/edit"
                    params={{ articleId: String(article.id) }}
                    icon={<EditIcon />}
                    label="Edit article"
                    variant="edit"
                />
                <IconButton
                    onClick={() => onDeleteClick(article.id)}
                    icon={<DeleteIcon />}
                    label="Delete article"
                    variant="delete"
                />
            </div>
        </motion.li>
    )
}
