// Scramble reveal — decodes text with glitchy characters then locks in
import { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  duration?: number // total ms
  className?: string
  style?: React.CSSProperties
  trigger?: 'inView' | 'immediate'
  chars?: string
}

const DEFAULT_CHARS = '!@#$%^&*<>-_=+/\\|~?01'

export default function ScrambleText({
  text,
  duration = 1400,
  className,
  style,
  trigger = 'inView',
  chars = DEFAULT_CHARS,
}: Props) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(text)
      return
    }

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      const startTime = performance.now()
      const n = text.length
      const step = () => {
        const now = performance.now()
        const t = Math.min(1, (now - startTime) / duration)
        // Each character locks at threshold based on index
        let out = ''
        for (let i = 0; i < n; i++) {
          const charThreshold = (i / n) * 0.85
          if (t >= charThreshold + 0.15) {
            out += text[i]
          } else if (text[i] === ' ') {
            out += ' '
          } else {
            out += chars[Math.floor(Math.random() * chars.length)]
          }
        }
        setDisplay(out)
        if (t < 1) requestAnimationFrame(step)
        else setDisplay(text)
      }
      requestAnimationFrame(step)
    }

    if (trigger === 'immediate') {
      start()
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start()
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [text, duration, trigger, chars])

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {display}
    </span>
  )
}
