import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { buttonLinkClassName } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { profile } from '@/content/profile'
import { Container } from './Container'

const navItems = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#projects', label: 'Proyectos' },
]

const contactItem = { href: '#contact', label: 'Contacto' }

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return undefined

    // El rootMargin negativo achica el área de detección a una franja angosta
    // cerca del centro vertical de la pantalla, en vez de todo el viewport.
    // Así la sección activa es la que está "bajo la mirada" del usuario, no
    // simplemente la primera que asoma por abajo al hacer scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

export function Header() {
  const activeId = useActiveSection(navItems.map((item) => item.href.slice(1)))
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/#top" className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
          {profile.name}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.slice(1)
            return (
              <Link
                key={item.href}
                to={`/${item.href}`}
                className={
                  isActive
                    ? 'relative text-sm font-medium text-primary'
                    : 'relative text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            )
          })}
          <Link
            to={`/${contactItem.href}`}
            className={buttonLinkClassName('primary', 'px-3.5 py-1.5')}
          >
            {contactItem.label}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="rounded-lg border border-slate-300 p-1.5 text-slate-700 hover:bg-slate-100 md:hidden dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Menú"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-slate-200 md:hidden dark:border-slate-800"
          >
            <Container className="flex flex-col gap-1 py-3">
              {navItems.map((item) => {
                const isActive = activeId === item.href.slice(1)
                return (
                  <Link
                    key={item.href}
                    to={`/${item.href}`}
                    onClick={() => setMenuOpen(false)}
                    className={
                      isActive
                        ? 'rounded-md px-2 py-2 text-sm font-medium text-primary'
                        : 'rounded-md px-2 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                    }
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                to={`/${contactItem.href}`}
                onClick={() => setMenuOpen(false)}
                className={buttonLinkClassName('primary', 'mt-2 justify-center')}
              >
                {contactItem.label}
              </Link>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
