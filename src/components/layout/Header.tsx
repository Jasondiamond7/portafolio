import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { profile } from '@/content/profile'
import { Container } from './Container'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#dataviz', label: 'Data Viz' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
          {profile.name}
        </a>
        <nav aria-label="Primary" className="hidden gap-6 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  )
}
