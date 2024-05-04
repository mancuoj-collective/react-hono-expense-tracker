import { useDark } from '~/hooks/use-dark'
import { Button } from '~/components/ui/button'

export function ThemeToggle() {
  const { toggleDark } = useDark()

  return (
    <Button variant="ghost" size="icon" onClick={toggleDark}>
      <span
        role="img"
        aria-hidden="true"
        className="i-lucide-sun size-6 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0"
      />
      <span
        role="img"
        aria-hidden="true"
        className="i-lucide-moon absolute size-6 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}