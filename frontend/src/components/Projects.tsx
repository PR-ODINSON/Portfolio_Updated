// Projects.tsx — 3 curated projects on dark surface, 3-col grid
// Live badge (coral pulse) on production deployment

type Project = {
  monogram: string
  title: string
  tagline: string
  outcome: string
  stack: string[]
  github: string
  isLive?: boolean
}

const projects: Project[] = [
  {
    monogram: 'GA',
    title: 'Garnet AI Vendor Onboarding',
    tagline: 'LLM-powered compliance & onboarding platform serving enterprise B2B clients.',
    outcome: 'Processed 200+ enterprise clients monthly, reducing onboarding time by 60% with a 95% accurate RAG compliance assistant.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'OpenAI API'],
    github: 'https://github.com/PR-ODINSON',
    isLive: true,
  },
  {
    monogram: 'FR',
    title: 'Facial Recognition Attendance',
    tagline: 'Passive attendance with active anti-spoofing (liveness detection) deployed across Insolare workshop sites.',
    outcome: '98%+ verification accuracy. Zero manual intervention across multiple live sites.',
    stack: ['Python', 'Computer Vision', 'Deep Learning', 'GPS/GIS'],
    github: 'https://github.com/PR-ODINSON',
    isLive: true,
  },
  {
    monogram: 'TM',
    title: 'AI TeleMedicine Platform',
    tagline: 'End-to-end digital healthcare — video consults, AI diagnosis, e-pharmacy, prescription OCR.',
    outcome: 'Built during Smart India Hackathon — 1st runner-up at IIT Bombay national level.',
    stack: ['React', 'Flask', 'WebRTC', 'OpenCV', 'Tesseract', 'ML'],
    github: 'https://github.com/PR-ODINSON',
  },
  {
    monogram: 'MR',
    title: 'Multimodal DWI MRI Denoising',
    tagline: 'Hybrid deep learning framework (Swin Transformer + Restormer) leveraging spatial and wavelet features to suppress Rician noise.',
    outcome: 'Achieved 32.69 dB PSNR and 0.8113 SSIM. Research paper submitted to MICCAI 2026.',
    stack: ['PyTorch', 'Swin Transformer', 'Restormer', 'Wavelets', 'Medical Imaging'],
    github: 'https://github.com/PR-ODINSON/DWI_Denoising',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-section-dark section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.75rem' }}>Selected Work</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-head section-head-dark">Projects</h2>
            <a
              href="https://github.com/PR-ODINSON"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#00B4A0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(0,180,160,0.3)',
                paddingBottom: '0.1rem',
                marginBottom: '0.5rem',
              }}
            >
              All projects on GitHub →
            </a>
          </div>
        </div>

        {/* 2-col project grid */}
        <div className="project-cards-grid reveal-group" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {projects.map(p => (
            <article
              key={p.title}
              className="project-card reveal-item"
              style={p.title === 'Facial Recognition Attendance' ? {
                borderLeft: '2px solid #E8593C',
                background: '#111420',
                padding: '24px 24px 24px 22px',
              } : p.title === 'Garnet AI Vendor Onboarding' ? {
                borderLeft: '2px solid #00B4A0',
                background: '#111420',
                padding: '24px 24px 24px 22px',
              } : { padding: '24px' }}
            >

              {/* Monogram watermark */}
              <span className="project-card-monogram">{p.monogram}</span>

              {/* Badges row */}
              <div className="project-card-badges">
                {p.isLive && (
                  <span className="live-badge" style={{ fontSize: 12 }}>
                    <span className="live-dot" style={{ width: 6, height: 6 }} />
                    {p.title === 'Garnet AI Vendor Onboarding' ? 'Enterprise' : 'Live'}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="project-card-title" style={{ fontSize: 15 }}>{p.title}</h3>

              {/* Tagline */}
              <p className="project-card-tagline" style={{ fontSize: 13, lineHeight: 1.65 }}>{p.tagline}</p>

              {/* Outcome */}
              <p className="project-card-outcome" style={{ fontSize: 13, lineHeight: 1.65 }}>{p.outcome}</p>

              {/* Stack chips */}
              <div className="project-card-stack">
                {p.stack.map(t => (
                  <span key={t} className="stack-chip" style={{ fontSize: 11, padding: '3px 9px' }}>{t}</span>
                ))}
              </div>

              {/* GitHub link */}
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  marginTop: 'auto',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                GitHub ↗
              </a>

            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
