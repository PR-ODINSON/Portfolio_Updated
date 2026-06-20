// Projects.tsx — Reference .work-grid pattern (light section)
// 2×2 CSS grid, card with bg image, monogram overlay, hover arrow.
// Staggered scroll reveal, cursor-aware tilt/parallax (capped at 4 degrees)

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

type Project = {
  monogram: string
  title: string
  tagline: string
  problem: string
  approach: string
  impact: string
  image: string
  github?: string
  tech: string[]
}

const projects: Project[] = [
  {
    monogram: 'CB',
    title: 'CareerBuddy',
    tagline: 'AI-Powered Career Guidance Platform',
    problem: 'Students and early-career professionals lack personalised, data-driven career guidance.',
    approach: 'Full-stack platform powered by LLMs and RAG delivering personalised career roadmaps, skill gap analysis, resume feedback, and job-market intelligence.',
    impact: 'Enables role-specific roadmaps in minutes. Actionable gap analysis across 100+ career paths.',
    image: '/projects/CareerBuddy.png',
    github: 'https://github.com/PR-ODINSON',
    tech: ['Python', 'LLM / RAG', 'React', 'FastAPI', 'OpenAI API', 'MongoDB'],
  },
  {
    monogram: 'TM',
    title: 'TeleMedicine',
    tagline: 'AI Diagnostic Platform for Underserved Regions',
    problem: 'Rural patients face long wait times and limited specialist access.',
    approach: 'Full-stack telemedicine with AI symptom triage, LLM-powered report summarisation, and secure video consultations.',
    impact: 'Specialist-level symptom analysis for 50+ conditions. Serves patients in low-connectivity regions.',
    image: '/projects/TeleMedicine.png',
    github: 'https://github.com/PR-ODINSON',
    tech: ['Python', 'React', 'Node.js', 'OpenAI API', 'NLP', 'WebRTC'],
  },
  {
    monogram: 'UP',
    title: 'UrbanPulse',
    tagline: 'Smart City Command Center',
    problem: 'City operations teams lack a unified real-time view of traffic, utilities, and public safety.',
    approach: 'Multi-layer dashboard integrating IoT feeds, CV-based traffic analysis, predictive anomaly detection, and GIS visualisation.',
    impact: 'Centralises 10+ data streams. Anomaly detection triggers alerts 40% faster than manual monitoring.',
    image: '/projects/UrbanPulse.png',
    github: 'https://github.com/PR-ODINSON',
    tech: ['Python', 'React', 'Computer Vision', 'GIS', 'IoT', 'Time-Series ML'],
  },
  {
    monogram: 'KB',
    title: 'KhetiBuddy',
    tagline: 'AI Advisory for Precision Farming',
    problem: 'Smallholder farmers lack access to timely, localised crop guidance.',
    approach: 'Multilingual AI advisory platform combining satellite data, IoT sensors, and an LLM chatbot for real-time farming recommendations.',
    impact: 'Advisory for 20+ crops in regional languages. Integrates real-time weather, soil, and mandi price signals.',
    image: '/projects/KhetiBuddy.png',
    github: 'https://github.com/PR-ODINSON',
    tech: ['Python', 'LLM', 'IoT', 'Satellite Data', 'FastAPI', 'Multilingual NLP'],
  },
]

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    
    // Relative coordinates [-0.5, 0.5]
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Tilt max 4 degrees
    const tiltX = -y * 4
    const tiltY = x * 4

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`
    card.style.transition = 'transform 0.08s ease-out'

    // Arrow tracking
    const arrow = card.querySelector<HTMLElement>('.wc-arrow')
    if (arrow) {
      const arrowX = x * 10
      const arrowY = y * 10
      arrow.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0) rotate(45deg)`
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

    const arrow = card.querySelector<HTMLElement>('.wc-arrow')
    if (arrow) {
      arrow.style.transform = ''
      arrow.style.transition = 'transform 0.3s ease'
    }
  }

  return (
    <section id="projects" className="bg-section-light section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Selected Work</p>
          <h2 className="section-head section-head-light">Projects</h2>
        </div>

        {/* Work grid — reveal-group for staggered children entrance */}
        <div className="work-grid reveal-group">
          {projects.map(p => (
            <article
              key={p.title}
              className="work-card reveal-item"
              onClick={() => setExpanded(expanded === p.title ? null : p.title)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: 'pointer' }}
            >
              {/* Background image */}
              <div
                className="wc-media"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="wc-overlay" />
              <span className="wc-monogram">{p.monogram}</span>
              <div className="wc-footer">
                <div>
                  <p className="wc-title">{p.title}</p>
                  <p className="wc-stack">{p.tech.slice(0, 3).join(' · ')}</p>
                </div>
                <span className="wc-arrow">↗</span>
              </div>
            </article>
          ))}
        </div>

        {/* Expanded case study panel */}
        <AnimatePresence>
          {expanded && (() => {
            const p = projects.find(x => x.title === expanded)!
            return (
              <motion.div
                key={expanded}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                style={{ overflow: 'hidden', marginTop: 2, background: 'var(--ink)', color: 'var(--paper)' }}
              >
                <div style={{ padding: '2.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>
                        {p.title}
                      </h3>
                      <p style={{ color: 'var(--muted-dark)', fontSize: '0.875rem' }}>{p.tagline}</p>
                    </div>
                    <button
                      onClick={() => setExpanded(null)}
                      style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8125rem', color: 'var(--muted-dark)', background: 'none', border: '1px solid var(--line)', borderRadius: 4, padding: '0.35rem 0.75rem', cursor: 'pointer' }}
                    >
                      Close ×
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {[['Problem', p.problem], ['Approach', p.approach], ['Impact', p.impact]].map(([label, text]) => (
                      <div key={label as string}>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-dark)', marginBottom: '0.4rem' }}>{label}</p>
                        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.875rem', color: '#ccc', lineHeight: 1.65 }}>{text}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-dark)', border: '1px solid var(--line)', borderRadius: 4, padding: '0.2rem 0.55rem' }}>{t}</span>
                    ))}
                  </div>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: "'Inter',sans-serif", fontSize: '0.875rem', fontWeight: 600, color: 'var(--paper)', borderBottom: '1px solid var(--line)', paddingBottom: '0.1rem', textDecoration: 'none' }}>
                      <FaGithub size={14} /> View on GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        {/* Footer link */}
        <div className="reveal" style={{ marginTop: '2rem', textAlign: 'right' }}>
          <a href="https://github.com/PR-ODINSON" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: 'var(--muted)', textDecoration: 'none', borderBottom: '1px solid var(--line-light)', paddingBottom: '0.1rem' }}>
            All projects on GitHub ↗
          </a>
        </div>

      </div>
    </section>
  )
}
