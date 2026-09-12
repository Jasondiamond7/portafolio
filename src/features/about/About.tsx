import { Section } from '@/components/layout/Section'
import { certifications } from '@/content/certifications'

export function About() {
  return (
    <Section
      id="about"
      title="About"
      description="Postgraduate diploma in Data Science, plus focused certifications in ML and AI."
    >
      <ul className="space-y-4">
        {certifications.map((cert) => (
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
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Verify
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
