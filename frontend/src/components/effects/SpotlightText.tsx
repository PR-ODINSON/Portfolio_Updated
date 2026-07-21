// Spotlight text — dim base, bright reveal via cursor-following radial mask
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  brightColor?: string
  dimColor?: string
  maskSize?: number
  className?: string
  style?: CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

export default function SpotlightText({
  children,
  brightColor = '#F0EEE8',
  dimColor = 'rgba(240, 238, 232, 0.32)',
  maskSize = 260,
  className,
  style,
  as = 'span',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true })
    }
    const onLeave = () => setPos((p) => ({ ...p, on: false }))
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const Tag = as as any
  const mask = pos.on
    ? `radial-gradient(circle ${maskSize}px at ${pos.x}px ${pos.y}px, #000 0%, #000 40%, transparent 100%)`
    : 'radial-gradient(circle 0px at 50% 50%, #000 0%, transparent 100%)'

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      <Tag style={{ color: dimColor, transition: 'color 0.3s' }}>{children}</Tag>
      <Tag
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          color: brightColor,
          WebkitMaskImage: mask,
          maskImage: mask,
          pointerEvents: 'none',
          transition: 'mask-image 0.15s linear, -webkit-mask-image 0.15s linear',
        }}
      >
        {children}
      </Tag>
    </div>
  )
}
