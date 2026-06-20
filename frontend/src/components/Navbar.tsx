import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'projects',   label: 'Work'     },
  { id: 'focus',      label: 'Focus'    },
  { id: 'research',   label: 'Research' },
  { id: 'contact',    label: 'Contact'  },
]

const RESUME_URL = '/Prithviraj_CV.pdf'

export default function Navbar() {
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        mixBlendMode: 'difference',
        pointerEvents: 'none',
      }}
    >
      <nav
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '1.125rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: '1.05rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#fff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            lineHeight: 1,
          }}
          aria-label="Scroll to top"
        >
          PRITHVIRAJ VERMA
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          className="hidden lg:flex"
        >
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="nav-link-blend"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: '0.02em',
                color: '#fff',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 0.875rem',
                position: 'relative',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.02em',
              color: '#141414',
              background: '#fff',
              border: 'none',
              cursor: 'pointer',
              padding: '0.45rem 1.125rem',
              borderRadius: '999px',
              textDecoration: 'none',
              marginLeft: '0.75rem',
              transition: 'opacity 0.15s',
            }}
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          className="lg:hidden"
          style={{
            color: '#fff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu — outside blend layer so it has its own bg */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              mixBlendMode: 'normal',
              background: 'rgba(20,20,20,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid #2a2a2a',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 2rem 1.5rem' }}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 0',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#EDEDE4',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid #2a2a2a',
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
                  background: '#EDEDE4',
                  color: '#141414',
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
    </header>
  )
}