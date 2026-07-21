// FocusPage — wrapper that shows a single section with a "Back home" pill and
// a focus banner. Uses shared existing section components so all content stays
// authored in one place.

import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

interface Props {
  eyebrow: string
  title: string
  children: ReactNode
}

export default function FocusPage({ eyebrow, title, children }: Props) {
  return (
    <>
      {/* Focus banner */}
      <div
        style={{
          paddingTop: '9rem',
          paddingBottom: '1rem',
          background: 'var(--bg-dark)',
          borderBottom: '1px solid var(--line)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* soft cyan wash */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 500,
            background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.10), transparent 60%)',
            pointerEvents: 'none',
            filter: 'blur(20px)',
          }}
        />
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div>
            <p
              className="eyebrow eyebrow-light"
              style={{ marginBottom: '0.35rem', color: 'var(--accent-cyan)' }}
            >
              {eyebrow}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Focused view — {title}
            </p>
          </div>

          <Link
            to="/"
            data-testid="focus-back-home-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.55rem 1.05rem',
              borderRadius: 999,
              background: 'rgba(240,238,232,0.04)',
              border: '1px solid rgba(240,238,232,0.14)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.8125rem',
              color: 'var(--paper)',
              textDecoration: 'none',
              backdropFilter: 'blur(6px)',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34,211,238,0.08)'
              e.currentTarget.style.borderColor = 'rgba(34,211,238,0.35)'
              e.currentTarget.style.color = '#22d3ee'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(240,238,232,0.04)'
              e.currentTarget.style.borderColor = 'rgba(240,238,232,0.14)'
              e.currentTarget.style.color = 'var(--paper)'
            }}
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </div>

      {children}
    </>
  )
}
