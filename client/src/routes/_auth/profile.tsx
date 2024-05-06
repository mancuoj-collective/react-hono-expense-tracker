import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { userQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/_auth/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)

  if (isPending) return 'Loading...'
  if (error) return `An error has occurred: ${error.message}`
  return (
    <div>
      <h1>Hello {data.user.given_name} ❤️</h1>
      <Button>
        <a href="/api/logout">Logout</a>
      </Button>
    </div>
  )
}
