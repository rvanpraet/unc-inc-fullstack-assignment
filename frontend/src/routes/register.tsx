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
import { FormTextField } from '../components/FormTextField'
import { GeneralFormError } from '../components/GeneralFormError'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../components/Button'

const fallback = '/articles' as const

export const Route = createFileRoute('/register')({
    // TODO: Check if redirect is needed here
    validateSearch: z.object({
        redirect: z.string().optional().catch(''),
    }),
    beforeLoad: ({ context, search }) => {
        console.log('Register route beforeLoad check ::: ', context.auth)
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
        <MainLayout title="Create an account" subTitle="Fill in the details to register">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-neutral-900">
                {generalError && <GeneralFormError message={generalError} />}

                <FormTextField<RegisterFormData>
                    id="username"
                    label="Username"
                    type="text"
                    name="username"
                    register={register}
                    error={errors.username}
                />

                <FormTextField<RegisterFormData>
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    register={register}
                    error={errors.password}
                />

                <FormTextField<RegisterFormData>
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                />

                <FormTextField<RegisterFormData>
                    id="firstName"
                    label="First name"
                    type="text"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                />

                <FormTextField<RegisterFormData>
                    id="lastName"
                    label="Last name"
                    type="text"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                    optional
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                </Button>

                <p className="text-center text-sm text-neutral-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-neutral-900 hover:underline">
                        Log in
                    </Link>
                </p>
            </form>
        </MainLayout>
    )
}
