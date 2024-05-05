import { createKindeServerClient, GrantType, type SessionManager, type UserType } from '@kinde-oss/kinde-typescript-sdk'
import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import type { CookieOptions } from 'hono/utils/cookie'
import { env } from './env'

export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: env.KINDE_DOMAIN,
  clientId: env.KINDE_CLIENT_ID,
  clientSecret: env.KINDE_CLIENT_SECRET,
  redirectURL: env.KINDE_REDIRECT_URI,
  logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI,
})

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    return getCookie(c, key)
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions: CookieOptions = {
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
    }
    if (typeof value === 'string') {
      setCookie(c, key, value, cookieOptions)
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions)
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key)
  },
  async destroySession() {
    const keys = ['id_token', 'access_token', 'refresh_token', 'user']
    keys.forEach((key) => {
      deleteCookie(c, key)
    })
  },
})

type Env = {
  Variables: {
    user: UserType
  }
}

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(sessionManager(c))
    if (!isAuthenticated) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    const user = await kindeClient.getUserProfile(sessionManager(c))
    c.set('user', user)
    await next()
  } catch (e) {
    console.error(e)
    return c.json({ error: 'Unauthorized' }, 401)
  }
})
