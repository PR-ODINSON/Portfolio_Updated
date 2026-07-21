// Leadership.tsx — Scroll reveal + gradient hover + Character Waves title
import { useRef } from 'react'
import CharacterWaves from './effects/CharacterWaves'

const roles = [
  {
    title: 'Coordinator',
    org: 'Career Development Centre (CDC), IITRAM',
    period: 'Jul 2025 – Present',
    description: 'Managing and coordinating a 34-member multidisciplinary team across outreach, operations, content creation, and industry engagement verticals for IITRAM’s central placement and career body.',
  },
  {
    title: 'Team Lead',
    org: 'Alumni Relations, IITRAM',
    period: 'Jul 2025 – Present',
    description: 'Leading a team of 50+ student volunteers responsible for planning, coordinating, and executing alumni engagement initiatives for the institute.',
  },
  {
    title: 'AI/ML Team Lead',
    org: 'Tekstra Coding Club, IITRAM',
    period: 'Jan 2025 – Aug 2025',
    description: 'Led the AI/ML vertical of IITRAM’s coding community, designing and delivering structured learning tracks covering machine learning fundamentals, deep learning, and applied AI projects.',
  },
]

function LeaderCard({ role, idx }: { role: typeof roles[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="leadership-card reveal-item"
      data-testid={`leadership-card-${idx}`}
    >
      <h3 className="leadership-title">{role.title}</h3>
      <p className="leadership-org">{role.org}</p>
      <p className="leadership-period">{role.period}</p>
      <p className="leadership-desc">{role.description}</p>
    </div>
  )
}

export default function Leadership() {
  return (
    <section id="leadership" className="bg-section-light section-padding">
      <div className="section-container">

        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--muted)' }}>Positions of Responsibility</p>
          <h2 className="section-head">
            <CharacterWaves text="Leadership" />
          </h2>
        </div>

        <div className="leadership-grid reveal-group">
          {roles.map((role, i) => (
            <LeaderCard key={role.title + role.org} role={role} idx={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
