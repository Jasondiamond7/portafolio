import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'

export function NotFoundPage() {
  return (
    <Container className="py-32 text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">404</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">This page does not exist.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Back home
      </Link>
    </Container>
  )
}
