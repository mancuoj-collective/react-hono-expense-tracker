import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Skeleton } from '~/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { expensesQueryOptions, loadingCreateQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/_auth/expenses')({
  component: Expenses,
})

function Expenses() {
  const { isPending, error, data } = useQuery(expensesQueryOptions)
  const { data: loadingCreateExpense } = useQuery(loadingCreateQueryOptions)

  if (error) return `An error has occurred: ${error.message}`

  return (
    <div className="mx-auto max-w-xl">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow className="animate-pulse">
              <TableCell>{loadingCreateExpense.expense.title}</TableCell>
              <TableCell>{loadingCreateExpense.expense.amount}</TableCell>
              <TableCell>{format(loadingCreateExpense.expense.date, 'PP')}</TableCell>
            </TableRow>
          )}
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{format(expense.date, 'PP')}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
