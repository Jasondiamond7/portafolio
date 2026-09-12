import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { profile } from '@/content/profile'
import { NeuralNetworkBackground } from './NeuralNetworkBackground'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden py-20 sm:py-28">
      <NeuralNetworkBackground />
      <Container className="relative z-10">
        <p className="font-mono text-sm text-primary">{profile.role}</p>
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
