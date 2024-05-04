import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

export default function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch('/api/expenses/total-spent')
      const data = await res.json()
      setTotalSpent(data.total)
    }
    fetchTotal()
  }, [])

  return (
    <div className="flex h-dvh items-center justify-center gap-3 font-serif">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{totalSpent}</CardContent>
      </Card>
    </div>
  )
}
