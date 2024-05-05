import { queryOptions } from '@tanstack/react-query'
import { hc } from 'hono/client'
import type { ApiType } from '~server/app'

const client = hc<ApiType>('/')

export const api = client.api

async function getCurrentUser() {
  const res = await api.me.$get()
  if (!res.ok) throw new Error('Server error')
  const data = await res.json()
  return data
}

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity,
})
