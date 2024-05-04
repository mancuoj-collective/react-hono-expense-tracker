import app from './app'

Bun.serve({
  fetch: app.fetch,
})

console.log('Server running at http://localhost:3000')
