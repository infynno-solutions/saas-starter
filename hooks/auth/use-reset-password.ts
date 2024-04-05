import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

export const resetFormSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Password did not match',
      })
    }
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: z.infer<typeof resetFormSchema>
      token: string
    }): Promise<AxiosResponse> =>
      axios.post(
        `/api/auth/reset-password`,
        { password: data.password },
        { params: { token } },
      ),
  })
