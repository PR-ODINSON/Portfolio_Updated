// Achievements.tsx — Electric Border on flagship cards, counter animations,
// hover elevation, dark AI portfolio treatment.

import { useEffect, useRef, useState } from 'react'
import ElectricBorder from './effects/ElectricBorder'

type Ach = { label: string; sub: string; year: string; accent?: boolean; count?: { target: number; suffix?: string } }

const achievements: Ach[] = [
  {
    label: 'Undergraduate Research Award × 2',
    sub: 'Awarded twice by IITRAM for outstanding AI/ML research contributions and 3 IEEE publications.',
    year: '2024 & 2025',
    accent: true,
    count: { target: 2, suffix: '×' },
  },
  {
    label: 'IEEE Publications as Undergrad',
    sub: 'First pre-final year student in cohort to publish 3 peer-reviewed papers in IEEE Access and IEEE AIMV.',
    year: '2025',
    accent: true,
    count: { target: 3, suffix: '' },
  },
  {
    label: '1st Runner-Up — IIT Bombay (Smart India Hackathon)',
    sub: 'National-level hackathon at IIT Bombay. 500+ participants across India. AI TeleMedicine Platform.',
    year: '2024',
  },
  {
    label: 'Research Internship — IIT Delhi',
    sub: 'Competitively selected for research internship at IIT Delhi; resulted in 2 IEEE manuscript submissions.',
    year: '2025',
  },
  {
    label: '4 Hackathon Wins — AI / Healthcare / Full-Stack',
    sub: 'Won across domains: Flux Hackathon, Odoo Top 10, IIT Bombay SIH, and one AI-healthcare track win.',
    year: '2023–2025',
    count: { target: 4, suffix: '×' },
  },
]

const certifications = [
  { title: 'Google AI Essentials', issuer: 'Google', skills: 'Generative AI, Prompt Engineering, AI Ethics, Productivity Tools' },
  { title: 'Generative AI: Introduction & Applications', issuer: 'IBM', skills: 'Large Language Models, Prompt Tuning, Generative AI Use-Cases' },
  { title: 'Data Visualization with Python', issuer: 'IBM', skills: 'Matplotlib, Seaborn, Folium, Dashboard Design, Python APIs' },
  { title: 'Supervised Machine Learning: Regression and Classification', issuer: 'DeepLearning.AI', skills: 'Linear Regression, Logistic Classification, Regularization, Cost Functions' },
  { title: 'Advanced Learning Algorithms', issuer: 'DeepLearning.AI', skills: 'Neural Networks, Backpropagation, Decision Trees, Random Forests, XGBoost' },
]

function CountUpNum({ target, suffix = '', duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setN(target); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const start = performance.now()
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / duration)
          const ease = 1 - Math.pow(1 - p, 3)
          setN(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }
    }, { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{n}{suffix}</span>
}

function AchievementCard({ a, idx }: { a: Ach; idx: number }) {
  const [hover, setHover] = useState(false)
  const [bump, setBump] = useState(false)
  const inner = (
    <div
      className="achievement-card reveal-item"
      data-testid={`achievement-card-${idx}`}
      onMouseEnter={() => { setHover(true); setBump(true); setTimeout(() => setBump(false), 350) }}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '1.75rem 1.5rem',
        background: 'var(--bg-card)',
        transition: 'background 0.25s, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {a.accent && (
        <div style={{
          width: 24, height: 2,
          background: 'var(--accent-cyan)',
          marginBottom: '0.85rem',
          borderRadius: 1,
          boxShadow: '0 0 8px rgba(34,211,238,0.6)',
        }} />
      )}
      {a.count && (
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.03em',
            color: '#22d3ee',
            lineHeight: 1,
            marginBottom: 8,
            textShadow: '0 0 20px rgba(34,211,238,0.35)',
            transform: bump ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <CountUpNum target={a.count.target} suffix={a.count.suffix} />
        </p>
      )}
      <p className="achievement-label">{a.label}</p>
      <p className="achievement-sub">{a.sub}</p>
      <span className="achievement-year">{a.year}</span>
    </div>
  )

  return a.accent ? (
    <ElectricBorder color="rgba(34,211,238,0.55)" glowColor="#22d3ee" speed={0.6} chaos={2.5} thickness={1} radius={10} glowIntensity={3} activeOnHover>
      {inner}
    </ElectricBorder>
  ) : inner
}

export default function Achievements() {
  return (
    <section id="achievements" className="bg-section-dark section-padding">
      <div className="section-container">

        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.75rem' }}>Recognition</p>
          <h2 className="section-head section-head-dark">Achievements</h2>
        </div>

        <div
          className="reveal-group"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            maxWidth: 1200,
          }}
        >
          {achievements.map((a, idx) => (
            <AchievementCard key={a.label} a={a} idx={idx} />
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.5rem' }}>Verified Expertise</p>
          <h3 className="section-head section-head-dark" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Certifications</h3>
        </div>

        <div className="certs-grid reveal-group">
          {certifications.map((c, i) => (
            <div key={c.title} className="cert-card reveal-item" data-testid={`cert-card-${i}`}>
              <div>
                <h4 className="cert-title">{c.title}</h4>
                <p className="cert-issuer">{c.issuer}</p>
              </div>
              <p className="cert-skills">{c.skills}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
