import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { authRoute } from './routes/auth'
import { expensesRoute } from './routes/expenses'

const app = new Hono()

app.use(logger())

const apiRoutes = app.basePath('/api').route('/expenses', expensesRoute).route('/', authRoute)

app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export type ApiType = typeof apiRoutes
export default app
