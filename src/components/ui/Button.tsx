import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary'

const base =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark hover:shadow-[0_0_24px_-6px_var(--color-primary)]',
  secondary:
    'border border-primary text-primary hover:bg-surface-alt hover:shadow-[0_0_16px_-6px_var(--color-primary)]',
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <a className={cn(base, variants[variant], className)} {...props} />
}
