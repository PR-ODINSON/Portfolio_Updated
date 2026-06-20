// Achievements.tsx — condensed dark section
// Light restrained card grid, no neon/glow, consistent with Leadership discipline.
// Surfaces: 2× Research Award, IIT Bombay 1st Runner-Up, hackathon wins + more.
// Hero stat chip "2× Research Award" is a teaser; this is the full section.

const achievements = [
  {
    label: 'Undergraduate Research Award × 2',
    sub: 'Awarded twice by IITRAM for outstanding AI/ML research contributions and IEEE publications.',
    year: '2024 & 2025',
  },
  {
    label: '1st Runner Up — IIT Bombay Techfest',
    sub: 'National hackathon hosted by IIT Bombay. 500+ participants across India.',
    year: '2024',
  },
  {
    label: 'Winner — Flux Hackathon',
    sub: 'Won with an AI-powered solution for real-world problem solving.',
    year: '2024',
  },
  {
    label: 'Top 10 — Odoo Hackathon',
    sub: 'Secured Top 10 position with an enterprise-level business solution.',
    year: '2024',
  },
  {
    label: 'Research Internship — IIT Delhi',
    sub: 'Selected for competitive remote research internship resulting in 3 IEEE publications.',
    year: '2025',
  },
  {
    label: 'Top 10 Percentile — IIT Guwahati',
    sub: 'Achieved Top 10 Percentile in competitive examination at IIT Guwahati.',
    year: '2024',
  },
  {
    label: 'Google Student Ambassador',
    sub: 'Selected to promote Google technologies and organise developer events on campus.',
    year: '2024',
  },
  {
    label: 'Arcade Legend — Google Cloud',
    sub: 'Earned Arcade Legend status for exceptional performance in Cloud computing challenges.',
    year: '2024',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="bg-section-dark section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.75rem' }}>Recognition</p>
          <h2 className="section-head section-head-dark">Achievements</h2>
        </div>

        {/* Grid */}
        <div className="achievements-grid reveal-group">
          {achievements.map(a => (
            <div key={a.label} className="achievement-card reveal-item">
              <p className="achievement-label">{a.label}</p>
              <p className="achievement-sub">{a.sub}</p>
              <span className="achievement-year">{a.year}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
