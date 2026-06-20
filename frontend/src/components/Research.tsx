// Research.tsx — pub-list table layout (light section)
// 4 columns: index | title (linked) | venue | status pill
// Published: dark pill; Under Review: transparent muted border

const publishedPapers = [
  {
    title: "Automated Identification of Cyclic Alternating Patterns of Sleep Using Fusion of VGG16 and Vision Transformer",
    venue: "IEEE Access, 2025",
    doi: "https://doi.org/10.1109/ACCESS.2025.3571145",
    status: "published" as const,
  },
  {
    title: "PPG-Based Accurate Insomnia Detection System Using CNN With Self-Attention Mechanism and Gated Recurrent Units",
    venue: "IEEE Access, 2025",
    doi: "https://doi.org/10.1109/ACCESS.2025.3598863",
    status: "published" as const,
  },
  {
    title: "Automated Sleep Stage Classification Using Biorthogonal Wavelet Decomposition and Machine Learning",
    venue: "IEEE AIMV Conference, 2025",
    doi: "https://doi.org/10.1109/AIMV66517.2025.11203559",
    status: "published" as const,
  },
]

const underReviewPapers = [
  {
    title: "Explainable Multimodal Deep Learning Framework for K-Complex Detection using EEG Signals",
    venue: "Under Review",
    doi: null,
    status: "review" as const,
  },
  {
    title: "Automatic Sleep Spindle Detection Using Separable Convolutional Neural Network With EEG Signals",
    venue: "Under Review",
    doi: null,
    status: "review" as const,
  },
  {
    title: "An Attention-Based Denoising Model for Diffusion Weighted Imaging",
    venue: "Under Review",
    doi: null,
    status: "review" as const,
  },
]

const allPapers = [...publishedPapers, ...underReviewPapers]

export default function Research() {
  return (
    <section id="research" className="bg-section-light section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>IEEE Publications</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-head section-head-light">Research</h2>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
              {[
                { v: '3', l: 'Published' },
                { v: '3', l: 'Under Review' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.04em', color: 'var(--ink)', lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="pub-list reveal-group">
          {allPapers.map((p, i) => (
            <div key={p.title} className="pub-row reveal-item">
              <span className="pub-idx">{String(i + 1).padStart(2, '0')}</span>

              <div>
                {p.doi ? (
                  <a href={p.doi} target="_blank" rel="noopener noreferrer" className="pub-title">
                    {p.title} ↗
                  </a>
                ) : (
                  <span className="pub-title" style={{ cursor: 'default', color: 'var(--muted)' }}>
                    {p.title}
                  </span>
                )}
              </div>

              <span className="pub-venue">{p.venue}</span>

              <div className="pub-status-wrap">
                <span className={`pub-status ${p.status}`}>
                  {p.status === 'published' ? 'Published' : 'In Review'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
