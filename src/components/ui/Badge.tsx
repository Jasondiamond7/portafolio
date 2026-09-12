import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-secondary',
        className,
      )}
    >
      {children}
    </span>
  )
}
