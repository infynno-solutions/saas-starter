import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useVerifyEmail = (token: string) =>
  useQuery({
    queryKey: ['auth', 'verify', token],
    queryFn: () => axios.post(`/api/auth/verify/${token}`),
  })
