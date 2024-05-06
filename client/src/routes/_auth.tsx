import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { userQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (e) {
      console.error(e)
      return { user: null }
    }
  },
  component: Auth,
})

function Auth() {
  const { user } = Route.useRouteContext()
  if (!user) {
    return <Login />
  }
  return <Outlet />
}

function Login() {
  return (
    <div>
      <Button>
        <a href="/api/login">You have to login!</a>
      </Button>
    </div>
  )
}
