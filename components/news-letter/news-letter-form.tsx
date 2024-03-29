'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import {
  newsLetterSchema,
  useSubscribeNewsletter,
} from '@/hooks/users/use-subscribe-newsletter'
import { toast } from '../ui/use-toast'
import { LuLoader } from 'react-icons/lu'

const NewsLetterForm = () => {
  const { mutate, isPending } = useSubscribeNewsletter()
  const form = useForm<z.infer<typeof newsLetterSchema>>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = (values: z.infer<typeof newsLetterSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast({ title: 'You have subscribed to the news letter' })
      },
      onError: () => {
        toast({
          title: 'Something went wrong!',
          description: 'Please try again.',
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="mt-6 space-y-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="mt-8 flex w-full items-center justify-center gap-4">
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="h-10 w-96"
                    placeholder="Enter your email address"
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
            name="email"
          />
          <Button type="submit">
            {isPending && <LuLoader className="mr-2 h-5 w-5 animate-spin" />}
            <span>Subscribe</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NewsLetterForm
