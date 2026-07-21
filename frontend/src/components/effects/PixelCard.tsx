// PixelCard — hover to sprinkle pixel-canvas fill that shimmers
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  colors?: string[]
  gap?: number
  pixelSize?: number
  speed?: number
  className?: string
  style?: CSSProperties
  radius?: number
}

class Pixel {
  x: number; y: number; color: string; speed: number; delay: number
  size = 0; sizeStep: number; minSize: number; maxSize: number; maxSizeInteger: number
  counter = 0; counterStep: number
  isIdle = false; isReverse = false; isShimmer = false

  constructor(x: number, y: number, color: string, speed: number, delay: number, maxPx: number, w: number, h: number) {
    this.x = x; this.y = y; this.color = color
    this.speed = (0.1 + Math.random() * 0.8) * speed
    const factor = maxPx / 2
    this.sizeStep = Math.random() * 0.4 * factor
    this.minSize = 0.5 * factor
    this.maxSizeInteger = maxPx
    this.maxSize = this.minSize + Math.random() * (maxPx - this.minSize)
    this.delay = delay
    this.counterStep = Math.random() * 4 + (w + h) * 0.01
  }

  appear(ctx: CanvasRenderingContext2D) {
    this.isIdle = false
    if (this.counter <= this.delay) { this.counter += this.counterStep; return }
    if (this.size >= this.maxSize) this.isShimmer = true
    if (this.isShimmer) this.shimmer(); else this.size += this.sizeStep
    this.draw(ctx)
  }
  disappear(ctx: CanvasRenderingContext2D) {
    this.isShimmer = false; this.counter = 0
    if (this.size <= 0) { this.isIdle = true; return }
    this.size -= 0.1
    this.draw(ctx)
  }
  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true
    else if (this.size <= this.minSize) this.isReverse = false
    if (this.isReverse) this.size -= this.speed
    else this.size += this.speed
  }
  draw(ctx: CanvasRenderingContext2D) {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
    ctx.fillStyle = this.color
    ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size)
  }
}

export default function PixelCard({
  children,
  colors = ['#22d3ee', '#67e8f9', '#0ea5e9'],
  gap = 6,
  pixelSize = 2,
  speed = 40,
  className,
  style,
  radius = 16,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const rafRef = useRef<number | null>(null)
  const [_, force] = useState(0)

  const init = () => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const w = wrap.clientWidth
    const h = wrap.clientHeight
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const step = Math.max(1, gap)
    const pxs: Pixel[] = []
    let idx = 0
    for (let x = 0; x < w; x += step) {
      for (let y = 0; y < h; y += step) {
        const color = colors[idx % colors.length]
        idx++
        const dx = x - w / 2
        const dy = y - h / 2
        const delay = Math.sqrt(dx * dx + dy * dy)
        pxs.push(new Pixel(x, y, color, speed * 0.002, delay, pixelSize, w, h))
      }
    }
    pixelsRef.current = pxs
    force((n) => n + 1)
  }

  useEffect(() => {
    init()
    const ro = new ResizeObserver(init)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => { ro.disconnect(); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gap, pixelSize, speed, colors.join(',')])

  const animate = (fn: 'appear' | 'disappear') => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !canvasRef.current) return
    const loop = () => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
      let allIdle = true
      for (const p of pixelsRef.current) {
        p[fn](ctx)
        if (!p.isIdle) allIdle = false
      }
      if (!allIdle) rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => animate('appear')}
      onMouseLeave={() => animate('disappear')}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        isolation: 'isolate',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.5,
          mixBlendMode: 'screen',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  )
}
