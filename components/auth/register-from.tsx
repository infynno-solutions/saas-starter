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
import { registerSchema, useRegister } from '@/hooks/auth/use-register'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    await signIn('google')
  }

  const { mutate, isPending } = useRegister()

  const handleLogin = async (values: z.infer<typeof registerSchema>) =>
    mutate(values, {
      onSuccess: (res) => {
        toast({ title: res?.data?.message || 'Success' })
        router.push('/')
      },
    })

  return (
    <div className="mt-8">
      <Button
        className="h-auto w-full rounded-lg py-2.5 text-lg"
        size="lg"
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
      >
        {isLoading ? (
          <LuLoader className="mr-2 h-8 w-8 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-8 w-8" />
        )}

        <span>Sign up with Google</span>
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
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="name"
          />
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
          <Button className="w-full rounded-lg" size="lg" type="submit">
            {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
            <span>Sign Up</span>
          </Button>
          <p className="text-sm">
            By signing up, you agree to our{' '}
            <Link className="underline" href="/">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link className="underline" href="/">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm
