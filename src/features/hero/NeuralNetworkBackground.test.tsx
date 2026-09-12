import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { NeuralNetworkBackground } from './NeuralNetworkBackground'

function createMatchMediaMock(matches: boolean) {
  return {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('NeuralNetworkBackground', () => {
  it('renders a canvas that never intercepts pointer events', () => {
    render(<NeuralNetworkBackground />)

    const canvas = screen.getByTestId('neural-network-canvas')
    expect(canvas.tagName).toBe('CANVAS')
    expect(canvas).toHaveClass('pointer-events-none')
  })

  it('cancels the animation frame and removes all listeners on unmount', () => {
    const mediaQueryList = createMatchMediaMock(false)
    vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQueryList as unknown as MediaQueryList)
    vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1)
    const cancelAnimationFrameSpy = vi
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => {})
    const resizeDisconnectSpy = vi.spyOn(ResizeObserver.prototype, 'disconnect')
    const mutationDisconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect')
    const removeEventListenerSpy = vi.spyOn(Element.prototype, 'removeEventListener')

    const { unmount } = render(<NeuralNetworkBackground />)
    unmount()

    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
    expect(resizeDisconnectSpy).toHaveBeenCalled()
    expect(mutationDisconnectSpy).toHaveBeenCalled()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function))
    expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('does not start a continuous animation loop when reduced motion is preferred', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      createMatchMediaMock(true) as unknown as MediaQueryList,
    )
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame')

    render(<NeuralNetworkBackground />)

    expect(rafSpy).not.toHaveBeenCalled()
  })
})
