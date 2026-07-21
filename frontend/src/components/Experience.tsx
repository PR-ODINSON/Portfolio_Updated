// Experience.tsx — Timeline that grows on scroll, Text Lift for company names,
// cards fade+slide upward, dark premium theme.

import { useEffect, useRef, useState } from 'react'

type ExpEntry = {
  company: string
  role: string
  period: string
  preview: string
  bullets?: string[]
  tech?: string[]
  defaultExpanded?: boolean
}

const experiences: ExpEntry[] = [
  {
    company: 'Insolare Pvt. Ltd.',
    role: 'Machine Learning Engineer Intern',
    period: 'Apr 2025 – Present',
    preview: 'Passive facial recognition (98%+) and drone defect detection deployed to production.',
    bullets: [
      'Architected and deployed a passive facial recognition attendance system with active anti-spoofing (liveness detection), achieving 98%+ verification accuracy across multiple operational workshop sites with zero manual intervention.',
      'Designed and trained a drone-based solar panel defect detection pipeline using object detection and image segmentation, reducing manual inspection time by 75% and enabling automated classification of physical and electrical panel damage.',
      'Built a geospatial monitoring dashboard integrating live GPS telemetry data to visualise solar field health, track equipment locations, and optimise maintenance crew routing.',
      'Developed a Solar Panel Operations and Management platform enabling real-time monitoring of panel performance metrics, input/output power tracking, and condition-based maintenance scheduling.',
      'Deployed all systems to production environments actively used in Insolare operations, providing end-to-end exposure from model training through containerised deployment and live monitoring.'
    ],
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'GIS', 'Drone Systems'],
    defaultExpanded: true,
  },
  {
    company: 'Indian Institute of Technology Delhi',
    role: 'Research Intern (Remote)',
    period: 'Jan 2025 – Jun 2025',
    preview: 'Clinical sleep AI research — 99.58% K-complex and 98.08% spindle classification.',
    bullets: [
      'Designed a separable convolutional neural network for automated sleep spindle detection in overnight EEG recordings, achieving 98.08% detection accuracy on benchmark polysomnographic datasets with significantly reduced computational cost versus standard CNN baselines.',
      'Developed an explainable multimodal deep learning framework for K-complex detection achieving 99.58% classification accuracy, integrating Grad-CAM and SHAP visualisations to produce clinician-readable saliency maps for model audit and clinical validation.',
      'Applied gradient-based and perturbation-based explainability methods (Grad-CAM, SHAP) to produce interpretable visualisations of EEG feature importance, directly supporting neurologist review of automated sleep scoring outputs.',
      'Designed and implemented an attention-gated denoising network for diffusion-weighted MRI, improving SNR in low-quality clinical scan acquisitions while preserving diagnostically relevant tensor features.',
      'Managed complete ML pipelines from raw EEG/PPG signal preprocessing (bandpass filtering, epoch segmentation, artefact rejection) through model training, hyperparameter tuning, and cross-validation on clinical datasets.',
      'Produced 3 peer-reviewed manuscripts currently under review at IEEE journals, extending 3 published IEEE Access papers from the same research programme.'
    ],
    tech: ['Python', 'PyTorch', 'Signal Processing', 'Grad-CAM', 'SHAP', 'Separable CNN'],
    defaultExpanded: true,
  },
  {
    company: 'Garnet AI, Dublin, Ireland',
    role: 'Software Development Engineer Intern (Remote)',
    period: 'May 2025 – Jul 2025',
    preview: 'Enterprise SaaS onboarding platform with GPT automation — 40% faster onboarding.',
    bullets: [
      'Led full-stack development of a SaaS vendor onboarding platform for enterprise B2B clients, reducing onboarding time by 40% through automated document workflows and self-serve vendor portals.',
      'Integrated GPT-powered automation pipelines for compliance documentation generation, regulatory requirement extraction, and vendor verification, cutting manual processing workload by 60%.',
      'Built and maintained secure REST APIs using Node.js and PostgreSQL with JWT-based authentication, role-based access control, and audit logging for enterprise clients.',
      'Established CI/CD pipelines using Docker, GitHub Actions, and AWS (EC2 + S3), enabling zero-downtime deployments and automated testing across staging and production environments.',
      'Collaborated with a cross-functional remote team across product, design, and backend engineering to ship features on a 2-week sprint cycle.'
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'OpenAI API'],
  },
  {
    company: 'MarkX AI Labs',
    role: 'Machine Learning Intern (Remote)',
    period: 'Nov 2024 – Dec 2024',
    preview: 'LSTM market trend prediction and Telegram-based automated assistant.',
    bullets: [
      'Developed LSTM and gradient-boosted ML models for short-term market trend prediction using historical OHLCV data and technical indicators.',
      'Built a Telegram-based trading assistant delivering automated real-time buy/sell signals, stop-loss recommendations, and portfolio analytics to subscribed users.',
      'Designed automated signal generation pipelines processing live market data through trained models to produce actionable investment recommendations with configurable risk thresholds.'
    ],
    tech: ['Python', 'Deep Learning', 'Algorithmic Trading', 'Telegram API'],
  },
  {
    company: 'Blix Education',
    role: 'AI Developer Intern (Remote)',
    period: 'Sep 2024 – Nov 2024',
    preview: 'Autonomous vehicle prototype on Raspberry Pi with CV lane detection.',
    bullets: [
      'Developed an autonomous navigation prototype on Raspberry Pi integrating a camera-based perception stack with lane detection, obstacle recognition, and PID-based steering control for real-time vehicle movement.',
      'Implemented computer vision modules using OpenCV for lane boundary segmentation and ultrasonic sensor fusion for obstacle avoidance, optimised for low-latency inference on edge hardware.',
      'Conducted model compression and quantisation to fit inference pipeline within Raspberry Pi memory and CPU constraints while maintaining real-time navigation performance.',
      'Designed modular software architecture separating perception, decision, and actuation layers to allow independent testing and iterative improvement of each navigation component.'
    ],
    tech: ['Python', 'Computer Vision', 'OpenCV', 'Raspberry Pi', 'Edge ML'],
  },
  {
    company: 'Yads Technology Pvt. Ltd.',
    role: 'Data Science Intern (Remote)',
    period: 'Jun 2024 – Jul 2024',
    preview: 'Automated web scraping pipelines and exploratory data analysis dashboards.',
    bullets: [
      'Built automated web scraping pipelines using Python, BeautifulSoup, and Scrapy to systematically collect structured datasets from multiple online sources at scale.',
      'Designed data cleaning, deduplication, and validation workflows using Pandas to standardise raw scraped data for downstream analytics consumption.',
      'Performed exploratory data analysis and produced stakeholder-facing reports and visualisations (Matplotlib, Seaborn) to communicate trends and operational insights.',
      'Developed reusable data extraction utilities that significantly reduced manual data collection effort and improved consistency of internal analytics datasets.'
    ],
    tech: ['Python', 'BeautifulSoup', 'Pandas', 'Data Analysis'],
  },
]

// Text-lift on hover — company name lifts smoothly
function TextLift({ text, active }: { text: string; active: boolean }) {
  return (
    <span
      className="exp-entry-company"
      style={{
        display: 'inline-block',
        transform: active ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s',
        color: active ? '#22d3ee' : 'var(--paper)',
      }}
    >
      {text}
    </span>
  )
}

export default function ExperienceSection() {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(experiences.map((e, i) => e.defaultExpanded ? i : -1).filter(i => i !== -1))
  )
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Timeline grows with scroll progress within the timeline element
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = timelineRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewH = window.innerHeight
      const start = rect.top - viewH * 0.55
      const end = rect.bottom - viewH * 0.55
      const total = end - start
      const p = 1 - Math.max(0, Math.min(1, end / total))
      setProgress(Math.max(0, Math.min(1, p)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const highlightMetrics = (text: string) => {
    const regex = /(\b\d+(?:\.\d+)?%[+-]?|\b\d+[-+]\w*|\b\d+\b)/g
    const parts = text.split(regex)
    return parts.map((part, i) => {
      if (regex.test(part)) {
        return (
          <strong key={i} style={{ color: '#22d3ee', fontWeight: 600 }}>
            {part}
          </strong>
        )
      }
      return part
    })
  }

  return (
    <section id="experience" className="bg-section-light section-padding">
      <div className="section-container">

        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--muted)' }}>Work History</p>
          <h2 className="section-head">Experience</h2>
        </div>

        {/* Vertical timeline with progress fill */}
        <div ref={timelineRef} style={{ position: 'relative' }}>
          {/* Growing timeline line */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '2rem',
              top: 0,
              bottom: 0,
              width: 1,
              transform: 'translateX(-0.5px)',
              background: 'var(--line)',
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '2rem',
              top: 0,
              width: 1,
              height: `${progress * 100}%`,
              transform: 'translateX(-0.5px)',
              background: 'linear-gradient(to bottom, #22d3ee, rgba(34,211,238,0.2))',
              boxShadow: '0 0 10px rgba(34,211,238,0.6)',
              transition: 'height 0.15s linear',
              zIndex: 1,
            }}
          />

          <div className="reveal-group" style={{ paddingLeft: '4rem', position: 'relative', zIndex: 2 }}>
            {experiences.map((exp, i) => {
              const isOpen = openSet.has(i)
              const hasDetail = !!(exp.bullets && exp.bullets.length > 0)
              const isHover = hoveredIdx === i
              return (
                <div
                  key={exp.company + exp.period}
                  data-testid={`experience-entry-${i}`}
                  className={`exp-entry reveal-item${isOpen ? ' expanded' : ''}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${isHover || isOpen ? 'rgba(34,211,238,0.25)' : 'var(--line)'}`,
                    borderLeft: `2px solid ${isOpen ? '#22d3ee' : 'var(--line-strong)'}`,
                    padding: isOpen ? 24 : 18,
                    marginBottom: '1.25rem',
                    borderRadius: 12,
                    position: 'relative',
                    cursor: hasDetail && !isOpen ? 'pointer' : 'default',
                    transition: 'border-color 0.3s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s',
                    transform: isHover ? 'translateX(3px)' : 'translateX(0)',
                    boxShadow: isOpen ? '0 12px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(34,211,238,0.08)' : 'none',
                  }}
                  onClick={!isOpen && hasDetail ? () => toggle(i) : undefined}
                >
                  {/* Dot on timeline */}
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: -34,
                      top: isOpen ? 32 : 22,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: isOpen ? '#22d3ee' : 'var(--bg-dark)',
                      border: `1.5px solid ${isOpen ? '#22d3ee' : 'var(--line-strong)'}`,
                      boxShadow: isOpen ? '0 0 12px rgba(34,211,238,0.7)' : 'none',
                      transition: 'all 0.3s',
                      zIndex: 2,
                    }}
                  />

                  <div
                    className="exp-entry-header"
                    onClick={isOpen ? () => toggle(i) : undefined}
                    role={hasDetail ? 'button' : undefined}
                    aria-expanded={hasDetail ? isOpen : undefined}
                    style={{ cursor: hasDetail ? 'pointer' : 'default', padding: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}
                  >
                    <div>
                      <TextLift text={exp.company} active={isHover || isOpen} />
                      <p className="exp-entry-role" style={{ color: 'var(--muted-dark)' }}>{exp.role}</p>
                      {!isOpen && (
                        <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.55 }}>{exp.preview}</p>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                      <span
                        className="exp-entry-period"
                        style={{ color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, letterSpacing: '0.02em' }}
                      >
                        {exp.period}
                      </span>
                      {hasDetail && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            width: 14,
                            height: 14,
                            color: isHover ? '#22d3ee' : 'var(--muted)',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s cubic-bezier(.65,0,.35,1), color 0.2s',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {hasDetail && isOpen && (
                    <div style={{ overflow: 'visible', marginTop: '0.75rem' }}>
                      <ul style={{ margin: '0.75rem 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {exp.bullets!.map((b, j) => (
                          <li
                            key={j}
                            style={{
                              display: 'flex',
                              gap: 10,
                              alignItems: 'flex-start',
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 13.5,
                              lineHeight: 1.65,
                              color: 'var(--muted-dark)',
                            }}
                          >
                            <span
                              aria-hidden
                              style={{
                                width: 4, height: 4, borderRadius: 4,
                                background: '#22d3ee', flexShrink: 0, marginTop: 8,
                                boxShadow: '0 0 6px rgba(34,211,238,0.7)',
                              }}
                            />
                            <span>{highlightMetrics(b)}</span>
                          </li>
                        ))}
                      </ul>
                      {exp.tech && (
                        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {exp.tech.map(t => (
                            <span key={t} className="stack-chip" style={{ fontSize: 10.5 }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!isOpen && exp.tech && (
                    <div style={{ marginTop: '0.85rem', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {exp.tech.map(t => (
                        <span key={t} className="stack-chip" style={{ fontSize: 10.5 }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
