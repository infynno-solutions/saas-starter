import ForgotPasswordForm from '@/components/auth/forgot-password-form'
import React from 'react'

const page = () => {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
        Forgot password?
      </h1>
      <p className="mt-2 ">
        Enter your email address and we will send you the instructions to reset
        your password
      </p>
      <ForgotPasswordForm />
    </div>
  )
}

export default page
