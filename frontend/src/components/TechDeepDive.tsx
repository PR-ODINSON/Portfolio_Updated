// TechDeepDive.tsx → Focus section (dark accordion)
// 4 capability areas — pure CSS max-height accordion, no Framer Motion.

import { useState } from 'react'

const capabilities = [
  {
    id: 'biomedical',
    title: 'Biomedical Deep Learning',
    body: 'IEEE-published research on EEG/ECG sleep-stage classification reaching 99.2% accuracy. Hybrid VGG16 + Vision Transformer architecture with custom cross-attention fusion — 40% smaller than baseline while outperforming it. Published in IEEE Access (IF 3.4).',
  },
  {
    id: 'xai',
    title: 'Explainable AI',
    body: 'Building interpretable models for high-stakes domains where black-box outputs are unacceptable. Grad-CAM, SHAP, and attention visualisation pipelines applied to clinical AI and enterprise compliance systems.',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack AI Products',
    body: 'End-to-end product engineering — FastAPI/Node.js backends, React frontends, RAG pipelines, LLM orchestration with OpenAI/HuggingFace. Deployed to AWS/GCP serving 500+ DAU. From ML prototype to production in weeks, not months.',
  },
  {
    id: 'edge',
    title: 'Computer Vision on Edge',
    body: 'Real-time facial recognition (>98% accuracy), drone-based solar panel defect detection (75% efficiency gain), self-driving car prototype — all running on constrained hardware. Model compression, quantisation, and TensorRT optimisation.',
  },
]

export default function TechDeepDive() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  return (
    <section
      id="focus"
      className="bg-section-dark section-padding"
    >
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.75rem' }}>What I Do</p>
          <h2 className="section-head section-head-dark">
            Capability<br />Focus Areas
          </h2>
        </div>

        {/* Accordion */}
        <div className="reveal-group" style={{ borderTop: '1px solid var(--line)' }}>
          {capabilities.map(cap => {
            const isOpen = openId === cap.id
            return (
              <div key={cap.id} className={`focus-item reveal-item${isOpen ? ' open' : ''}`}>
                <button
                  className="focus-trigger"
                  onClick={() => toggle(cap.id)}
                  aria-expanded={isOpen}
                >
                  <span>{cap.title}</span>
                  <svg
                    className="focus-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className="focus-body" aria-hidden={!isOpen}>
                  <p className="focus-body-inner">{cap.body}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
