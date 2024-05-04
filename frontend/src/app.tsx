import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { api } from '~/utils/api'

async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get()
  if (!res.ok)
    throw new Error('Server error')

  const data = await res.json()
  return data
}

export default function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  })

  if (error)
    return `An error has occurred: ${error.message}`

  return (
    <div className="flex h-dvh items-center justify-center gap-3 font-serif">
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
