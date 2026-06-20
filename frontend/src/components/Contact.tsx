// Contact.tsx — .cta-section pattern: dark full-bleed, mailto-only CTA
// No form. Email/phone/location as muted text. GitHub/LinkedIn links below CTA.

import { useEffect, useRef } from 'react'
import { SiGithub, SiLinkedin } from 'react-icons/si'

function useMagnetic(enabled: boolean = true) {
  const ref = useRef<HTMLAnchorElement | null>(null)

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

export default function Contact() {
  const emailCtaRef = useMagnetic()

  return (
    <section id="contact" className="cta-section">
      <div className="section-container">

        {/* Giant headline */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <h2 className="cta-headline">
            LET'S BUILD<br />
            SOMETHING{' '}
            <span className="accent">REAL.</span>
          </h2>
        </div>

        {/* CTA button */}
        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          <a
            ref={emailCtaRef}
            id="contact-email-cta"
            href="mailto:prithraj120@gmail.com"
            className="cta-btn"
          >
            Send an Email ↗
          </a>
        </div>

        {/* Muted contact details */}
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

        {/* Social links */}
        <div
          className="reveal"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
        >
          <a
            id="contact-github-link"
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
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-dark)')}
          >
            <SiGithub size={16} /> GitHub
          </a>
          <a
            id="contact-linkedin-link"
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
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-dark)')}
          >
            <SiLinkedin size={16} /> LinkedIn
          </a>
        </div>

      </div>
    </section>
  )
}
