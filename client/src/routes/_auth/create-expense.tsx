import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { api } from '~/utils/api'

export const Route = createFileRoute('/_auth/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
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
        className="mx-auto max-w-xl"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="title"
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
                  />
                  {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="amount"
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
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
                </>
              )
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="mt-4 w-full">
              {isSubmitting ? 'Creating ...' : 'Create Expense'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
