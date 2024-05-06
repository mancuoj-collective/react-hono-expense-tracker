/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as AuthProfileImport } from './routes/_auth/profile'
import { Route as AuthExpensesImport } from './routes/_auth/expenses'
import { Route as AuthCreateExpenseImport } from './routes/_auth/create-expense'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthProfileRoute = AuthProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any)

const AuthExpensesRoute = AuthExpensesImport.update({
  path: '/expenses',
  getParentRoute: () => AuthRoute,
} as any)

const AuthCreateExpenseRoute = AuthCreateExpenseImport.update({
  path: '/create-expense',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_auth/create-expense': {
      preLoaderRoute: typeof AuthCreateExpenseImport
      parentRoute: typeof AuthImport
    }
    '/_auth/expenses': {
      preLoaderRoute: typeof AuthExpensesImport
      parentRoute: typeof AuthImport
    }
    '/_auth/profile': {
      preLoaderRoute: typeof AuthProfileImport
      parentRoute: typeof AuthImport
    }
    '/_auth/': {
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRoute.addChildren([AuthCreateExpenseRoute, AuthExpensesRoute, AuthProfileRoute, AuthIndexRoute]),
  AboutRoute,
])

/* prettier-ignore-end */
