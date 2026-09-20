import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { profile } from '@/content/profile'
import { CodeWindowScene } from './CodeWindowScene'
import { NeuralNetworkBackground } from './NeuralNetworkBackground'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-136 items-center overflow-hidden py-20 sm:min-h-152 sm:py-28"
    >
      <NeuralNetworkBackground />
      <Container className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-sm text-primary">{profile.role}</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            {profile.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects">Ver proyectos</ButtonLink>
            <ButtonLink href={profile.resumeUrl} variant="secondary" download>
              Descargar CV
            </ButtonLink>
          </div>
        </div>
        <div aria-hidden="true" className="hidden shrink-0 lg:block lg:w-85 xl:w-95">
          <CodeWindowScene />
        </div>
      </Container>
    </section>
  )
}
