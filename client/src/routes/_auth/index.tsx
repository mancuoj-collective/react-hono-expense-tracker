import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { api } from '~/utils/api'

export const Route = createFileRoute('/_auth/')({
  component: Index,
})

async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get()
  if (!res.ok) throw new Error('Server error')

  const data = await res.json()
  return data
}

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  })

  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? '...' : data.total}</CardContent>
      </Card>
    </div>
  )
}
