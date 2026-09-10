import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

type SectionProps = {
  id: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, description, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('scroll-mt-20 py-16 sm:py-24', className)}
    >
      <Container>
        <h2
          id={`${id}-heading`}
          className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{description}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  )
}
