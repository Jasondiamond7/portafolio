import type { AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary'

const base =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'border border-primary text-primary hover:bg-surface-alt',
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <a className={cn(base, variants[variant], className)} {...props} />
}
