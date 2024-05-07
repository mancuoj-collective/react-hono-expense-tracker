import { queryOptions } from '@tanstack/react-query'
import { hc } from 'hono/client'
import { ApiType } from '~server/index'
import { CreateExpense } from '~server/shared'

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

export async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) throw new Error('Server error')

  const data = await res.json()
  return data
}

export const expensesQueryOptions = queryOptions({
  queryKey: ['get-all-expenses'],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
})

export async function createExpense(value: CreateExpense) {
  const res = await api.expenses.$post({ json: value })
  if (!res.ok) throw new Error('Server error')

  const newExpense = await res.json()
  return newExpense
}

export const loadingCreateQueryOptions = queryOptions<{ expense?: CreateExpense }>({
  queryKey: ['loading-create-expense'],
  queryFn: async () => {
    return {}
  },
  staleTime: Infinity,
})

export async function deleteExpense(id: number) {
  const res = await api.expenses[':id{[0-9]+}'].$delete({ param: { id: id.toString() } })
  if (!res.ok) throw new Error('Server error')
}
