import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const, // ✅ cubic bezier is fine
    },
  },
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      {/* Back to top */}
      <div className="flex justify-center -translate-y-1/2">
        <motion.button
          onClick={scrollTop}
          whileHover={{ scale: 1.08, boxShadow: '0 0 18px rgba(6,182,212,0.35)' }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 border border-gray-700 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 text-xs font-mono tracking-widest uppercase transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Back to top
        </motion.button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 pb-8 text-xs sm:text-sm sm:flex-row"
      >
        <motion.span
          variants={item}
          className="text-gray-500 font-mono"
        >
          © {new Date().getFullYear()} Prithviraj Verma — Built with React & TypeScript
        </motion.span>
        <motion.div variants={item} className="flex gap-4 sm:gap-6">
          {[
            { href: 'https://github.com/PR-ODINSON', Icon: FaGithub, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/prithviraj-verma-b58707289/', Icon: FaLinkedin, label: 'LinkedIn' },
            { href: 'https://twitter.com', Icon: FaTwitter, label: 'Twitter' },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: '#22d3ee' }}
              className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-colors"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">{label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  )
}
