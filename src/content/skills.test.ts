import { describe, expect, it } from 'vitest'
import { skills } from './skills'

describe('skills content', () => {
  it('is not empty', () => {
    expect(skills.length).toBeGreaterThan(0)
  })

  it('has no duplicate skill names', () => {
    const names = skills.map((skill) => skill.name)
    expect(new Set(names).size).toBe(names.length)
  })
})
