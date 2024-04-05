import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (
      data: z.infer<typeof forgotPasswordSchema>,
    ): Promise<AxiosResponse> => axios.post(`/api/auth/forgot-password`, data),
  })
