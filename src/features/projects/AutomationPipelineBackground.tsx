import { useEffect, useRef } from 'react'

type Point = { x: number; y: number }

type CircuitPath = {
  points: Point[]
  segLengths: number[]
  totalLength: number
  speed: number
  isAccent: boolean
}

type Colors = {
  primary: string
  accent: string
}

// Circuit-board / pipeline motif: orthogonal traces with small "packets"
// flowing along them, meant to read as automated data/test flow rather than
// the organic neural-network dots used elsewhere.
const PATH_COUNT = 14
const SMALL_VIEWPORT_PATH_COUNT = 8
const SMALL_VIEWPORT_WIDTH = 640
const PACKET_SPEED_MIN = 50
const PACKET_SPEED_MAX = 90
const PACKET_RADIUS = 3.2
const LINE_WIDTH = 1.25
const ACCENT_RATIO = 0.25
const MARGIN = 32

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

function buildPath(width: number, height: number): CircuitPath {
  const minX = MARGIN
  const maxX = Math.max(minX + 1, width - MARGIN)
  const minY = MARGIN
  const maxY = Math.max(minY + 1, height - MARGIN)

  const p0 = { x: minX + Math.random() * (maxX - minX), y: minY + Math.random() * (maxY - minY) }
  const p1 = { x: minX + Math.random() * (maxX - minX), y: minY + Math.random() * (maxY - minY) }
  // One right-angle bend, like a simplified PCB trace — horizontal-then-vertical
  // or vertical-then-horizontal, picked at random for variety.
  const mid = Math.random() < 0.5 ? { x: p1.x, y: p0.y } : { x: p0.x, y: p1.y }
  const points = [p0, mid, p1]

  const segLengths: number[] = []
  let totalLength = 0
  for (let i = 0; i < points.length - 1; i += 1) {
    const dx = points[i + 1].x - points[i].x
    const dy = points[i + 1].y - points[i].y
    const length = Math.hypot(dx, dy)
    segLengths.push(length)
    totalLength += length
  }

  return {
    points,
    segLengths,
    totalLength: totalLength || 1,
    speed: PACKET_SPEED_MIN + Math.random() * (PACKET_SPEED_MAX - PACKET_SPEED_MIN),
    isAccent: Math.random() < ACCENT_RATIO,
  }
}

function pointAlongPath(path: CircuitPath, t: number): Point {
  const target = t * path.totalLength
  let covered = 0
  for (let i = 0; i < path.segLengths.length; i += 1) {
    const segLength = path.segLengths[i]
    const isLast = i === path.segLengths.length - 1
    if (target <= covered + segLength || isLast) {
      const segT = segLength === 0 ? 0 : (target - covered) / segLength
      const a = path.points[i]
      const b = path.points[i + 1]
      return { x: a.x + (b.x - a.x) * segT, y: a.y + (b.y - a.y) * segT }
    }
    covered += segLength
  }
  return path.points[path.points.length - 1]
}

/**
 * Decorative, non-interactive circuit/pipeline canvas — small glowing
 * "packets" travel along orthogonal traces, evoking an automated CI/test
 * pipeline. Used behind the automation project's case study instead of the
 * neural-network background, so the two projects don't share the same
 * visual motif.
 */
export function AutomationPipelineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    const parentEl = canvasEl?.parentElement
    if (!canvasEl || !parentEl) return undefined

    const ctx2d = canvasEl.getContext('2d')
    if (!ctx2d) return undefined

    const canvas = canvasEl
    const parent = parentEl
    const ctx = ctx2d

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let paths: CircuitPath[] = []
    let rafId: number | null = null
    let colors = readColors()
    let lastTime = 0

    function drawFrame(elapsedSeconds: number) {
      ctx.clearRect(0, 0, width, height)

      for (const path of paths) {
        const color = path.isAccent ? colors.accent : colors.primary
        ctx.strokeStyle = hexToRgba(color, 0.16)
        ctx.lineWidth = LINE_WIDTH
        ctx.beginPath()
        ctx.moveTo(path.points[0].x, path.points[0].y)
        for (let i = 1; i < path.points.length; i += 1) {
          ctx.lineTo(path.points[i].x, path.points[i].y)
        }
        ctx.stroke()

        const progress = reducedMotionQuery.matches
          ? 0.5
          : ((elapsedSeconds * path.speed) / path.totalLength) % 1
        const packet = pointAlongPath(path, progress)

        ctx.fillStyle = hexToRgba(color, 0.9)
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, PACKET_RADIUS, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = hexToRgba(color, 0.25)
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, PACKET_RADIUS * 2.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function animate(time: number) {
      drawFrame(time / 1000)
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
        drawFrame(0)
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

      const count = width < SMALL_VIEWPORT_WIDTH ? SMALL_VIEWPORT_PATH_COUNT : PATH_COUNT
      paths = Array.from({ length: count }, () => buildPath(width, height))

      if (rafId === null) {
        drawFrame(lastTime)
      }
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
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      colorObserver.disconnect()
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      data-testid="automation-pipeline-canvas"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
