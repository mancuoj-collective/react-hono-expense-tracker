import { CalendarIcon } from '@radix-ui/react-icons'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { format } from 'date-fns'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { createExpense, expensesQueryOptions } from '~/utils/api'
import { cn } from '~/utils/cn'
import { createExpenseSchema } from '~server/shared'

export const Route = createFileRoute('/_auth/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: '',
      amount: '',
      date: '',
    },
    onSubmit: async ({ value }) => {
      const existingExpenses = await queryClient.ensureQueryData(expensesQueryOptions)
      navigate({ to: '/expenses' })

      queryClient.setQueryData(['loading-create-expense'], { expense: value })

      try {
        const newExpense = await createExpense(value)
        queryClient.setQueryData(expensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        })
      } catch (error) {
        console.error(error)
      } finally {
        queryClient.setQueryData(['loading-create-expense'], {})
      }
    },
  })

  return (
    <div>
      <form
        className="mx-auto flex max-w-xl flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="title"
            validatorAdapter={zodValidator}
            validators={{
              onChange: createExpenseSchema.shape.title,
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter title"
                  />
                  {field.state.meta.touchedErrors ? (
                    <div className="text-sm text-destructive">{field.state.meta.touchedErrors}</div>
                  ) : null}
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="amount"
            validatorAdapter={zodValidator}
            validators={{
              onChange: createExpenseSchema.shape.amount,
            }}
            children={(field) => {
              return (
                <>
                  <Input
                    type="number"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter amount"
                  />
                  {field.state.meta.touchedErrors ? (
                    <div className="text-sm text-destructive">{field.state.meta.touchedErrors}</div>
                  ) : null}
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="date"
            validatorAdapter={zodValidator}
            validators={{
              onChange: createExpenseSchema.shape.date,
            }}
            children={(field) => {
              return (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.state.value && 'text-muted-foreground',
                        )}
                      >
                        {field.state.value ? format(field.state.value, 'PP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto size-4 opacity-60" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.state.value)}
                        onSelect={(date) => field.handleChange((date || new Date()).toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {field.state.meta.touchedErrors ? (
                    <div className="text-sm text-destructive">{field.state.meta.touchedErrors}</div>
                  ) : null}
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSubmitting ? 'Creating ...' : 'Create Expense'}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  )
}
