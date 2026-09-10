import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { profile } from '@/content/profile'

export function Hero() {
  return (
    <section id="top" className="py-20 sm:py-28">
      <Container>
        <p className="font-mono text-sm text-brand-600 dark:text-brand-300">{profile.role}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          {profile.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {profile.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#projects">View projects</ButtonLink>
          <ButtonLink href={profile.resumeUrl} variant="secondary" download>
            Download CV
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
