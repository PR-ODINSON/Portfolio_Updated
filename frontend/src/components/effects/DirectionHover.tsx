// Direction hover — text slides accent copy in from top/bottom based on entry
import { useRef, useState, type CSSProperties } from 'react'

interface Props {
  title: string
  textColor?: string
  hoverColor?: string
  duration?: number
  fontSize?: number | string
  fontWeight?: number | string
  letterSpacing?: string
  className?: string
  style?: CSSProperties
}

export default function DirectionHover({
  title,
  textColor = '#F0EEE8',
  hoverColor = '#22d3ee',
  duration = 0.32,
  fontSize = 20,
  fontWeight = 700,
  letterSpacing = '-0.02em',
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [dir, setDir] = useState<'none' | 'top' | 'bottom'>('none')

  const size = typeof fontSize === 'string' ? parseFloat(fontSize) : fontSize
  const lineBox = size * 1.15
  const step = lineBox

  const onEnter = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const y = e.clientY - rect.top
    setDir(y < rect.height / 2 ? 'top' : 'bottom')
  }
  const onLeave = () => setDir('none')

  const yByDir: Record<string, number> = { none: -step, top: 0, bottom: -2 * step }
  const labelStyle: CSSProperties = {
    fontSize,
    fontWeight,
    letterSpacing,
    margin: 0,
    whiteSpace: 'nowrap',
    lineHeight: 1.15,
    height: lineBox,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        overflow: 'hidden',
        height: lineBox,
        display: 'inline-flex',
        position: 'relative',
        cursor: 'pointer',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${yByDir[dir]}px)`,
          transition: `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <span style={{ ...labelStyle, color: hoverColor }}>{title}</span>
        <span style={{ ...labelStyle, color: textColor }}>{title}</span>
        <span style={{ ...labelStyle, color: hoverColor }}>{title}</span>
      </div>
    </div>
  )
}
