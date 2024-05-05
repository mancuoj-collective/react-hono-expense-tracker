import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeToggle } from '~/components/theme-toggle'

export const Route = createRootRoute({
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

function Main() {
  return (
    <main className="container flex-1">
      <Outlet />
    </main>
  )
}

function Root() {
  return (
    <div className="flex h-dvh flex-col font-sans antialiased">
      <Navbar />
      <Main />
      <TanStackRouterDevtools />
    </div>
  )
}
