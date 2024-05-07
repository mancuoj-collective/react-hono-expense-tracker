import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
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
    <div className="mx-auto max-w-xl">
      <div className="flex items-end justify-center gap-5">
        <Avatar className="size-24 rounded-xl">
          {data.user.picture && <AvatarImage src={data.user.picture} alt={data.user.given_name} />}
          <AvatarFallback>{data.user.given_name} </AvatarFallback>
        </Avatar>
        <div>
          <p className="mb-3">{data.user.given_name}</p>
          <Button asChild>
            <a href="/api/logout">Logout</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
