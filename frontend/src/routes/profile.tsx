import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  if (isPending) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`
  return <div>Hello {data.user.given_name} ❤️</div>
}
