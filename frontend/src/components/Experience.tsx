// Experience.tsx — dark section, table-row layout, click-to-expand
// Chronological, latest first. Adapts pub-row table pattern for experience.

import { useState } from 'react'

type Exp = {
  company: string
  role: string
  period: string
  type: string
  description: string[]
  tech: string[]
}

const experiences: Exp[] = [
  {
    company: 'IIT Indore',
    role: 'Researcher',
    period: 'Jun 2026 – Present',
    type: 'Research',
    description: [
      'Conducting research at IIT Indore in AI and machine learning.',
      'Contributing to academic research initiatives and publications.',
    ],
    tech: ['Python', 'Deep Learning', 'AI/ML'],
  },
  {
    company: 'Insolare Pvt. Ltd., Ahmedabad',
    role: 'Machine Learning Engineer Intern',
    period: 'Apr 2025 – Jul 2026',
    type: 'Internship',
    description: [
      'Developed real-time facial recognition attendance system with >98% accuracy, eliminating proxy check-ins across 3 sites.',
      'Automated drone-based solar panel defect detection using CV models, increasing inspection efficiency by 75%.',
      'Designed geospatial dashboard integrating live GPS data, enabling 30% faster solar maintenance planning.',
    ],
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'GIS'],
  },
  {
    company: 'Garnet AI, Dublin, Ireland',
    role: 'Software Development Engineer Intern',
    period: 'May 2025 – Jul 2025',
    type: 'Internship',
    description: [
      'Architected and deployed LLM-powered vendor onboarding platform reducing onboarding time by 60%, processing 200+ enterprise clients monthly.',
      'Built compliance assistant using RAG achieving 95% accuracy in regulatory document analysis.',
      'Developed full-stack web application (React, Node.js, MongoDB) serving 500+ daily active users.',
      'Implemented CI/CD pipeline with Docker and AWS, reducing deployment time from 2 hours to 15 minutes.',
    ],
    tech: ['Python', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'OpenAI API'],
  },
  {
    company: 'IIT Delhi, New Delhi',
    role: 'Research Intern',
    period: 'Jan 2025 – Jun 2025',
    type: 'Research',
    description: [
      'Authored IEEE Access publication on sleep stage classification achieving 99.2% accuracy using EEG/ECG signal fusion.',
      'Developed Vision Transformer-based architecture reducing model size by 40% while maintaining performance.',
      'Implemented end-to-end ML pipeline processing 10,000+ biomedical signals with real-time inference.',
    ],
    tech: ['Python', 'PyTorch', 'OpenCV', 'Signal Processing'],
  },
  {
    company: 'MarkX AI Labs, Ahmedabad',
    role: 'Machine Learning Intern',
    period: 'Nov 2024 – Dec 2024',
    type: 'Internship',
    description: [
      'Developed AI-powered Telegram-based trading bot to analyze market trends and provide real-time insights.',
      'Implemented agentic workflows enabling strategy-driven decisions with real capital in controlled scenarios.',
    ],
    tech: ['Python', 'RL', 'Scikit-learn', 'PyTorch'],
  },
  {
    company: 'Blix Education',
    role: 'AI Developer Intern',
    period: 'Sep 2024 – Nov 2024',
    type: 'Internship',
    description: [
      'Developed self-driving car prototype using Arduino, Python, and deep learning algorithms.',
      'Implemented computer vision for object detection, path planning, and autonomous navigation.',
    ],
    tech: ['Arduino', 'Python', 'OpenCV', 'TensorFlow'],
  },
  {
    company: 'Yads Technology Pvt. Ltd.',
    role: 'Data Science Intern',
    period: 'Jun 2024 – Jul 2024',
    type: 'Internship',
    description: [
      'Analyzed datasets to extract insights supporting business decision-making.',
      'Improved data processing pipelines by 40%, enhancing efficiency of internal analysis systems.',
    ],
    tech: ['Python', 'Pandas', 'SQL', 'Power BI'],
  },
]

export default function ExperienceSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="experience" className="bg-section-dark section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.75rem' }}>Work History</p>
          <h2 className="section-head section-head-dark">Experience</h2>
        </div>

        {/* Table */}
        <div className="exp-table reveal-group">
          {experiences.map((exp, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={exp.company + exp.period}
                className={`exp-row reveal-item${isOpen ? ' open' : ''}`}
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div className="exp-row-head">
                  <div>
                    <p className="exp-company">{exp.company}</p>
                    <p className="exp-role">{exp.role}</p>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                  <span className="exp-badge">{exp.type}</span>
                  <svg
                    className="exp-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 16, height: 16, flexShrink: 0 }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                <div className="exp-body">
                  <div className="exp-body-inner">
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {exp.description.map((d, j) => (
                        <li key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <span style={{ marginTop: '0.45rem', width: 4, height: 4, borderRadius: '50%', background: 'var(--muted-dark)', flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.875rem', color: 'var(--muted-dark)', lineHeight: 1.65 }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                      {exp.tech.map(t => (
                        <span key={t} style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-dark)', border: '1px solid var(--line)', borderRadius: 4, padding: '0.2rem 0.5rem' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
