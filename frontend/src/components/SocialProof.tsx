// SocialProof.tsx — Ported to reference .marquee-wrap / .marquee pattern
// Dark background, scrolling uppercase skill keywords, pure CSS animation, no Framer Motion.

const SKILLS = [
  'PyTorch', 'Deep Learning', 'Computer Vision', 'EEG Signal Processing',
  'Transformers', 'LLMs', 'RAG', 'FastAPI', 'React', 'TypeScript',
  'Docker', 'AWS', 'OpenCV', 'Scikit-learn', 'IEEE Published',
  'Biomedical AI', 'Explainable AI', 'Edge Deployment', 'Agentic Systems',
  'Full-Stack ML', 'Python', 'SQL', 'MongoDB', 'Node.js', 'Vite',
]

// Duplicate for seamless loop
const ITEMS = [...SKILLS, ...SKILLS]

export default function SocialProof() {
  return (
    <div className="marquee-wrap" style={{ padding: '1rem 0' }}>
      <div className="marquee-track">
        {ITEMS.map((skill, i) => (
          <span key={i} className="marquee-item">
            {skill}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
