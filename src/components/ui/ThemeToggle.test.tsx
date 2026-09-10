import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  )
}

describe('ThemeToggle', () => {
  it('starts in light mode and switches the root class on click', async () => {
    const user = userEvent.setup()
    renderToggle()

    expect(document.documentElement).not.toHaveClass('dark')
    const button = screen.getByRole('button', { name: /dark theme/i })

    await user.click(button)

    expect(document.documentElement).toHaveClass('dark')
    expect(screen.getByRole('button', { name: /light theme/i })).toBeInTheDocument()
  })
})
