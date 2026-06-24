// Achievements.tsx — curated dark section with achievements and certifications from LinkedIn

const achievements = [
  {
    label: 'Undergraduate Research Award × 2',
    sub: 'Awarded twice by IITRAM for outstanding AI/ML research contributions and 3 IEEE publications.',
    year: '2024 & 2025',
    accent: true,
  },
  {
    label: '3 IEEE Publications as Undergrad',
    sub: 'First pre-final year student in cohort to publish 3 peer-reviewed papers in IEEE Access and IEEE AIMV.',
    year: '2025',
    accent: true,
  },
  {
    label: '1st Runner-Up — IIT Bombay (Smart India Hackathon)',
    sub: 'National-level hackathon at IIT Bombay. 500+ participants across India. AI TeleMedicine Platform.',
    year: '2024',
  },
  {
    label: 'Research Internship — IIT Delhi',
    sub: 'Competitively selected for research internship at IIT Delhi; resulted in 2 IEEE manuscript submissions.',
    year: '2025',
  },
  {
    label: '4 Hackathon Wins — AI / Healthcare / Full-Stack',
    sub: 'Won across domains: Flux Hackathon, Odoo Top 10, IIT Bombay SIH, and one AI-healthcare track win.',
    year: '2023–2025',
  },
]

const certifications = [
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    skills: 'Generative AI, Prompt Engineering, AI Ethics, Productivity Tools',
  },
  {
    title: 'Generative AI: Introduction & Applications',
    issuer: 'IBM',
    skills: 'Large Language Models, Prompt Tuning, Generative AI Use-Cases',
  },
  {
    title: 'Data Visualization with Python',
    issuer: 'IBM',
    skills: 'Matplotlib, Seaborn, Folium, Dashboard Design, Python APIs',
  },
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI',
    skills: 'Linear Regression, Logistic Classification, Regularization, Cost Functions',
  },
  {
    title: 'Advanced Learning Algorithms',
    issuer: 'DeepLearning.AI',
    skills: 'Neural Networks, Backpropagation, Decision Trees, Random Forests, XGBoost',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="bg-section-dark section-padding">
      <div className="section-container">

        {/* Section Title */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.75rem' }}>Recognition</p>
          <h2 className="section-head section-head-dark">Achievements</h2>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid reveal-group">
          {achievements.map((a, idx) => (
            <div
              key={a.label}
              className="achievement-card reveal-item"
              style={idx < 2 ? { borderTop: '1.5px solid #00B4A0' } : undefined}
            >
              {a.accent && (
                <div style={{
                  width: 24,
                  height: 2,
                  background: 'var(--accent-research)',
                  marginBottom: '0.75rem',
                  borderRadius: 1,
                }} />
              )}
              <p className="achievement-label">{a.label}</p>
              <p className="achievement-sub">{a.sub}</p>
              <span className="achievement-year">{a.year}</span>
            </div>
          ))}
        </div>

        {/* Certifications Sub-section */}
        <div className="reveal" style={{ marginTop: '5rem', marginBottom: '2rem' }}>
          <p className="eyebrow eyebrow-light" style={{ marginBottom: '0.5rem' }}>Verified Expertise</p>
          <h3 className="section-head section-head-dark" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Certifications</h3>
        </div>

        {/* Certifications Grid */}
        <div className="certs-grid reveal-group">
          {certifications.map(c => (
            <div key={c.title} className="cert-card reveal-item">
              <div>
                <h4 className="cert-title">{c.title}</h4>
                <p className="cert-issuer">{c.issuer}</p>
              </div>
              <p className="cert-skills">{c.skills}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
