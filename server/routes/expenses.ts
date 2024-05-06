import { zValidator } from '@hono/zod-validator'
import { and, desc, eq, sum } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../db'
import { expensesTable } from '../db/schema'
import { getUser } from '../kinde'

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.string(),
})

const createExpenseSchema = expenseSchema.omit({ id: true })

type Expense = z.infer<typeof expenseSchema>

export const expensesRoute = new Hono()
  .use(getUser)
  .get('/', async (c) => {
    const user = c.var.user

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(50)

    return c.json({ expenses })
  })
  .post('/', zValidator('json', createExpenseSchema), async (c) => {
    const expense = c.req.valid('json')
    const user = c.var.user

    const result = await db
      .insert(expensesTable)
      .values({ ...expense, userId: user.id })
      .returning()

    return c.json(result, 201)
  })
  .get('/total-spent', async (c) => {
    const user = c.var.user

    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .then((res) => res[0])

    return c.json(result)
  })
  .get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const user = c.var.user

    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then((res) => res[0])

    if (!expense) {
      return c.notFound()
    }
    return c.json({ expense })
  })
  .delete('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const user = c.var.user

    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .returning()
      .then((res) => res[0])

    if (!expense) {
      return c.notFound()
    }
    return c.json({ expense })
  })
