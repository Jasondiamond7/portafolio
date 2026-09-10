import { Section } from '@/components/layout/Section'
import { ButtonLink } from '@/components/ui/Button'
import { profile } from '@/content/profile'

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      description="Open to Data Science, ML and AI roles, and to interesting freelance problems."
    >
      <div className="flex flex-wrap items-center gap-4">
        <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
        {profile.socials.map((social) => (
          <ButtonLink
            key={social.url}
            href={social.url}
            variant="secondary"
            target="_blank"
            rel="noreferrer"
          >
            {social.label}
          </ButtonLink>
        ))}
      </div>
    </Section>
  )
}
