import { insertExpenseSchema } from './db/schema'

export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
})
