import { Hero } from '@/features/hero/Hero'
import { About } from '@/features/about/About'
import { SkillsSection } from '@/features/skills/SkillsSection'
import { ProjectsSection } from '@/features/projects/ProjectsSection'
import { Contact } from '@/features/contact/Contact'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <Contact />
    </>
  )
}
