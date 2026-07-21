// Contact.tsx — Spotlight headline + magnetic CTA + Shiny Pill + Stardust bg
import { SiGithub } from 'react-icons/si'
import { FaLinkedin as SiLinkedin } from 'react-icons/fa6'
import { useMagnetic } from './Hero'
import ShinyPill from './effects/ShinyPill'
import StardustBackground from './effects/StardustBackground'

export default function Contact() {
  const emailCtaRef = useMagnetic(0.35) as React.RefObject<HTMLAnchorElement>

  return (
    <section id="contact" className="cta-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Stardust bg */}
      <StardustBackground count={160} color="rgba(240,238,232,0.7)" />
      {/* Cyan glow blob */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.12), transparent 60%)',
          pointerEvents: 'none',
          filter: 'blur(20px)',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Headline */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <h2 className="cta-headline" style={{ color: '#F0EEE8' }}>
            LET'S BUILD<br />
            SOMETHING <span style={{ color: '#22d3ee', textShadow: '0 0 40px rgba(34,211,238,0.5)' }}>REAL.</span>
          </h2>
        </div>

        {/* Magnetic CTA */}
        <div className="reveal" style={{ marginBottom: '2rem' }}>
          <a
            ref={emailCtaRef}
            id="contact-email-cta"
            data-testid="contact-email-cta"
            href="mailto:prithraj120@gmail.com"
            className="cta-btn"
            style={{ willChange: 'transform' }}
          >
            <ShinyPill textColor="#05070F" shineColor="rgba(255,255,255,0.9)" speed={2.6}>
              Send an Email ↗
            </ShinyPill>
          </a>
        </div>

        <div
          className="reveal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '2.5rem',
          }}
        >
          <p className="cta-meta">prithraj120@gmail.com</p>
          <p className="cta-meta">+91 7697966155</p>
          <p className="cta-meta">Ahmedabad, Gujarat, India</p>
        </div>

        <div
          className="reveal"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
        >
          <a
            id="contact-github-link"
            data-testid="contact-github-link"
            href="https://github.com/PR-ODINSON"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--muted-dark)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-dark)')}
          >
            <SiGithub size={16} /> GitHub
          </a>
          <a
            id="contact-linkedin-link"
            data-testid="contact-linkedin-link"
            href="https://www.linkedin.com/in/prithviraj-verma-b58707289/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--muted-dark)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#22d3ee')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-dark)')}
          >
            <SiLinkedin size={16} /> LinkedIn
          </a>
        </div>

      </div>
    </section>
  )
}
