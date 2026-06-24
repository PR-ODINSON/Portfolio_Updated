import { useEffect, useState, useRef } from 'react'

const RESUME_URL = '/Prithviraj_CV.pdf'

// Animating EEG Waveform (preserved signature moment)
function AnimatingEegGraphic() {
  const [points, setPoints] = useState<string>('')
  const phase = useRef(0)

  useEffect(() => {
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) {
      setPoints("0,18 8,18 12,4 16,32 20,18 26,18 30,10 33,26 36,18 42,18 46,2 50,34 54,18 60,18 64,12 68,24 72,18 80,18 84,8 88,28 92,18 100,18 104,14 108,22 112,18 120,18")
      return
    }

    let frameId: number
    const count = 40
    const step = 120 / (count - 1)
    const update = () => {
      phase.current += 0.045
      const t = phase.current
      const newPoints = []
      for (let i = 0; i < count; i++) {
        const xCoord = i * step
        const pt = t + i * 0.26
        const noise = Math.sin(pt * 1.5) * 0.8 + Math.sin(pt * 5.0) * 0.3
        let kComplex = 0
        const kPeriod = 6.28
        const kTime = Math.abs(pt) % kPeriod
        if (kTime < 1.8) {
          kComplex = Math.sin(kTime * (Math.PI / 1.8)) * 12 * Math.sin(kTime * 5.5)
        }
        let spindle = 0
        const sPeriod = 6.28
        const sTime = Math.abs(pt + 3.14) % sPeriod
        if (sTime < 2.0) {
          const envelope = Math.sin(sTime * (Math.PI / 2.0))
          spindle = envelope * Math.sin(sTime * 22) * 4.0
        }
        const y = 18 + kComplex + spindle + noise
        newPoints.push(`${xCoord.toFixed(1)},${y.toFixed(1)}`)
      }
      setPoints(newPoints.join(' '))
      frameId = requestAnimationFrame(update)
    }
    frameId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 36"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '0.65em',
        height: '0.2em',
        margin: '0 0.04em',
        position: 'relative',
        top: '-0.06em',
        overflow: 'visible',
      }}
    >
      <polyline
        points={points || "0,18 120,18"}
        fill="none"
        stroke="#00B4A0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 3px rgba(0,180,160,0.6))' }}
      />
    </svg>
  )
}

// Stat Counter
function StatCounter({ value, duration = 750 }: { value: string; duration?: number }) {
  const [displayVal, setDisplayVal] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) { setDisplayVal(value); return }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const numMatch = value.match(/^([\d.]+)(.*)$/)
        if (!numMatch) { setDisplayVal(value); return }
        const target = parseFloat(numMatch[1])
        const suffix = numMatch[2]
        const startTime = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const easeProgress = progress * (2 - progress)
          const current = easeProgress * target
          if (Number.isInteger(target)) {
            setDisplayVal(Math.floor(current) + suffix)
          } else {
            setDisplayVal(current.toFixed(1) + suffix)
          }
          if (progress < 1) requestAnimationFrame(step)
          else setDisplayVal(value)
        }
        requestAnimationFrame(step)
        observer.unobserve(el)
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={ref}>{displayVal}</span>
}

// Magnetic hover hook
export function useMagnetic(enabled: boolean = true) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)
      const triggerArea = 100
      if (distance < triggerArea) {
        const factor = (triggerArea - distance) / triggerArea
        const pullX = Math.max(-6, Math.min(6, deltaX * 0.12 * factor))
        const pullY = Math.max(-6, Math.min(6, deltaY * 0.12 * factor))
        el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.03)`
        el.style.transition = 'transform 0.08s ease-out'
      } else {
        el.style.transform = ''
        el.style.transition = 'transform 0.3s ease-out'
      }
    }
    const onMouseLeave = () => {
      el.style.transform = ''
      el.style.transition = 'transform 0.3s ease-out'
    }
    window.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [enabled])
  return ref
}

// Stats — ordered by impact weight
const stats = [
  { value: '3',   label: 'IEEE Publications', primary: true  },
  { value: '2×',  label: 'Research Award',    primary: false },
  { value: '5+',  label: 'Production Deployments', primary: false },
  { value: '7+',  label: 'Internships',       primary: false, muted: true },
]

export default function Hero() {
  const researchRef = useMagnetic() as React.RefObject<HTMLAnchorElement>
  const resumeRef   = useMagnetic() as React.RefObject<HTMLAnchorElement>

  return (
    <section
      id="home"
      style={{
        background: 'var(--bg-dark)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ width: '100%', paddingTop: '160px' }}>

        {/* Eyebrow */}
        <div
          className="hero-stagger-1"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: 'var(--paper)' }}>PRITHVIRAJ VERMA</span>
          <span style={{ width: 12, height: 1, background: 'var(--line)', display: 'inline-block' }} />
          <span>AI/ML ENGINEER &amp; RESEARCHER · IITRAM</span>
        </div>

        {/* Giant headline */}
        <h1 className="hero-headline hero-stagger-2" style={{ margin: '0 0 1.5rem' }}>
          <span style={{ display: 'block' }}>
            <span className="accent-teal">Re</span><AnimatingEegGraphic /><span className="accent-teal">search</span> that
          </span>
          <span style={{ display: 'block' }}>
            runs in the real world.
          </span>
        </h1>

        {/* Positioning subline */}
        <p
          className="hero-stagger-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
            color: 'var(--muted-dark)',
            lineHeight: 1.65,
            maxWidth: 560,
            marginBottom: '3rem',
          }}
        >
          3 IEEE papers in biomedical AI. Production ML at Insolare &amp; Garnet AI. Pre-final year at IITRAM.
        </p>

        {/* Stats row — differential sizing */}
        <div
          className="hero-stagger-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid var(--line)',
            borderLeft: '1px solid var(--line)',
            marginBottom: '2.5rem',
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: '1.25rem 1rem',
                borderRight: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: s.primary
                    ? 'clamp(2.25rem, 5vw, 3.75rem)'
                    : s.muted
                      ? 'clamp(1.25rem, 2vw, 1.75rem)'
                      : 'clamp(1.5rem, 3vw, 2.25rem)',
                  letterSpacing: '-0.03em',
                  color: s.primary
                    ? 'var(--accent-research)'
                    : s.muted
                      ? 'var(--muted)'
                      : 'var(--paper)',
                  lineHeight: 1,
                }}
              >
                <StatCounter value={s.value} />
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: s.primary ? 'var(--accent-research)' : 'var(--muted)',
                  marginTop: '0.35rem',
                  opacity: s.muted ? 0.7 : 1,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          className="hero-stagger-5"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            ref={researchRef}
            href="#research"
            onClick={e => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '-0.01em',
              color: 'var(--bg-dark)',
              background: 'var(--accent-research)',
              padding: '0.75rem 1.75rem',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'opacity 0.2s, filter 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.filter = '')}
          >
            View Research →
          </a>
          <a
            ref={resumeRef}
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '-0.01em',
              color: 'var(--muted-dark)',
              background: 'none',
              padding: '0.75rem 0',
              textDecoration: 'none',
              borderBottom: '1px solid var(--line)',
            }}
          >
            Download CV ↗
          </a>
        </div>

      </div>
    </section>
  )
}