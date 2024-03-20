import { redirect } from 'next/navigation'
import LoginForm from '@/components/auth/login-form'
import { getCurrentUser } from '@/lib/session'

const Login = async () => {
  const user = await getCurrentUser()
  if (user) {
    return redirect('/')
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
        Sign in to SaaS Starter
      </h1>
      <LoginForm />
    </div>
  )
}

export default Login
