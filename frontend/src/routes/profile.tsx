import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '~/utils/api'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

async function getCurrentUser() {
  const res = await api.me.$get()
  if (!res.ok) throw new Error('Server error')
  const data = await res.json()
  return data
}

function Profile() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-current-user'],
    queryFn: getCurrentUser,
  })

  if (isPending) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`
  return <div>Hello {data.user.given_name} ❤️</div>
}
