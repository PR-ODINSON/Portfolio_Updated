// Rotating 3D particle sphere — lightweight canvas render
import { useEffect, useRef } from 'react'

interface Props {
  color?: string
  count?: number
  radius?: number
  className?: string
  style?: React.CSSProperties
}

export default function ParticleSphere({
  color = 'rgba(34, 211, 238, 0.85)',
  count = 900,
  radius = 220,
  className,
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const points: { x: number; y: number; z: number }[] = []
    // Fibonacci sphere
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r })
    }

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let rotY = 0
    let rotX = 0.15
    let targetRotY = 0
    let targetRotX = 0.15

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      mouseRef.current = { x: nx, y: ny, active: true }
      targetRotY = nx * 0.6
      targetRotX = 0.15 + ny * 0.4
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2

      if (!reduced) rotY += 0.0025
      rotY += (targetRotY - rotY) * 0.04
      rotX += (targetRotX - rotX) * 0.04

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

      // sort by z for correct depth
      const rendered: { sx: number; sy: number; sz: number; size: number; alpha: number }[] = []
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        // rotate Y
        let x = p.x * cosY - p.z * sinY
        let z = p.x * sinY + p.z * cosY
        // rotate X
        const y = p.y * cosX - z * sinX
        z = p.y * sinX + z * cosX
        const perspective = 500 / (500 + z * radius)
        const sx = cx + x * radius * perspective
        const sy = cy + y * radius * perspective
        const size = perspective * 1.6
        const alpha = 0.15 + perspective * 0.85
        rendered.push({ sx, sy, sz: z, size, alpha })
      }
      rendered.sort((a, b) => a.sz - b.sz)
      for (const r of rendered) {
        ctx.globalAlpha = Math.max(0, Math.min(1, r.alpha))
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(r.sx, r.sy, r.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
  }, [color, count, radius])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}
