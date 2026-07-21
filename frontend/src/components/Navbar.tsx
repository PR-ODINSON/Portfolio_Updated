import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useMagnetic } from './Hero'

const NAV_ITEMS = [
  { id: 'projects',    label: 'Work'       },
  { id: 'research',    label: 'Research'   },
  { id: 'experience',  label: 'Experience' },
  { id: 'achievements',label: 'Achievements' },
  { id: 'contact',     label: 'Contact'    },
]

const RESUME_URL = '/Prithviraj_CV.pdf'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [activeId, setActiveId] = useState<string>('home')
  const lastY = useRef(0)
  const resumeRef = useMagnetic(0.3) as React.RefObject<HTMLAnchorElement>

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Hide on scroll down, reveal on scroll up
      if (y > 120 && y > lastY.current + 4) setHidden(true)
      else if (y < lastY.current - 4) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const ids = ['home', ...NAV_ITEMS.map(i => i.id)]
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <motion.header
      data-testid="site-navbar"
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        pointerEvents: 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(5, 7, 15, 0.65)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(34, 211, 238, 0.10)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-testid="nav-logo-btn"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '-0.02em',
            color: '#F0EEE8',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
          aria-label="Scroll to top"
        >
          <span
            aria-hidden
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#05070F',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: 12,
              boxShadow: '0 0 20px rgba(34,211,238,0.4)',
            }}
          >
            PV
          </span>
          <span style={{ opacity: 0.95 }}>Prithviraj Verma</span>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex lg:items-center" style={{ gap: '0.15rem' }}>
          {NAV_ITEMS.map(item => {
            const active = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-testid={`nav-link-${item.id}`}
                className="nav-link-underline"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.8125rem',
                  letterSpacing: '0.01em',
                  color: active ? '#22d3ee' : 'rgba(240,238,232,0.7)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 0.9rem',
                  position: 'relative',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                {item.label}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    left: '25%',
                    right: '25%',
                    height: 1,
                    background: '#22d3ee',
                    transformOrigin: 'center',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    boxShadow: active ? '0 0 8px rgba(34,211,238,0.6)' : 'none',
                  }}
                />
              </button>
            )
          })}
          <a
            ref={resumeRef}
            data-testid="nav-resume-cta"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.01em',
              color: '#05070F',
              background: 'linear-gradient(90deg, #22d3ee 0%, #67e8f9 100%)',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem 1.1rem',
              borderRadius: 999,
              textDecoration: 'none',
              marginLeft: '0.6rem',
              boxShadow: '0 4px 20px rgba(34,211,238,0.25)',
              willChange: 'transform',
            }}
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="lg:hidden"
          data-testid="nav-hamburger-btn"
          style={{
            color: '#F0EEE8',
            background: 'rgba(240,238,232,0.05)',
            border: '1px solid rgba(240,238,232,0.1)',
            borderRadius: 999,
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(5, 7, 15, 0.96)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(34, 211, 238, 0.15)',
              overflow: 'hidden',
              pointerEvents: 'auto',
            }}
          >
            <div style={{ padding: '1rem 2rem 1.5rem' }}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  data-testid={`nav-mobile-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.85rem 0',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: activeId === item.id ? '#22d3ee' : '#F0EEE8',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(240,238,232,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{
                  display: 'inline-flex',
                  marginTop: '1.25rem',
                  padding: '0.65rem 1.5rem',
                  background: 'linear-gradient(90deg, #22d3ee, #67e8f9)',
                  color: '#05070F',
                  borderRadius: '999px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                }}
              >
                Resume ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
