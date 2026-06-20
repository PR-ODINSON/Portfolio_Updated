import { useEffect, useState, useRef } from 'react'

const RESUME_URL = '/Prithviraj_CV.pdf'

// 1. Signature Moment (B) — Live Animating EEG Waveform
function AnimatingEegGraphic() {
  const [points, setPoints] = useState<string>('')
  const phase = useRef(0)

  useEffect(() => {
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) {
      // Fallback static points
      setPoints("0,18 8,18 12,4 16,32 20,18 26,18 30,10 33,26 36,18 42,18 46,2 50,34 54,18 60,18 64,12 68,24 72,18 80,18 84,8 88,28 92,18 100,18 104,14 108,22 112,18 120,18")
      return
    }

    let frameId: number
    const count = 40
    const step = 120 / (count - 1)
    const update = () => {
      // Increment phase to animate the wave from right to left
      phase.current += 0.045
      const t = phase.current

      const newPoints = []
      for (let i = 0; i < count; i++) {
        const xCoord = i * step
        // Sample points across a wider space domain so both features are visible on screen
        const pt = t + i * 0.26
        
        // 1. Baseline noise (alpha/theta + high frequency beta)
        const noise = Math.sin(pt * 1.5) * 0.8 + Math.sin(pt * 5.0) * 0.3
        
        // 2. K-Complex (biphasic wave, repeats periodically)
        let kComplex = 0
        const kPeriod = 6.28
        const kTime = Math.abs(pt) % kPeriod
        if (kTime < 1.8) {
          kComplex = Math.sin(kTime * (Math.PI / 1.8)) * 12 * Math.sin(kTime * 5.5)
        }
        
        // 3. Sleep Spindle (waxing/waning burst, offset from K-complex)
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
        width: '0.72em',
        height: '0.22em',
        margin: '0 0.04em',
        position: 'relative',
        top: '-0.08em',
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
        style={{
          filter: 'drop-shadow(0 0 3.5px rgba(34, 211, 238, 0.65))',
        }}
      />
    </svg>
  )
}

// 2. Stat Counter Component (A5)
function StatCounter({ value, duration = 750 }: { value: string; duration?: number }) {
  const [displayVal, setDisplayVal] = useState('0')
  const ref = useRef<HTMLParagraphElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) {
      setDisplayVal(value)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        
        const numMatch = value.match(/^([\d.]+)(.*)$/)
        if (!numMatch) {
          setDisplayVal(value)
          return
        }

        const target = parseFloat(numMatch[1])
        const suffix = numMatch[2]
        
        let start = 0
        const startTime = performance.now()

        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const easeProgress = progress * (2 - progress) // Ease-out quad
          const current = start + easeProgress * (target - start)
          
          if (Number.isInteger(target)) {
            setDisplayVal(Math.floor(current) + suffix)
          } else {
            setDisplayVal(current.toFixed(1) + suffix)
          }

          if (progress < 1) {
            requestAnimationFrame(step)
          } else {
            setDisplayVal(value)
          }
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

// 3. Magnetic Hover Hook (A1)
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
        // Cap movement delta pull to 6px, scale to 1.03x
        const pullX = deltaX * 0.12 * factor
        const pullY = deltaY * 0.12 * factor
        const clampedX = Math.max(-6, Math.min(6, pullX))
        const clampedY = Math.max(-6, Math.min(6, pullY))

        el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) scale(1.03)`
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

const stats = [
  { value: '3',   label: 'IEEE Papers'  },
  { value: '7+',  label: 'Internships'  },
  { value: '4+',  label: 'Products Built' },
  { value: '2×',  label: 'Research Award' },
]

export default function Hero() {
  const viewWorkRef = useMagnetic() as React.RefObject<HTMLAnchorElement>
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
        padding: '0 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ width: '100%', paddingTop: '7rem' }}>

        {/* Top row: status tag | bio sub-text */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Status tag */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted-dark)',
              border: '1px solid var(--line)',
              borderRadius: '999px',
              padding: '0.35rem 0.875rem',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4ade80',
                display: 'inline-block',
                boxShadow: '0 0 6px #4ade8090',
              }}
            />
            Available for Opportunities
          </span>

          {/* Bio sub-text — right side */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: 'var(--muted-dark)',
              maxWidth: 300,
              lineHeight: 1.65,
              textAlign: 'right',
            }}
            className="hidden lg:block"
          >
            Pre-final year at IITRAM · AI/ML Engineer &amp; IEEE Researcher ·
            Production ML systems from biomedical DL to LLM platforms.
          </p>
        </div>

        {/* Author Eyebrow */}
        <div
          className="reveal"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--paper)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <span>PRITHVIRAJ VERMA</span>
          <span style={{ width: 12, height: 1, background: 'var(--line)' }} className="hidden sm:inline-block" />
          <span style={{ color: 'var(--muted-dark)', fontWeight: 500 }} className="hidden sm:inline-block">AI/ML ENGINEER &amp; RESEARCHER</span>
        </div>

        {/* Giant headline */}
        <h1
          className="hero-headline reveal"
          style={{ margin: 0 }}
        >
          <span style={{ display: 'block' }}>BUILDING</span>
          <span style={{ display: 'block' }}>
            RE<AnimatingEegGraphic />SEARCH-
          </span>
          <span style={{ display: 'block', color: 'var(--muted-dark)' }}>GRADE ML.</span>
        </h1>

        {/* Stats bar */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            marginTop: '3rem',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '1.25rem 1rem',
                borderRight: i < stats.length - 1 ? '1px solid var(--line)' : 'none',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  letterSpacing: '-0.04em',
                  color: 'var(--paper)',
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
                  color: 'var(--muted-dark)',
                  marginTop: '0.35rem',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          className="reveal"
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            ref={viewWorkRef}
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              background: 'var(--paper)',
              padding: '0.75rem 1.75rem',
              borderRadius: '999px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            View Work ↓
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
            Download Resume ↗
          </a>
        </div>

      </div>
    </section>
  )
}