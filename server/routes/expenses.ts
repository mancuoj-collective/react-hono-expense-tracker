import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
})

const createExpenseSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

const fakeDatabase: Expense[] = [
  { id: 1, title: 'Rent', amount: 1000 },
  { id: 2, title: 'Gas', amount: 500 },
  { id: 3, title: 'Electricity', amount: 200 },
]

export const expensesRoute = new Hono()
  .get('/', (c) => {
    return c.json({ expenses: fakeDatabase })
  })
  .post('/', zValidator('json', createExpenseSchema), (c) => {
    const expense = c.req.valid('json')
    fakeDatabase.push({ ...expense, id: fakeDatabase.length + 1 })
    c.status(201)
    return c.json({ expense })
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const expense = fakeDatabase.find((e) => e.id === id)
    if (!expense) {
      return c.notFound()
    }
    return c.json({ expense })
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const index = fakeDatabase.findIndex((e) => e.id === id)
    if (index === -1) {
      return c.notFound()
    }
    const deletedExpense = fakeDatabase.splice(index, 1)[0]
    return c.json({ expense: deletedExpense })
  })
