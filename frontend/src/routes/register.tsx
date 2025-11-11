import { redirect, createFileRoute, Link } from '@tanstack/react-router'
// import { Route as rootRoute } from './__root'
// import { authService } from '../lib/auth'
import z from 'zod'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mapServerErrorsToForm } from '../lib/formHelpers'
import type { ApiError } from '../types/error'

const fallback = '/articles' as const

export const Route = createFileRoute('/register')({
    // TODO: Check if redirect is needed here
    validateSearch: z.object({
        redirect: z.string().optional().catch(''),
    }),
    beforeLoad: ({ context, search }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({ to: search.redirect || fallback })
        }
    },
    component: RegisterComponent,
})

const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().optional(),
})

type RegisterFormData = z.infer<typeof registerSchema>

function RegisterComponent() {
    const { register: registerUser } = useAuth()
    const [isSuccess, setIsSuccess] = useState(false)
    const [generalError, setGeneralError] = useState<string | null>(null)
    // const [serverErrors, setServerErrors] = useState<FormErrorRecord<RegisterFormData>>({})

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onSubmit',
    })

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setGeneralError(null)
            await registerUser(data)
            setIsSuccess(true)
        } catch (e) {
            const error = e as ApiError

            // In case of general error without specific field errors
            if (!error.data) {
                setGeneralError('An unexpected error occurred. Please try again.')
                return
            }

            // Handle field-specific errors
            const formErrors = error.data
            mapServerErrorsToForm(formErrors, setError)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
                <div className="w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
                    <div className="space-y-2 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-neutral-900">Registration successful</h2>
                        <p className="text-neutral-600">Your account has been created. You can now log in.</p>
                    </div>
                    <Link
                        to="/login"
                        className="flex w-full items-center justify-center rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-md space-y-6 rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900">Create an account</h1>
                    <p className="text-sm text-neutral-600">Enter your details to get started</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-neutral-900">
                    {generalError && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{generalError}</div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-neutral-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register('username')}
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
                        {/* {serverErrors.username && <p className="text-sm text-red-600">{serverErrors.username[0]}</p>} */}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                        {/* {serverErrors.password && <p className="text-sm text-red-600">{serverErrors.password[0]}</p>} */}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                        {/* {serverErrors.email && <p className="text-sm text-red-600">{serverErrors.email[0]}</p>} */}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700">
                            First name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            {...register('firstName')}
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
                        {/* {serverErrors.firstName && <p className="text-sm text-red-600">{serverErrors.firstName[0]}</p>} */}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700">
                            Last name <span className="text-neutral-400">(optional)</span>
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            {...register('lastName')}
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                        {/* {serverErrors.lastName && <p className="text-sm text-red-600">{serverErrors.lastName[0]}</p>} */}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>

                    <p className="text-center text-sm text-neutral-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-neutral-900 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
