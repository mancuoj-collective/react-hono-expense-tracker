import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { authRoute } from './routes/auth'
import { expensesRoute } from './routes/expenses'

const app = new Hono()

app.use(logger())
app.use(timing())

const apiRoutes = app.basePath('/api').route('/expenses', expensesRoute).route('/', authRoute)

app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export type ApiType = typeof apiRoutes

export default {
  port: process.env.PORT || 3000,
  hostname: '0.0.0.0',
  fetch: app.fetch,
}
