// Research.tsx — 2-col layout: paper list (left) + sticky focus card (right)
// Paper cards with IEEE DOI badges, slide-in-left on scroll, 6 papers (3 pub + 3 review)

import React, { useEffect, useRef } from 'react'

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

function DOIShort(doi: string) {
  return doi.replace('https://doi.org/', '')
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
    <section id="research" className="bg-section-light section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--text-light-muted)' }}>IEEE Publications</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-head" style={{ color: 'var(--text-light-primary)' }}>Research</h2>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
              {[
                { v: '3', l: 'Published' },
                { v: '3', l: 'Under Review' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.03em', color: 'var(--accent-research)', lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light-muted)', marginTop: '0.2rem' }}>{s.l}</p>
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
                {/* Divider between published (0-2) and under review (3-5) */}
                {i === 3 && (
                  <div style={{ margin: '16px 0 24px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
                    <span style={{ fontSize: 10, fontFamily: "'Inter',sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-light-muted)', whiteSpace: 'nowrap' }}>Under Review</span>
                    <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
                  </div>
                )}
                <div
                  ref={el => { cardRefs.current[i] = el }}
                  className={`paper-card${p.status === 'review' ? ' review-paper' : ''}`}
                >
                  <h4 className="paper-card-title">{p.title}</h4>
                  <p className="paper-card-desc">{p.desc}</p>
                  <div className="paper-card-meta">
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: 'var(--text-light-muted)', marginRight: '0.25rem' }}>{p.venue}</span>
                    {p.doi ? (
                      <a
                        href={p.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ieee-badge"
                      >
                        ↗ {DOIShort(p.doi)}
                      </a>
                    ) : (
                      <span className="under-review-badge">Under Review</span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Right — sticky focus card */}
          <div style={{ position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
            <div className="research-focus-card reveal">
              <p className="research-focus-title">Research Focus</p>
              {focusAreas.map(area => (
                <div key={area} className="research-focus-item">
                  <span className="research-focus-dot" />
                  {area}
                </div>
              ))}
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: 'var(--text-light-muted)', lineHeight: 1.6 }}>
                  All published work peer-reviewed and indexed in IEEE Xplore.
                </p>
                <a
                  href="https://ieeexplore.ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '0.75rem', fontFamily: "'Inter',sans-serif", fontSize: '0.75rem', color: 'var(--accent-research)', textDecoration: 'none', borderBottom: '1px solid rgba(0,180,160,0.3)', paddingBottom: '0.1rem' }}
                >
                  View on IEEE Xplore ↗
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
