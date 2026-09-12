import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

// Recharts' ResponsiveContainer relies on ResizeObserver, which jsdom lacks.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverStub)

// matchMedia is used by the theme provider.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})

// jsdom doesn't implement the canvas 2D context. NeuralNetworkBackground (and
// anything else that mounts a <canvas>) needs at least a no-op mock so
// `getContext('2d')` doesn't return null and drawing calls don't throw.
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: vi.fn(() => {
    const context: Record<string, unknown> = {}
    return new Proxy(context, {
      get(target, prop) {
        if (prop in target) return target[prop as string]
        return vi.fn()
      },
      set(target, prop, value) {
        target[prop as string] = value
        return true
      },
    })
  }),
})
