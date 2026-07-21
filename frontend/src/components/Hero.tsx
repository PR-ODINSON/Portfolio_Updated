import { useEffect, useState, useRef } from 'react'
import ReactiveGrid from './effects/ReactiveGrid'
import ParticleSphere from './effects/ParticleSphere'
import ScrambleText from './effects/ScrambleText'
import MouseSpotlight from './effects/MouseSpotlight'

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
        stroke="#22d3ee"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
      />
    </svg>
  )
}

// Stat Counter
function StatCounter({ value, duration = 1400 }: { value: string; duration?: number }) {
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
          const easeProgress = 1 - Math.pow(1 - progress, 3)
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

// Magnetic hover hook — smooth spring pull toward cursor when close
export function useMagnetic(strength: number = 0.35) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) return

    let currentX = 0, currentY = 0
    let targetX = 0, targetY = 0
    let raf: number | null = null

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)
      const triggerArea = 140
      if (distance < triggerArea) {
        targetX = deltaX * strength
        targetY = deltaY * strength
      } else {
        targetX = 0
        targetY = 0
      }
    }
    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const onLeave = () => { targetX = 0; targetY = 0 }
    window.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength])
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
      {/* Reactive Grid backdrop */}
      <ReactiveGrid
        particleColor="rgba(34, 211, 238, 0.42)"
        maxSize={3.2}
        minSize={0.5}
        gap={26}
        influence={240}
      />

      {/* Particle Sphere behind hero content — right side */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(680px, 60vw)',
          height: 'min(680px, 60vw)',
          opacity: 0.55,
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(0.3px)',
        }}
      >
        <ParticleSphere color="rgba(34, 211, 238, 0.7)" count={780} radius={200} />
      </div>

      {/* Global mouse spotlight glow */}
      <MouseSpotlight color="rgba(34, 211, 238, 0.12)" size={620} />

      {/* Gradient vignette to keep text legible */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 600px at 20% 40%, rgba(5,7,15,0) 0%, rgba(5,7,15,0.6) 60%, rgba(5,7,15,0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="section-container" style={{ width: '100%', paddingTop: '160px', position: 'relative', zIndex: 3 }}>

        {/* Eyebrow */}
        <div
          className="hero-stagger-1"
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(240, 238, 232, 0.55)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3rem 0.7rem',
              border: '1px solid rgba(34,211,238,0.25)',
              background: 'rgba(34,211,238,0.06)',
              color: '#22d3ee',
              borderRadius: 999,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 10px rgba(34,211,238,0.8)' }} />
            AI/ML ENGINEER · IITRAM
          </span>
          <span style={{ width: 12, height: 1, background: 'var(--line)', display: 'inline-block' }} />
          <span>PRITHVIRAJ VERMA</span>
        </div>

        {/* Giant headline — Bright base text with subtle spotlight follow */}
        <h1 className="hero-headline hero-stagger-2" style={{ margin: '0 0 1.5rem', position: 'relative' }}>
          <span style={{ display: 'block' }}>
            <span className="accent-teal" style={{ color: '#22d3ee' }}>Re</span>
            <AnimatingEegGraphic />
            <span className="accent-teal" style={{ color: '#22d3ee' }}>search</span>{' '}
            <span style={{ color: '#F0EEE8' }}>that</span>
          </span>
          <span style={{ display: 'block', color: '#F0EEE8' }}>
            runs in the real world.
          </span>
        </h1>

        {/* Subtitle: scramble text */}
        <p
          className="hero-stagger-3"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
            color: 'var(--muted-dark)',
            lineHeight: 1.65,
            maxWidth: 620,
            marginBottom: '3rem',
          }}
        >
          <ScrambleText
            text="3 IEEE papers in biomedical AI. Production ML at Insolare & Garnet AI. Pre-final year at IITRAM."
            duration={1600}
            trigger="immediate"
          />
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
            background: 'rgba(13, 15, 26, 0.4)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
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
                    ? '#22d3ee'
                    : s.muted
                      ? 'var(--muted)'
                      : 'var(--paper)',
                  lineHeight: 1,
                  textShadow: s.primary ? '0 0 30px rgba(34,211,238,0.35)' : 'none',
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
                  color: s.primary ? '#22d3ee' : 'var(--muted)',
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
            data-testid="hero-view-research-btn"
            href="#research"
            onClick={e => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.9375rem',
              letterSpacing: '-0.01em',
              color: 'var(--bg-dark)',
              background: 'linear-gradient(90deg, #22d3ee 0%, #67e8f9 100%)',
              padding: '0.85rem 1.9rem',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'box-shadow 0.25s ease, filter 0.25s ease',
              boxShadow: '0 8px 30px rgba(34,211,238,0.25), inset 0 0 0 1px rgba(255,255,255,0.15)',
              willChange: 'transform',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 14px 40px rgba(34,211,238,0.45), inset 0 0 0 1px rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,211,238,0.25), inset 0 0 0 1px rgba(255,255,255,0.15)')}
          >
            View Research
            <span aria-hidden style={{ display: 'inline-block', transition: 'transform 0.25s' }}>→</span>
          </a>
          <a
            ref={resumeRef}
            data-testid="hero-download-cv-btn"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.9375rem',
              letterSpacing: '-0.01em',
              color: 'var(--paper)',
              background: 'rgba(240,238,232,0.04)',
              padding: '0.85rem 1.75rem',
              borderRadius: 999,
              textDecoration: 'none',
              border: '1px solid rgba(240,238,232,0.14)',
              backdropFilter: 'blur(6px)',
              transition: 'background 0.2s, border-color 0.2s',
              willChange: 'transform',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,238,232,0.08)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(240,238,232,0.04)'; e.currentTarget.style.borderColor = 'rgba(240,238,232,0.14)' }}
          >
            Download CV ↗
          </a>
        </div>

      </div>
    </section>
  )
}
