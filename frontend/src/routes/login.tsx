'use client'

import { redirect, createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import z from 'zod'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mapServerErrorsToForm } from '../lib/formHelpers'
import type { ApiError } from '../types/error'
import { FormTextField } from '../components/FormTextField'
import { GeneralFormError } from '../components/GeneralFormError'

const fallback = '/articles' as const

export const Route = createFileRoute('/login')({
    validateSearch: z.object({
        redirect: z.string().optional().catch(''),
    }),
    beforeLoad: ({ context, search }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: search.redirect || fallback })
        }
    },
    component: LoginComponent,
})

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginComponent() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [generalError, setGeneralError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit',
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            setGeneralError(null)
            await login(data.username, data.password)
            // Navigate to articles page after successful login
            navigate({ to: '/articles' })
        } catch (e) {
            const error = e as ApiError

            // In case of general error without specific field errors
            if (!error.data) {
                setGeneralError('Invalid username or password. Please try again.')
                return
            }

            // Handle field-specific errors
            const formErrors = error.data
            mapServerErrorsToForm(formErrors, setError)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900">Welcome back</h1>
                    <p className="text-sm text-neutral-600">Enter your credentials to sign in</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-neutral-900">
                    {generalError && <GeneralFormError message={generalError} />}

                    <FormTextField<LoginFormData>
                        id="username"
                        label="Username"
                        type="text"
                        name="username"
                        register={register}
                        error={errors.username}
                    />

                    <FormTextField<LoginFormData>
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        register={register}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>

                    <p className="text-center text-sm text-neutral-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-neutral-900 hover:underline">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
