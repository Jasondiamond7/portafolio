import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Container } from './Container'
import { NeuralNetworkBackground } from '@/features/hero/NeuralNetworkBackground'

type SectionProps = {
  id: string
  title: string
  description?: string
  children: ReactNode
  className?: string
  /** Renders a faint, non-interactive neural-network canvas behind the section content. */
  background?: 'neural'
}

export function Section({ id, title, description, children, className, background }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative scroll-mt-20 overflow-hidden py-20 sm:py-28', className)}
    >
      {background === 'neural' ? (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <NeuralNetworkBackground intensity="ambient" />
        </div>
      ) : null}
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            id={`${id}-heading`}
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {description}
            </p>
          ) : null}
          <div className="mt-12">{children}</div>
        </motion.div>
      </Container>
    </section>
  )
}
