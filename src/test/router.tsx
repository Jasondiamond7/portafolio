import type { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/app/router'

/** Renders a route-less component wrapped in an isolated in-memory router context. */
export function renderWithRouter(ui: ReactNode) {
  const router = createMemoryRouter([{ path: '*', element: <>{ui}</> }], { initialEntries: ['/'] })
  return render(<RouterProvider router={router} />)
}

/** Mounts the real app route tree at `path`, exercising production routing end to end. */
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}
