// Leadership.tsx — light section, simple 3-column grid, no neon/glow

const roles = [
  {
    title: 'Student Coordinator',
    org: 'Career Development Centre (CDC), IITRAM',
    period: 'Aug 2023 – Jun 2026',
    description: 'Coordinating career development activities for students at IITRAM — placement preparation, industry connects, and soft-skills workshops.',
  },
  {
    title: 'Student Coordinator — Alumni Relations',
    org: 'IITRAM',
    period: 'Jun 2024 – Present',
    description: 'Building bridges between current students and the alumni network for mentorship, networking events, and community growth.',
  },
  {
    title: 'AI/ML Team Lead',
    org: 'Tekstra Coding Club, IITRAM',
    period: 'Aug 2023 – Dec 2025',
    description: 'Leading the AI/ML vertical — mentoring 50+ students, organising workshops, talks, and hackathons to build a coding and AI culture.',
  },
  {
    title: 'Campus Mantri',
    org: 'GeeksforGeeks',
    period: 'Jun 2024 – Dec 2024',
    description: 'Promoting GfG learning resources, coordinating coding events, and supporting students in technical interview preparation.',
  },
  {
    title: 'Campus Ambassador',
    org: 'Unstop',
    period: 'Jun 2024 – Dec 2024',
    description: 'Organising competitions, hackathons, and quizzes; encouraging student participation in national-level opportunities.',
  },
  {
    title: 'Google Student Ambassador',
    org: 'Google',
    period: '2024',
    description: 'Selected as Google Student Ambassador — promoting Google technologies and organising developer events on campus.',
  },
]

export default function Leadership() {
  return (
    <section id="leadership" className="bg-section-light section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Positions of Responsibility</p>
          <h2 className="section-head section-head-light">Leadership</h2>
        </div>

        {/* Grid */}
        <div className="leadership-grid reveal-group">
          {roles.map(role => (
            <div key={role.title + role.org} className="leadership-card reveal-item">
              <h3 className="leadership-title">{role.title}</h3>
              <p className="leadership-org">{role.org}</p>
              <p className="leadership-period">{role.period}</p>
              <p className="leadership-desc">{role.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
