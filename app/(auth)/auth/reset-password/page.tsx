import ResetPasswordForm from '@/components/auth/reset-password-form'
import React from 'react'

const ResetPassword = () => {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
        Reset password
      </h1>
      <ResetPasswordForm />
    </div>
  )
}

export default ResetPassword
