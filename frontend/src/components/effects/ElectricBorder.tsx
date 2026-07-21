// Electric border — canvas-drawn animated glowing border over rounded rect
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  color?: string
  glowColor?: string
  speed?: number
  chaos?: number
  thickness?: number
  radius?: number
  glowIntensity?: number
  className?: string
  style?: CSSProperties
  activeOnHover?: boolean
}

function random(x: number) { return (Math.sin(x * 12.9898) * 43758.5453) % 1 }
function noise2D(x: number, y: number) {
  const i = Math.floor(x), j = Math.floor(y)
  const fx = x - i, fy = y - j
  const a = random(i + j * 57)
  const b = random(i + 1 + j * 57)
  const c = random(i + (j + 1) * 57)
  const d = random(i + 1 + (j + 1) * 57)
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
}
function octaved(x: number, time: number, seed: number, amp: number) {
  let y = 0
  let a = amp, f = 10
  for (let i = 0; i < 8; i++) {
    y += a * noise2D(f * x + seed * 100, time * f * 0.3)
    f *= 1.6; a *= 0.7
  }
  return y
}
function roundedPoint(t: number, l: number, tp: number, w: number, h: number, r: number) {
  const sw = w - 2 * r, sh = h - 2 * r, arc = (Math.PI * r) / 2
  const total = 2 * sw + 2 * sh + 4 * arc
  const d = t * total
  let acc = 0
  if (d <= acc + sw) { const p = (d - acc) / sw; return { x: l + r + p * sw, y: tp } }
  acc += sw
  if (d <= acc + arc) { const p = (d - acc) / arc; const a = -Math.PI / 2 + p * (Math.PI / 2); return { x: l + w - r + r * Math.cos(a), y: tp + r + r * Math.sin(a) } }
  acc += arc
  if (d <= acc + sh) { const p = (d - acc) / sh; return { x: l + w, y: tp + r + p * sh } }
  acc += sh
  if (d <= acc + arc) { const p = (d - acc) / arc; const a = 0 + p * (Math.PI / 2); return { x: l + w - r + r * Math.cos(a), y: tp + h - r + r * Math.sin(a) } }
  acc += arc
  if (d <= acc + sw) { const p = (d - acc) / sw; return { x: l + w - r - p * sw, y: tp + h } }
  acc += sw
  if (d <= acc + arc) { const p = (d - acc) / arc; const a = Math.PI / 2 + p * (Math.PI / 2); return { x: l + r + r * Math.cos(a), y: tp + h - r + r * Math.sin(a) } }
  acc += arc
  if (d <= acc + sh) { const p = (d - acc) / sh; return { x: l, y: tp + h - r - p * sh } }
  acc += sh
  const p = (d - acc) / arc; const a = Math.PI + p * (Math.PI / 2)
  return { x: l + r + r * Math.cos(a), y: tp + r + r * Math.sin(a) }
}

export default function ElectricBorder({
  children,
  color = '#22d3ee',
  glowColor = '#22d3ee',
  speed = 1,
  chaos = 3,
  thickness = 1.5,
  radius = 14,
  glowIntensity = 4,
  className,
  style,
  activeOnHover = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const lastRef = useRef(0)
  const activeRef = useRef(!activeOnHover)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const amp = chaos / 20
    const displacement = 30
    const glow = 6 + glowIntensity * 2
    const glowPasses = glowIntensity
    const PAD = 40
    let w = 0, h = 0

    const setSize = () => {
      const rect = wrap.getBoundingClientRect()
      w = Math.max(1, rect.width); h = Math.max(1, rect.height)
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const cw = w + PAD * 2, ch = h + PAD * 2
      canvas.width = Math.floor(cw * dpr); canvas.height = Math.floor(ch * dpr)
      canvas.style.width = `${cw}px`; canvas.style.height = `${ch}px`
      canvas.style.left = `${-PAD}px`; canvas.style.top = `${-PAD}px`
    }
    setSize()

    const draw = (t: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      if (!lastRef.current) lastRef.current = t
      const dt = (t - lastRef.current) / 1000
      lastRef.current = t
      if (activeRef.current && !reduced) timeRef.current += dt * speed
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.scale(dpr, dpr)
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'

      const left = PAD, top = PAD
      const rr = Math.min(radius, Math.min(w, h) / 2)
      const perim = 2 * (w + h) + 2 * Math.PI * rr
      const samples = Math.max(24, Math.floor(perim / 3))

      ctx.beginPath()
      for (let i = 0; i <= samples; i++) {
        const tt = i / samples
        const pt = roundedPoint(tt, left, top, w, h, rr)
        const xn = octaved(tt * 8, timeRef.current, 0, amp)
        const yn = octaved(tt * 8, timeRef.current, 1, amp)
        const dx = pt.x + xn * displacement
        const dy = pt.y + yn * displacement
        if (i === 0) ctx.moveTo(dx, dy); else ctx.lineTo(dx, dy)
      }
      ctx.closePath()
      if (glow > 0) {
        ctx.lineWidth = 1
        ctx.strokeStyle = glowColor
        ctx.shadowColor = glowColor
        ctx.shadowBlur = glow
        for (let p = 0; p < glowPasses; p++) ctx.stroke()
        ctx.shadowBlur = 0
      }
      ctx.lineWidth = thickness
      ctx.strokeStyle = color
      ctx.stroke()
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    const ro = new ResizeObserver(setSize)
    ro.observe(wrap)

    const onEnter = () => { activeRef.current = true }
    const onLeave = () => { if (activeOnHover) activeRef.current = false }
    if (activeOnHover) {
      wrap.addEventListener('mouseenter', onEnter)
      wrap.addEventListener('mouseleave', onLeave)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [color, glowColor, speed, chaos, thickness, radius, glowIntensity, activeOnHover])

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative', borderRadius: radius, ...style }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  )
}
