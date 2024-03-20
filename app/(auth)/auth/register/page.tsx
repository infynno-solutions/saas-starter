import { redirect } from 'next/navigation'
import RegisterForm from '@/components/auth/register-from'
import { getCurrentUser } from '@/lib/session'

const Register = async () => {
  const user = await getCurrentUser()
  if (user) {
    return redirect('/')
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
        Sign up for free
      </h1>
      <RegisterForm />
    </div>
  )
}

export default Register
