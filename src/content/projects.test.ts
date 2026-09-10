import { describe, expect, it } from 'vitest'
import { featuredProjects, findProject, projects } from './projects'

describe('projects content', () => {
  it('exposes only featured projects through featuredProjects', () => {
    expect(featuredProjects.length).toBeGreaterThan(0)
    expect(featuredProjects.every((project) => project.featured)).toBe(true)
  })

  it('finds a project by slug', () => {
    const slug = projects[0].slug
    expect(findProject(slug)?.slug).toBe(slug)
  })

  it('returns undefined for an unknown slug', () => {
    expect(findProject('does-not-exist')).toBeUndefined()
  })

  it('keeps slugs unique', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
