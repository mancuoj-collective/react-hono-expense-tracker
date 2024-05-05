import { Hono } from 'hono'
import { kindeClient, sessionManager } from '../kinde'

export const authRoute = new Hono()
  .get('/login', async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c))
    return c.redirect(loginUrl.toString())
  })
  .get('/register', async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c))
    return c.redirect(registerUrl.toString())
  })
  .get('/callback', async (c) => {
    const url = new URL(c.req.url)
    await kindeClient.handleRedirectToApp(sessionManager(c), url)
    return c.redirect('/')
  })
  .get('/logout', async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c))
    return c.redirect(logoutUrl.toString())
  })
  .get('/me', async (c) => {
    const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c))
    if (!isAuthenticated) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    const user = await kindeClient.getUserProfile(sessionManager(c))
    return c.json({ user })
  })
