import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const newsLetterSchema = z.object({
  email: z.string().email(),
})
export const useSubscribeNewsletter = () =>
  useMutation({
    mutationFn: (data: z.infer<typeof newsLetterSchema>) =>
      axios.post(`/api/users/news-letter`, data),
  })
