'use client'

import { redirect, createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import z from 'zod'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ApiError } from '../types/error'
import { FormTextField } from '../components/FormTextField'
import { GeneralFormError } from '../components/GeneralFormError'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../components/Button'

export const Route = createFileRoute('/login')({
    // Check if user is already authenticated and should be redirected to the authenticated area
    beforeLoad: async ({ context }) => {
        const isAuthenticated = await context.auth.getCurrentUser()

        if (isAuthenticated) {
            console.log('redirecting in login ::: ', isAuthenticated)
            throw redirect({ to: '/' })
        }
    },
    component: LoginComponent,
})

// Login form schema
const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Infer the form data type from the schema
type LoginFormData = z.infer<typeof loginSchema>

function LoginComponent() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [generalError, setGeneralError] = useState<string | null>(null)

    // Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit',
    })

    // Form submission handler
    const onSubmit = async (data: LoginFormData) => {
        try {
            setGeneralError(null)
            await login(data)

            console.log('Login successful, navigating to articles...')

            navigate({ to: '/articles' })
        } catch (e) {
            const error = e as ApiError

            // We only want to show a general error for invalid credentials
            if (error.data?.detail) {
                setGeneralError(error.data.detail)
                return
            }
        }
    }

    return (
        <MainLayout title="Welcome back" subTitle="Enter your credentials to sign in">
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

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>

                <p className="text-center text-sm text-neutral-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-neutral-900 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </MainLayout>
    )
}
