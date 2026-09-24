import type { ComponentType, SVGProps } from 'react'
import { Section } from '@/components/layout/Section'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'
import { ContactForm } from './ContactForm'

const socialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
}

const channels = profile.socials.map((social) => ({
  label: social.label,
  value: social.url.replace(/^https?:\/\//, ''),
  href: social.url,
  Icon: socialIcons[social.label] ?? GitHubIcon,
}))

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contacto"
      description="Abierto a roles de Data Science, ML e IA, y a proyectos freelance que combinen automatización y datos."
      className="bg-slate-50 dark:bg-slate-900/40"
      background="neural"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex h-full flex-col gap-8 rounded-xl border border-slate-200 p-6 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Disponible para nuevas oportunidades
            </p>
            <span className="text-sm text-text-secondary">· {profile.location}</span>
          </div>

          <div className="space-y-2">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-lg p-3 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <channel.Icon className="h-5 w-5 fill-current" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                    {channel.label}
                  </span>
                  <span className="block truncate text-sm text-slate-600 dark:text-slate-400">
                    {channel.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
