// Stardust — subtle particle field with parallax twinkle
import { useEffect, useRef } from 'react'

interface Props {
  count?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}

export default function StardustBackground({
  count = 140,
  color = 'rgba(240, 238, 232, 0.7)',
  className,
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let w = 0, h = 0

    type Star = { x: number; y: number; r: number; vy: number; phase: number; speed: number }
    let stars: Star[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vy: Math.random() * 0.15 + 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.008,
      }))
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        if (!reduced) {
          s.phase += s.speed
          s.y -= s.vy
          if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w }
        }
        const twinkle = 0.5 + 0.5 * Math.sin(s.phase)
        ctx.globalAlpha = 0.15 + twinkle * 0.75
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [count, color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}
