// Experience.tsx — vertical timeline, top 2 (Insolare & IIT Delhi) expanded by default, rest collapsed with preview
// High-density, rich detailed bullets parsed from CV. Alternating light bg.

import { useState } from 'react'

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

export default function ExperienceSection() {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(experiences.map((e, i) => e.defaultExpanded ? i : -1).filter(i => i !== -1))
  )

  const toggle = (i: number) => {
    setOpenSet(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  // Helper to dynamically style numbers and metrics
  const highlightMetrics = (text: string) => {
    const regex = /(\b\d+(?:\.\d+)?%[+-]?|\b\d+[-+]\w*|\b\d+\b)/g
    const parts = text.split(regex)
    return parts.map((part, i) => {
      if (regex.test(part)) {
        return (
          <strong key={i} style={{ color: 'var(--text-light-primary)', fontWeight: 500 }}>
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

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--text-light-muted)' }}>Work History</p>
          <h2 className="section-head" style={{ color: 'var(--text-light-primary)' }}>Experience</h2>
        </div>

        {/* Vertical timeline */}
        <div className="exp-timeline reveal-group">
          {experiences.map((exp, i) => {
            const isOpen = openSet.has(i)
            const hasDetail = !!(exp.bullets && exp.bullets.length > 0)
            return (
              <div
                key={exp.company + exp.period}
                className={`exp-entry reveal-item${isOpen ? ' expanded' : ''}`}
                style={isOpen ? {
                  background: 'var(--bg-light-card)',
                  border: '0.5px solid var(--border-light)',
                  borderLeft: '2px solid var(--accent-research)',
                  padding: '24px',
                  marginBottom: '1.5rem',
                  borderRadius: '4px',
                  position: 'relative'
                } : {
                  background: 'var(--bg-light-muted)',
                  border: '0.5px solid var(--border-light)',
                  padding: '14px',
                  marginBottom: '1rem',
                  borderRadius: '4px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={!isOpen ? () => toggle(i) : undefined}
              >
                <span className="exp-entry-dot" style={{
                  width: 8,
                  height: 8,
                  background: 'var(--bg-light)',
                  border: isOpen ? '1.5px solid var(--accent-research)' : '1.5px solid var(--spine-light)',
                  left: '-2.4rem',
                  top: isOpen ? '30px' : '20px',
                  transform: 'translateX(-4px)'
                }} />

                {/* Header row */}
                <div
                  className="exp-entry-header"
                  onClick={isOpen ? () => toggle(i) : undefined}
                  role={hasDetail ? 'button' : undefined}
                  aria-expanded={hasDetail ? isOpen : undefined}
                  style={{ cursor: hasDetail ? 'pointer' : 'default', padding: 0 }}
                >
                  <div className="exp-entry-title-block">
                    <p className="exp-entry-company" style={{ color: 'var(--text-light-primary)' }}>{exp.company}</p>
                    <p className="exp-entry-role" style={{ color: isOpen ? 'var(--text-light-secondary)' : 'var(--text-light-muted)' }}>{exp.role}</p>
                    {!isOpen && (
                      <p className="exp-entry-preview" style={{ fontSize: 12, color: 'var(--text-light-muted)', padding: '6px 0 0', margin: 0 }}>{exp.preview}</p>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                    <span className="exp-entry-period" style={{ color: 'var(--text-light-muted)' }}>{exp.period}</span>
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
                          color: 'var(--text-light-muted)',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s cubic-bezier(.65,0,.35,1)',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Expandable body */}
                {hasDetail && isOpen && (
                  <div className="exp-entry-body" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    <ul className="exp-entry-bullets" style={{ margin: '1rem 0 0', paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                      {exp.bullets!.map((b, j) => (
                        <li key={j} className="exp-entry-bullet" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-light-secondary)', marginBottom: '0.5rem' }}>
                          {highlightMetrics(b)}
                        </li>
                      ))}
                    </ul>
                    {exp.tech && (
                      <div className="exp-entry-tech" style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {exp.tech.map(t => (
                          <span key={t} className="stack-chip" style={{ background: 'var(--bg-light-muted)', border: '1px solid var(--border-light)', color: 'var(--text-light-secondary)' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tech for collapsed entries */}
                {!isOpen && exp.tech && (
                  <div className="exp-entry-tech" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {exp.tech.map(t => (
                      <span key={t} className="stack-chip" style={{ background: 'var(--bg-light-muted)', border: '1px solid var(--border-light)', color: 'var(--text-light-secondary)' }}>{t}</span>
                    ))}
                  </div>
                )}

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
