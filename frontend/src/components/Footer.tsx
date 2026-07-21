// Footer.tsx — minimal 2-column dark footer

import { SiGithub } from 'react-icons/si'
import { FaLinkedin as SiLinkedin } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-container">
        <div className="footer-inner">
          <p className="footer-copy">© 2026 Prithviraj Verma. All rights reserved.</p>
          <nav className="footer-links" aria-label="Footer links">
            <a
              className="footer-link"
              href="https://github.com/PR-ODINSON"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <SiGithub size={13} /> GitHub
            </a>
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/prithviraj-verma-b58707289/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <SiLinkedin size={13} /> LinkedIn
            </a>
            <a className="footer-link" href="/Prithviraj_CV.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
