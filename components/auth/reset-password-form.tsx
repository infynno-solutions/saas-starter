'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LuLoader } from 'react-icons/lu'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  resetFormSchema,
  useResetPassword,
} from '@/hooks/auth/use-reset-password'
import { toast } from '../ui/use-toast'

const ResetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const { mutate, isPending } = useResetPassword()

  const form = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const handleReset = (values: z.infer<typeof resetFormSchema>) => {
    const payload = { data: values, token }
    mutate(payload, {
      onSuccess: (response) => {
        toast({
          title: response.data.message ?? 'Success',
          variant: 'default',
        })
        router.push('/auth/login')
      },
      onError: (error: any) => {
        toast({
          title: error.response.data.message ?? 'Something went wrong!!',
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="mt-8">
      <div className="h-1 border-b py-4" />
      <Form {...form}>
        <form
          className="mt-6 space-y-6"
          onSubmit={form.handleSubmit(handleReset)}
        >
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="password"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="confirmPassword"
          />
          <Button
            className="w-full rounded-lg"
            size="lg"
            type="submit"
            disabled={isPending}
          >
            {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
            <span>Update Password</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ResetPasswordForm
