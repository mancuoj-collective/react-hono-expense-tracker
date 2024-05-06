import { type QueryClient } from '@tanstack/react-query'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/theme-toggle'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function Navbar() {
  return (
    <div className="mb-5 w-full border-b">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex gap-3">
          <Link to="/" className="text-foreground/70 [&.active]:text-foreground">
            Home
          </Link>
          <Link to="/about" className="text-foreground/70 [&.active]:text-foreground">
            About
          </Link>
          <Link to="/expenses" className="text-foreground/70 [&.active]:text-foreground">
            Expenses
          </Link>
          <Link to="/create-expense" className="text-foreground/70 [&.active]:text-foreground">
            Create
          </Link>
          <Link to="/profile" className="text-foreground/70 [&.active]:text-foreground">
            Profile
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </div>
  )
}

function Root() {
  return (
    <div className="flex h-dvh flex-col font-sans antialiased">
      <Navbar />
      <div className="container flex-1">
        <Outlet />
      </div>
    </div>
  )
}
