import { date, index, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const expensesTable = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index('user_id_idx').on(expenses.userId),
    }
  },
)

export const insertExpenseSchema = createInsertSchema(expensesTable, {
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be at most 100 characters long' }),
  amount: z
    .string()
    .regex(/^\d+(?:\.\d{1,2})?$/, { message: 'Amount must be a valid number with up to 2 decimal places' }),
})

export const selectExpenseSchema = createSelectSchema(expensesTable)
