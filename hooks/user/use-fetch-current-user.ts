import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'

interface CurrentUserData {
  email: string
  emailVerified: null
  id: string
  image: string
  name: string
  password: null
  stripeCurrentPeriodEnd: null | string
  stripeCustomerId: null | string
  stripePriceId: null | string
  stripeSubscriptionId: null | string
}

export const useFetchCurrentUser = () =>
  useQuery<{ data: CurrentUserData }, Error>({
    queryKey: ['current-user'],
    queryFn: () => axios.get(`/api/users/me`),
  })
