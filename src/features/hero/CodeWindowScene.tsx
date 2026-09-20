import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setReduced(query.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])
  return reduced
}

const CODE_LINES = [
  { width: 66, color: '#5eead4' },
  { width: 104, color: '#94a3b8' },
  { width: 46, color: '#f59e0b' },
  { width: 84, color: '#94a3b8' },
  { width: 98, color: '#5eead4' },
  { width: 34, color: '#64748b' },
]

const CHART_XS = [0, 14, 28, 42, 56, 70]
const CHART_YS = [26, 20, 22, 12, 15, 4]
const CHART_POINTS = CHART_XS.map((x, i) => `${x},${CHART_YS[i]}`).join(' ')

/**
 * Foreground hero scene: a floating code-editor / dashboard window — no
 * human figure. Pure SVG + framer-motion (already a project dependency),
 * themed via the site's CSS tokens so it stays legible in both light and
 * dark mode.
 */
export function CodeWindowScene() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    function handleMove(event: MouseEvent) {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const px = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width * 1.8)))
      const py = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height * 1.8)))
      setOffset({ x: px * 6, y: py * 6 })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [reducedMotion])

  return (
    <div ref={wrapRef} className="h-full w-full">
      <svg
        viewBox="0 0 400 260"
        role="img"
        aria-label="Ilustración de una ventana de editor de código junto a un panel de automatización con métricas"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="cw-glow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </radialGradient>
          <clipPath id="cw-window-clip">
            <rect x="30" y="20" width="340" height="200" rx="14" />
          </clipPath>
        </defs>

        <motion.g
          animate={{ x: offset.x, y: offset.y }}
          transition={{ type: 'spring', stiffness: 40, damping: 12 }}
        >
          <ellipse cx="200" cy="120" rx="180" ry="130" fill="url(#cw-glow)" />

          {/* soft ground shadow so the window reads as floating, not pasted on */}
          <ellipse cx="200" cy="234" rx="140" ry="12" fill="#0f172a" opacity="0.12" />

          <motion.g
            animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* window frame */}
            <rect x="30" y="20" width="340" height="200" rx="14" fill="var(--color-screen-bezel)" />

            <g clipPath="url(#cw-window-clip)">
              {/* title bar */}
              <circle cx="46" cy="33" r="4" fill="#f59e0b" />
              <circle
                cx="60"
                cy="33"
                r="4"
                className="text-slate-400 dark:text-slate-500"
                fill="currentColor"
              />
              <circle cx="74" cy="33" r="4" fill="#2dd4bf" />

              {/* screen */}
              <rect x="38" y="52" width="324" height="160" rx="6" fill="#060a14" />

              {/* code editor panel */}
              <g transform="translate(52 68)">
                {CODE_LINES.map((line, i) => (
                  <rect
                    key={i}
                    x="0"
                    y={i * 16}
                    width={line.width}
                    height="4.5"
                    rx="2.25"
                    fill={line.color}
                    opacity={0.85}
                  />
                ))}
                <motion.rect
                  x={CODE_LINES[CODE_LINES.length - 1].width + 6}
                  y={(CODE_LINES.length - 1) * 16}
                  width="2"
                  height="7.5"
                  fill="#e2e8f0"
                  animate={reducedMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </g>

              {/* dashboard / automation panel */}
              <g transform="translate(232 72)">
                <rect x="-6" y="-8" width="118" height="76" rx="8" fill="#0f172a" opacity="0.7" />
                <polyline
                  points={CHART_POINTS}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
                <motion.circle
                  r="4"
                  fill="#2dd4bf"
                  initial={{ cx: CHART_XS[0], cy: CHART_YS[0] }}
                  animate={
                    reducedMotion
                      ? undefined
                      : { cx: CHART_XS, cy: CHART_YS, opacity: [0.9, 1, 1, 1, 1, 0.9] }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  style={{ filter: 'drop-shadow(0 0 3px #2dd4bf)' }}
                />

                <rect x="0" y="38" width="80" height="20" rx="10" fill="#111827" />
                <motion.circle
                  cx="12"
                  cy="48"
                  r="4.5"
                  fill="#f59e0b"
                  animate={reducedMotion ? undefined : { opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.45, 0.5, 1],
                  }}
                />
                <motion.circle
                  cx="12"
                  cy="48"
                  r="4.5"
                  fill="#2dd4bf"
                  animate={reducedMotion ? undefined : { opacity: [0, 0, 1, 1] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, 0.45, 0.5, 1],
                  }}
                />
                {reducedMotion ? <circle cx="12" cy="48" r="4.5" fill="#2dd4bf" /> : null}
                <rect x="24" y="45" width="42" height="6" rx="3" fill="#334155" />
              </g>
            </g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  )
}
