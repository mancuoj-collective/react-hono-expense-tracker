import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { api } from '~/utils/api'
import { createExpenseSchema } from '~server/shared'

export const Route = createFileRoute('/_auth/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: '',
      amount: '0',
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value })
      if (!res.ok) throw new Error('Server error')

      navigate({ to: '/expenses' })
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
                  <Label htmlFor={field.name}>Title</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter title here"
                  />
                  {field.state.meta.touchedErrors ? (
                    <div className="mt-1 text-sm text-destructive">{field.state.meta.touchedErrors}</div>
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
                  <Label htmlFor={field.name}>Amount</Label>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter amount here"
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
