import { profile } from '@/content/profile'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-text-secondary sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite, Tailwind and
          Recharts.
        </p>
        <ul className="flex gap-4">
          {profile.socials.map((social) => (
            <li key={social.url}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
