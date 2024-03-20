import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const useRegister = () =>
  useMutation({
    mutationFn: (data: z.infer<typeof registerSchema>) =>
      axios.post(`/api/auth/register`, data),
  })
