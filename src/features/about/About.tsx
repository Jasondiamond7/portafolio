import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { courses, degrees } from '@/content/certifications'
import { experience } from '@/content/experience'
import { profile } from '@/content/profile'

export function About() {
  return (
    <Section id="about" title="Sobre mí">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="relative h-40 w-40 shrink-0 sm:h-48 sm:w-48">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary/25 blur-2xl"
          />
          <img
            src="/images/perfiljason.jpeg"
            alt={`Foto de ${profile.name}`}
            className="relative h-full w-full rounded-full object-cover object-[center_22%] shadow-lg ring-4 ring-primary/40 ring-offset-4 ring-offset-white dark:ring-offset-slate-950"
          />
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          Construyo, automatizo y mejoro software. Más de 5 años de experiencia creando soluciones
          tecnológicas, desde la automatización de procesos y el análisis de datos hasta el
          desarrollo frontend y backend con IA. Hoy enfoco mi experiencia en automatización y
          calidad de software, explorando y desarrollando soluciones en Data Science, Machine
          Learning e IA. Mi enfoque combina tecnología, análisis y mejora continua para transformar
          procesos complejos en soluciones más eficientes, confiables e inteligentes.
        </p>
      </div>

      <div className="mt-16 space-y-16">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Experiencia laboral
          </h3>
          <ol className="mt-8 space-y-10 border-l-2 border-border pl-6">
            {experience.map((job, index) => (
              <motion.li
                key={`${job.company}-${job.startDate}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-7.25 top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-slate-950" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    {job.role}{' '}
                    <span className="text-slate-500 dark:text-slate-400">· {job.company}</span>
                  </h4>
                  <p className="font-mono text-sm whitespace-nowrap text-text-secondary">
                    {job.startDate} —{' '}
                    {job.endDate === 'Actualidad' ? (
                      <span className="font-medium text-primary">Actualidad</span>
                    ) : (
                      job.endDate
                    )}
                  </p>
                </div>
                {job.highlights.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                    {job.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Formación y diplomados
          </h3>
          <ul className="mt-8 space-y-4">
            {degrees.map((cert) => (
              <li
                key={`${cert.name}-${cert.year}`}
                className="flex flex-col gap-1 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{cert.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span>{cert.year}</span>
                  {cert.inProgress ? (
                    <span className="font-medium text-accent">En curso</span>
                  ) : cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Verificar
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Cursos y certificaciones
          </h3>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((cert) => (
              <li
                key={`${cert.name}-${cert.year}`}
                className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3.5 dark:border-slate-800"
              >
                <p className="line-clamp-2 text-sm font-medium text-slate-900 dark:text-white">
                  {cert.name}
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {cert.issuer} · {cert.year}
                  </span>
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Verificar
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
