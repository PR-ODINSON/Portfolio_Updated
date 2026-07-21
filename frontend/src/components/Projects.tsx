// Projects.tsx — Premium AI portfolio: Pixel Card + Electric Border + 3D tilt + Direction Hover
import PixelCard from './effects/PixelCard'
import ElectricBorder from './effects/ElectricBorder'
import TiltCard from './effects/TiltCard'
import DirectionHover from './effects/DirectionHover'

type Project = {
  monogram: string
  title: string
  tagline: string
  outcome: string
  stack: string[]
  github: string
  isLive?: boolean
  featured?: boolean
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
    featured: true,
  },
  {
    monogram: 'FR',
    title: 'Facial Recognition Attendance',
    tagline: 'Passive attendance with active anti-spoofing (liveness detection) deployed across Insolare workshop sites.',
    outcome: '98%+ verification accuracy. Zero manual intervention across multiple live sites.',
    stack: ['Python', 'Computer Vision', 'Deep Learning', 'GPS/GIS'],
    github: 'https://github.com/PR-ODINSON',
    isLive: true,
    featured: true,
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

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const accent = p.isLive ? '#22d3ee' : '#67e8f9'
  const inner = (
    <div
      className="project-card reveal-item"
      data-testid={`project-card-${index}`}
      style={{
        borderLeft: p.featured ? `2px solid ${accent}` : '1px solid transparent',
        background: 'var(--bg-card)',
        padding: '28px 26px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        minHeight: 320,
      }}
    >
      {/* Monogram watermark */}
      <span className="project-card-monogram" style={{ opacity: 0.14 }}>{p.monogram}</span>

      {/* Badges row */}
      <div className="project-card-badges">
        {p.isLive && (
          <span className="live-badge" style={{ fontSize: 11 }}>
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            {p.title === 'Garnet AI Vendor Onboarding' ? 'Enterprise' : 'Live'}
          </span>
        )}
      </div>

      {/* Title — Direction Hover */}
      <DirectionHover
        title={p.title}
        fontSize={18}
        fontWeight={700}
        letterSpacing="-0.02em"
        textColor="#F0EEE8"
        hoverColor="#22d3ee"
      />

      {/* Tagline */}
      <p className="project-card-tagline" style={{ fontSize: 13.5, lineHeight: 1.65 }}>{p.tagline}</p>

      {/* Outcome */}
      <p className="project-card-outcome" style={{ fontSize: 13, lineHeight: 1.6 }}>{p.outcome}</p>

      {/* Stack chips */}
      <div className="project-card-stack" style={{ marginTop: 4 }}>
        {p.stack.map(t => (
          <span key={t} className="stack-chip" style={{ fontSize: 10.5, padding: '3px 9px' }}>{t}</span>
        ))}
      </div>

      {/* GitHub link */}
      <a
        href={p.github}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`project-github-${index}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: "'Inter',sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--muted-dark)',
          textDecoration: 'none',
          marginTop: 'auto',
          transition: 'color 0.2s, gap 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-cyan)'; e.currentTarget.style.gap = '0.6rem' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted-dark)'; e.currentTarget.style.gap = '0.4rem' }}
      >
        View on GitHub <span aria-hidden>↗</span>
      </a>
    </div>
  )

  return (
    <TiltCard max={4} style={{ height: '100%' }}>
      {p.featured ? (
        <ElectricBorder color="rgba(34,211,238,0.5)" glowColor="#22d3ee" speed={0.7} chaos={2.4} thickness={1.1} radius={16} glowIntensity={3} activeOnHover>
          <PixelCard colors={['#22d3ee', '#67e8f9', '#0ea5e9']} gap={9} pixelSize={2} speed={38} radius={16} style={{ height: '100%' }}>
            {inner}
          </PixelCard>
        </ElectricBorder>
      ) : (
        <PixelCard colors={['#22d3ee', '#67e8f9', '#0ea5e9']} gap={9} pixelSize={2} speed={38} radius={16} style={{ height: '100%' }}>
          {inner}
        </PixelCard>
      )}
    </TiltCard>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="bg-section-dark section-padding" style={{ position: 'relative' }}>
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
              data-testid="projects-all-github-link"
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#22d3ee',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(34,211,238,0.4)',
                paddingBottom: '0.1rem',
                marginBottom: '0.5rem',
              }}
            >
              All projects on GitHub →
            </a>
          </div>
        </div>

        {/* 2-col project grid */}
        <div
          className="reveal-group"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            background: 'transparent',
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
