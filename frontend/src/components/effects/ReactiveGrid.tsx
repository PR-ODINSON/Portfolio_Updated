// Reactive proximity grid — canvas-based, GPU-friendly
import { useEffect, useRef, type CSSProperties } from 'react'

interface Props {
  particleColor?: string
  backgroundColor?: string
  maxSize?: number
  minSize?: number
  gap?: number
  influence?: number
  style?: CSSProperties
  className?: string
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export default function ReactiveGrid({
  particleColor = 'rgba(34, 211, 238, 0.55)',
  backgroundColor = 'transparent',
  maxSize = 3.5,
  minSize = 0.6,
  gap = 22,
  influence = 220,
  style,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const currentRef = useRef<Float32Array>(new Float32Array(0))

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const syncSize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const s = sizeRef.current
      if (s.w === w && s.h === h && s.dpr === dpr) return
      sizeRef.current = { w, h, dpr }
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      syncSize()
      const { w, h } = sizeRef.current
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, w, h)
      }

      const cell = Math.max(1, maxSize + gap)
      const cols = Math.max(1, Math.floor(w / cell))
      const rows = Math.max(1, Math.floor(h / cell))
      const offX = (w - cols * cell) / 2 + cell / 2
      const offY = (h - rows * cell) / 2 + cell / 2
      const count = cols * rows
      if (currentRef.current.length !== count) currentRef.current = new Float32Array(count).fill(minSize)
      const sizes = currentRef.current

      ctx.fillStyle = particleColor
      const radius = Math.max(1, influence)
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i
          const cx = offX + i * cell
          const cy = offY + j * cell
          let infl = 0
          if (mouse) {
            const dx = mouse.x - cx
            const dy = mouse.y - cy
            const dist = Math.sqrt(dx * dx + dy * dy)
            infl = clamp(1 - dist / radius, 0, 1)
          }
          const target = lerp(minSize, maxSize, infl)
          const cur = lerp(sizes[idx] || minSize, target, 0.18)
          sizes[idx] = cur
          if (cur <= 0.2) continue
          ctx.beginPath()
          ctx.arc(cx, cy, cur, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = null }

    // Listen on window so grid reacts even when overlaid by children
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)

    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(container)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [particleColor, backgroundColor, maxSize, minSize, gap, influence])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...style }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
