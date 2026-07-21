// Shiny pill — text with a sweeping shine highlight
import { useEffect, type CSSProperties, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  textColor?: string
  shineColor?: string
  speed?: number
  className?: string
  style?: CSSProperties
}

const KEYFRAMES_ID = 'shiny-pill-keyframes'

export default function ShinyPill({
  children,
  textColor = '#F0EEE8',
  shineColor = 'rgba(34, 211, 238, 1)',
  speed = 2.5,
  className,
  style,
}: Props) {
  useEffect(() => {
    if (document.getElementById(KEYFRAMES_ID)) return
    const s = document.createElement('style')
    s.id = KEYFRAMES_ID
    s.textContent = `@keyframes shinyPillSweep { 0% { -webkit-mask-position: 150% 50%; mask-position: 150% 50%; } 100% { -webkit-mask-position: -50% 50%; mask-position: -50% 50%; } }`
    document.head.appendChild(s)
  }, [])

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        color: textColor,
        ...style,
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: shineColor,
          pointerEvents: 'none',
          WebkitMaskImage: 'linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)',
          maskImage: 'linear-gradient(to right, transparent 30%, #000 50%, transparent 70%)',
          WebkitMaskSize: '250% 100%',
          maskSize: '250% 100%',
          animation: `shinyPillSweep ${speed}s ease-in-out infinite`,
        }}
      >
        {children}
      </span>
    </span>
  )
}
