import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Skeleton } from '~/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { api } from '~/utils/api'

export const Route = createFileRoute('/_auth/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) throw new Error('Server error')

  const data = await res.json()
  return data
}

function Expenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses,
  })

  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className="mx-auto max-w-xl">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{format(expense.date, 'PP')}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
