// Global spotlight that follows the mouse — soft radial glow overlay
import { useEffect, useRef } from 'react'

interface Props {
  color?: string
  size?: number
  className?: string
}

export default function MouseSpotlight({
  color = 'rgba(34, 211, 238, 0.10)',
  size = 500,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x, ty = y
    let raf: number

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const tick = () => {
      x += (tx - x) * 0.15
      y += (ty - y) * 0.15
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [size])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        background: `radial-gradient(circle at center, ${color}, transparent 65%)`,
        filter: 'blur(0px)',
        mixBlendMode: 'screen',
        willChange: 'transform',
        zIndex: 2,
      }}
    />
  )
}
