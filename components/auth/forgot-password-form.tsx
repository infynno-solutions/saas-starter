'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LuLoader } from 'react-icons/lu'
import { IoMdArrowRoundBack } from 'react-icons/io'
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
import { toast } from '../ui/use-toast'
import {
  forgotPasswordSchema,
  useForgotPassword,
} from '@/hooks/auth/use-forgot-password'

const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    forgotPassword(values, {
      onSuccess: (response) => {
        toast({
          title: response.data.message ?? 'Success',
          variant: 'default',
        })
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
    <div className="mt-6">
      <div className="h-1 border-b py-4" />
      <Form {...form}>
        <form
          className="mt-6 space-y-6"
          onSubmit={form.handleSubmit(handleSubmit)}
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

          <Button
            className="w-full rounded-lg"
            size="lg"
            type="submit"
            disabled={isPending}
          >
            {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
            <span>Continue</span>
          </Button>

          <div className="!mt-10 w-full">
            <Link
              href={'/auth/login'}
              className="flex items-center justify-center gap-2"
            >
              <IoMdArrowRoundBack />
              <span className="text-sm font-medium">Back to login</span>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
