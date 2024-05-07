import { z } from 'zod'
import { insertExpenseSchema } from './db/schema'

export const createExpenseSchema = insertExpenseSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
})

export type CreateExpense = z.infer<typeof createExpenseSchema>
