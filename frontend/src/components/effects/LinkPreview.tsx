// LinkPreview — hover to show a live microlink.io screenshot of the destination
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  width?: number
  height?: number
  offset?: number
  className?: string
  style?: CSSProperties
  label?: string
}

// Cache resolved microlink images per URL so we don't refetch on every hover
const cache = new Map<string, string | null>()

async function fetchMicrolinkImage(url: string): Promise<string | null> {
  if (cache.has(url)) return cache.get(url)!
  try {
    const api = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
    // Redirect returns the image binary directly; browser handles it fine.
    // We just use the api URL as the img src — microlink follows the redirect.
    cache.set(url, api)
    return api
  } catch {
    cache.set(url, null)
    return null
  }
}

export default function LinkPreview({
  href,
  children,
  width = 320,
  height = 200,
  offset = 10,
  className,
  style,
  label,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!hovered) return
    let cancelled = false
    fetchMicrolinkImage(href).then((src) => { if (!cancelled) setImgSrc(src) })
    return () => { cancelled = true }
  }, [hovered, href])

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const previewStyle: CSSProperties = {
    position: 'absolute',
    top: pos.y + offset,
    left: Math.max(0, pos.x - width / 2),
    width,
    height,
    background: 'rgba(11, 13, 24, 0.96)',
    border: '1px solid rgba(34, 211, 238, 0.3)',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,211,238,0.15)',
    backdropFilter: 'blur(12px)',
    zIndex: 40,
    pointerEvents: 'none',
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateY(0)' : 'translateY(-4px)',
    transition: 'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setLoaded(false) }}
      onMouseMove={onMove}
    >
      {children}
      {hovered && (
        <span role="tooltip" style={previewStyle}>
          {label && (
            <span
              style={{
                position: 'absolute',
                top: 8,
                left: 10,
                zIndex: 2,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
                color: '#22d3ee',
                padding: '2px 8px',
                background: 'rgba(5, 7, 15, 0.75)',
                borderRadius: 999,
                border: '1px solid rgba(34,211,238,0.35)',
              }}
            >
              {label}
            </span>
          )}
          {!loaded && (
            <span
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(120deg, rgba(34,211,238,0.06), rgba(34,211,238,0.14), rgba(34,211,238,0.06))',
                backgroundSize: '200% 100%',
                animation: 'linkPreviewShimmer 1.4s linear infinite',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'rgba(240,238,232,0.55)',
                letterSpacing: '0.06em',
              }}
            >
              Loading preview…
            </span>
          )}
          {imgSrc && (
            <img
              src={imgSrc}
              alt=""
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.35s',
              }}
            />
          )}
        </span>
      )}
    </span>
  )
}
