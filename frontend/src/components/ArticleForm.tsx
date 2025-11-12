'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { FormTextField } from './FormTextField'
import { FormTextArea } from './FormTextArea'
import { useState } from 'react'
import { mapServerErrorsToForm } from '../lib/formHelpers'
import type { ApiError } from '../types/error'
import type { Article } from '../lib/articles'
import { ButtonNavLink } from './ButtonNavLink'
import { Button } from './Button'

const articleSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255, 'Title must not exceed 255 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
})

export type ArticleFormData = z.infer<typeof articleSchema>

interface ArticleFormProps {
    onSubmit: (data: ArticleFormData) => Promise<void>
    initialData?: Partial<Article>
    submitButtonText?: string
    isEditing?: boolean
    successText?: string
}

export function ArticleForm({
    onSubmit,
    initialData,
    submitButtonText = 'Submit',
    isEditing = false,
    successText = '',
}: ArticleFormProps) {
    const [generalError, setGeneralError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: initialData?.title || '',
            content: initialData?.content || '',
        },
        mode: 'onSubmit',
    })

    const onSubmitHandler = async (data: ArticleFormData) => {
        // Attempt to submit the form data
        try {
            setGeneralError(null)
            await onSubmit(data)

            if (successText) {
                setSuccessMessage(successText)
            }

            // In case of backend error, either general or field-specific validation errors
        } catch (e) {
            const error = e as ApiError

            // In case of general error without specific field errors
            if (!error.data) {
                setGeneralError(
                    isEditing
                        ? 'Failed to update article. Please try again.'
                        : 'Failed to create article. Please try again.'
                )
                return
            }

            // Handle field-specific errors
            const formErrors = error.data
            mapServerErrorsToForm(formErrors, setError)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
            {generalError && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{generalError}</div>}
            {successMessage && (
                <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">{successMessage}</div>
            )}

            <FormTextField<ArticleFormData>
                className="max-w-full lg:max-w-80"
                id="title"
                label="Title"
                type="text"
                name="title"
                register={register}
                error={errors.title}
            />

            <FormTextArea<ArticleFormData>
                id="content"
                label="Content"
                name="content"
                register={register}
                error={errors.content}
                rows={12}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mt-8 ">
                {/* Back to overview button */}
                <ButtonNavLink to="/articles" variant="secondary" className="w-full md:w-fit self-end">
                    Back to Articles Overview
                </ButtonNavLink>
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-fit">
                    {isSubmitting ? 'Submitting...' : submitButtonText}
                </Button>
            </div>
        </form>
    )
}
