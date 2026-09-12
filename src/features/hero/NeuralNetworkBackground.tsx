import { useEffect, useRef } from 'react'

type NetworkNode = {
  x: number
  y: number
  vx: number
  vy: number
  isAccent: boolean
  glow: number
}

type Colors = {
  primary: string
  accent: string
}

const BASE_NODE_COUNT = 55
const SMALL_VIEWPORT_NODE_COUNT = 28
const SMALL_VIEWPORT_WIDTH = 640
const CONNECTION_DISTANCE = 140
const MOUSE_RADIUS = 160
const ACCENT_RATIO = 0.12
const GLOW_EASE = 0.08
const DRIFT_SPEED = 0.3

const FALLBACK_PRIMARY = '#0f766e'
const FALLBACK_ACCENT = '#f59e0b'

function readColors(): Colors {
  const styles = getComputedStyle(document.documentElement)
  const primary = styles.getPropertyValue('--color-primary').trim()
  const accent = styles.getPropertyValue('--color-accent').trim()
  return {
    primary: primary || FALLBACK_PRIMARY,
    accent: accent || FALLBACK_ACCENT,
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((char) => char + char)
          .join('')
      : clean
  const value = Number.parseInt(full, 16)
  if (Number.isNaN(value) || full.length !== 6) {
    return `rgba(15, 118, 110, ${alpha})`
  }
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createNodes(width: number, height: number): NetworkNode[] {
  const count = width < SMALL_VIEWPORT_WIDTH ? SMALL_VIEWPORT_NODE_COUNT : BASE_NODE_COUNT
  const nodes: NetworkNode[] = []
  for (let i = 0; i < count; i += 1) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
      isAccent: Math.random() < ACCENT_RATIO,
      glow: 0,
    })
  }
  return nodes
}

/**
 * Decorative, mouse-reactive neural-network canvas rendered behind the Hero
 * content. Purely visual: it is `pointer-events-none` so it never intercepts
 * clicks or text selection meant for the real content stacked above it.
 */
export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    const parentEl = canvasEl?.parentElement
    if (!canvasEl || !parentEl) return undefined

    const ctx2d = canvasEl.getContext('2d')
    if (!ctx2d) return undefined

    // Rebind to non-nullable names: TypeScript narrows `const` after a guard
    // for the enclosing scope, but nested function declarations below close
    // over these bindings, so we keep dedicated non-null aliases for them.
    const canvas = canvasEl
    const parent = parentEl
    const ctx = ctx2d

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let nodes: NetworkNode[] = []
    let mouseX = -Infinity
    let mouseY = -Infinity
    let rafId: number | null = null
    let colors = readColors()

    function drawFrame() {
      ctx.clearRect(0, 0, width, height)

      for (const node of nodes) {
        const dx = node.x - mouseX
        const dy = node.y - mouseY
        const distance = Math.hypot(dx, dy)
        const target = distance < MOUSE_RADIUS ? 1 - distance / MOUSE_RADIUS : 0
        node.glow += (target - node.glow) * GLOW_EASE
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance >= CONNECTION_DISTANCE) continue

          const proximityGlow = Math.max(a.glow, b.glow)
          const baseOpacity = (1 - distance / CONNECTION_DISTANCE) * 0.5
          const opacity = Math.min(1, baseOpacity + proximityGlow * 0.4)
          const useAccent = a.isAccent && b.isAccent

          ctx.strokeStyle = hexToRgba(useAccent ? colors.accent : colors.primary, opacity)
          ctx.lineWidth = 0.6 + proximityGlow * 1.4
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const node of nodes) {
        const radius = 1.8 + node.glow * 2.2
        const opacity = 0.6 + node.glow * 0.4
        ctx.fillStyle = hexToRgba(node.isAccent ? colors.accent : colors.primary, opacity)
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function updatePositions() {
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0) {
          node.x = 0
          node.vx *= -1
        } else if (node.x > width) {
          node.x = width
          node.vx *= -1
        }
        if (node.y < 0) {
          node.y = 0
          node.vy *= -1
        } else if (node.y > height) {
          node.y = height
          node.vy *= -1
        }
      }
    }

    function animate() {
      updatePositions()
      drawFrame()
      rafId = requestAnimationFrame(animate)
    }

    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    function start() {
      if (rafId !== null) return
      if (reducedMotionQuery.matches) {
        drawFrame()
      } else {
        rafId = requestAnimationFrame(animate)
      }
    }

    function resize() {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = createNodes(width, height)
      // Redraw immediately when there is no active rAF loop (initial mount,
      // or a resize while reduced-motion keeps the canvas static) so the
      // canvas never shows a stale frame after a layout change.
      if (rafId === null) {
        drawFrame()
      }
    }

    function handleMouseMove(event: MouseEvent) {
      const rect = parent.getBoundingClientRect()
      mouseX = event.clientX - rect.left
      mouseY = event.clientY - rect.top
    }

    function handleMouseLeave() {
      mouseX = -Infinity
      mouseY = -Infinity
    }

    function handleReducedMotionChange() {
      stop()
      start()
    }

    const colorObserver = new MutationObserver(() => {
      colors = readColors()
    })
    colorObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(parent)

    resize()
    parent.addEventListener('mousemove', handleMouseMove)
    parent.addEventListener('mouseleave', handleMouseLeave)
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      colorObserver.disconnect()
      parent.removeEventListener('mousemove', handleMouseMove)
      parent.removeEventListener('mouseleave', handleMouseLeave)
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-testid="neural-network-canvas"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
