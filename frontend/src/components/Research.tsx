// Research.tsx — Premium dark AI portfolio treatment
// Pixel Card + Electric Border + Scroll reveal + Link Preview

import React, { useEffect, useRef } from 'react'
import PixelCard from './effects/PixelCard'
import ElectricBorder from './effects/ElectricBorder'

type Paper = {
  title: string
  desc: string
  venue: string
  doi?: string
  status: 'published' | 'review'
}

const papers: Paper[] = [
  {
    title: 'Automated Identification of Cyclic Alternating Patterns of Sleep Using Fusion of VGG16 and Vision Transformer',
    desc: 'Designed a hybrid CNN-ViT architecture fusing spatial feature extraction from VGG16 with global sequence modelling from Vision Transformers to automate detection of Cyclic Alternating Patterns (CAP) in overnight polysomnographic EEG recordings. Demonstrated improved detection accuracy over baseline CNN-only approaches on publicly available sleep EEG datasets.',
    venue: 'IEEE Access, 2025',
    doi: 'https://doi.org/10.1109/ACCESS.2025.3571145',
    status: 'published',
  },
  {
    title: 'PPG-Based Accurate Insomnia Detection System Using CNN With Self-Attention Mechanism and GRU',
    desc: 'Proposed a novel deep learning architecture combining convolutional layers for local PPG feature extraction, a self-attention mechanism for long-range dependency modelling, and Gated Recurrent Units for temporal sequence learning. System achieves high-accuracy insomnia detection from wrist-worn PPG signals, enabling non-invasive, wearable-compatible sleep disorder screening.',
    venue: 'IEEE Access, 2025',
    doi: 'https://doi.org/10.1109/ACCESS.2025.3598863',
    status: 'published',
  },
  {
    title: 'Automated Sleep Stage Classification Using Machine Learning and Signal Processing Techniques',
    desc: 'Developed a biorthogonal wavelet decomposition pipeline for feature extraction from polysomnographic EEG signals, combined with ensemble machine learning classifiers for multi-class sleep stage classification. Evaluated on standard benchmark datasets against established sleep scoring criteria.',
    venue: 'IEEE AIMV Conference, 2025',
    doi: 'https://doi.org/10.1109/AIMV66517.2025.11203559',
    status: 'published',
  },
  {
    title: 'Explainable Multimodal Deep Learning Framework for K-Complex Detection using EEG Signals',
    desc: 'Proposes a multimodal deep learning framework for automated K-complex detection in EEG signals, integrating Grad-CAM and SHAP-based explainability to generate clinician-readable saliency maps. Addresses the interpretability gap in clinical sleep scoring AI, enabling neurologists to audit and validate model decisions before deployment.',
    venue: 'Under Review',
    status: 'review',
  },
  {
    title: 'Automatic Sleep Spindle Detection Using Separable Convolutional Neural Network With EEG Signals',
    desc: 'Introduces a computationally efficient separable CNN architecture for automated sleep spindle detection, significantly reducing parameter count and inference time compared to standard CNN baselines while maintaining classification accuracy on overnight EEG recordings.',
    venue: 'Under Review',
    status: 'review',
  },
  {
    title: 'An Attention-Based Denoising Model for Diffusion Weighted Imaging',
    desc: 'Develops an attention-gated denoising network for improving signal quality in diffusion-weighted MRI scans, targeting clinical scenarios with low SNR acquisitions. Demonstrates noise reduction performance while preserving diagnostically relevant diffusion tensor features.',
    venue: 'Under Review',
    status: 'review',
  },
]

const focusAreas = [
  'Biomedical Signal Processing',
  'EEG / PPG Analysis',
  'Explainable AI (Grad-CAM, SHAP)',
  'Vision Transformers',
  'Clinical Deep Learning',
]

function DOIShort(doi: string) { return doi.replace('https://doi.org/', '') }

// Link preview on hover for DOI badges
function LinkPreviewBadge({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = React.useState(false)
  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="ieee-badge"
        data-testid="research-paper-doi"
      >
        {children}
      </a>
      {hover && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 8,
            padding: '10px 12px',
            background: 'rgba(11, 13, 24, 0.95)',
            border: '1px solid rgba(34,211,238,0.3)',
            borderRadius: 10,
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.1)',
            backdropFilter: 'blur(12px)',
            zIndex: 20,
            width: 260,
            pointerEvents: 'none',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <span style={{ display: 'block', fontSize: 11, color: '#22d3ee', fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>
            IEEE Xplore
          </span>
          <span style={{ display: 'block', fontSize: 12, color: '#F0EEE8', lineHeight: 1.4 }}>
            Open peer-reviewed paper on IEEE Xplore ↗
          </span>
        </span>
      )}
    </span>
  )
}

export default function Research() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const matchReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (matchReduced) {
      cardRefs.current.forEach(el => el?.classList.add('slide-in'))
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    cardRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transitionDelay = `${i * 80}ms`
        observer.observe(el)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="research" className="bg-section-light section-padding" style={{ position: 'relative' }}>
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--muted)' }}>IEEE Publications</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-head">Research</h2>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
              {[
                { v: '3', l: 'Published' },
                { v: '3', l: 'Under Review' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.03em', color: 'var(--accent-cyan)', lineHeight: 1, textShadow: '0 0 20px rgba(34,211,238,0.35)' }}>{s.v}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="research-layout" style={{ alignItems: 'flex-start' }}>

          {/* Left — paper list */}
          <div>
            {papers.map((p, i) => (
              <React.Fragment key={i}>
                {i === 3 && (
                  <div style={{ margin: '20px 0 28px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', whiteSpace: 'nowrap' }}>Under Review</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
                  </div>
                )}
                <div
                  ref={el => { cardRefs.current[i] = el }}
                  className={`paper-card${p.status === 'review' ? ' review-paper' : ''}`}
                  style={{ padding: '1.5rem 1.75rem', marginBottom: 16, position: 'relative' }}
                  data-testid={`research-paper-${i}`}
                >
                  <h4 className="paper-card-title">{p.title}</h4>
                  <p className="paper-card-desc">{p.desc}</p>
                  <div className="paper-card-meta">
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)', marginRight: '0.35rem', letterSpacing: '0.02em' }}>{p.venue}</span>
                    {p.doi ? (
                      <LinkPreviewBadge href={p.doi}>↗ {DOIShort(p.doi)}</LinkPreviewBadge>
                    ) : (
                      <span className="under-review-badge">Under Review</span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Right — sticky focus card with Pixel + Electric Border */}
          <div style={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
            <ElectricBorder
              color="rgba(34, 211, 238, 0.65)"
              glowColor="#22d3ee"
              speed={0.6}
              chaos={2.5}
              thickness={1.2}
              radius={16}
              glowIntensity={3}
            >
              <PixelCard colors={['#22d3ee', '#67e8f9', '#0ea5e9']} gap={8} pixelSize={2} speed={35} radius={16}>
                <div
                  className="research-focus-card reveal"
                  style={{ position: 'relative', border: 'none', background: 'transparent', padding: '1.5rem' }}
                  data-testid="research-focus-card"
                >
                  <p className="research-focus-title">Research Focus</p>
                  {focusAreas.map(area => (
                    <div key={area} className="research-focus-item">
                      <span className="research-focus-dot" style={{ background: '#22d3ee', boxShadow: '0 0 8px rgba(34,211,238,0.7)' }} />
                      {area}
                    </div>
                  ))}
                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--line)' }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                      All published work peer-reviewed and indexed in IEEE Xplore.
                    </p>
                    <a
                      href="https://ieeexplore.ieee.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-block', marginTop: '0.75rem', fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: 'var(--accent-cyan)', textDecoration: 'none', borderBottom: '1px solid rgba(34,211,238,0.4)', paddingBottom: '0.1rem' }}
                    >
                      View on IEEE Xplore ↗
                    </a>
                  </div>
                </div>
              </PixelCard>
            </ElectricBorder>
          </div>

        </div>
      </div>
    </section>
  )
}
