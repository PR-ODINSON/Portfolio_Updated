// Character waves — animate each character with a wave-timing offset on scroll-into-view
import { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  waveDuration?: number
}

export default function CharacterWaves({ text, className, style, waveDuration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setPlay(true); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setPlay(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const chars = Array.from(text)
  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', ...style }} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: 'inline-block',
            transform: play ? 'translateY(0)' : 'translateY(0.5em)',
            opacity: play ? 1 : 0,
            transition: `transform ${waveDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 40}ms, opacity ${waveDuration}ms ease ${i * 40}ms`,
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}
