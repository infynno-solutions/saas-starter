'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { LuLoader } from 'react-icons/lu'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<string>('')
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleGoogleLogin = async () => {
    setIsLoading('google')
    await signIn('google')
  }

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading('direct')
    await signIn('credentials', { ...values, redirect: false }).then((res) => {
      setIsLoading('')
      if (!res) {
        toast({ title: 'Something went wrong!!', variant: 'destructive' })
        return
      }
      if (res.error) {
        toast({ title: res.error, variant: 'destructive' })
        return
      }
      router.push('/')
    })
  }

  return (
    <div className="mt-8">
      <Button
        className="h-auto w-full rounded-lg py-2.5 text-lg"
        size="lg"
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
      >
        {isLoading === 'google' ? (
          <LuLoader className="mr-2 h-8 w-8 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-8 w-8" />
        )}

        <span>Sign in with Google</span>
      </Button>
      <div className="h-1 border-b py-4" />
      <Form {...form}>
        <form
          className="mt-6 space-y-6"
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="email"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="password"
          />
          <Link
            className="block text-lg underline"
            href="/auth/forgot-password"
          >
            Forgot Password?
          </Link>
          <Button className="w-full rounded-lg" size="lg" type="submit">
            {isLoading === 'direct' && (
              <LuLoader className="mr-2 h-5 w-5 animate-spin" />
            )}
            <span>Sign In</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
