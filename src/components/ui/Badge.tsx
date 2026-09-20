import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface-alt px-3 py-1 text-sm font-medium text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_0_12px_-2px_var(--color-primary)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
