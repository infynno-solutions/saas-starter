import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useFetchUsers = ({
  pageNo,
  perPage,
  sortBy,
  search = '',
}: {
  pageNo: number
  perPage: number
  sortBy?: string
  search?: string
}) =>
  useQuery({
    queryKey: ['fetch-users', pageNo, perPage, sortBy],
    queryFn: () =>
      axios.get(`/api/users`, {
        params: { pageNo, perPage, sortBy, search },
      }),
  })
