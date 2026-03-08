import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { SiGithub, SiLinkedin } from 'react-icons/si'

const NAV_ITEMS = [
  { id: 'projects',   label: 'Projects'   },
  { id: 'experience', label: 'Experience' },
  { id: 'research',   label: 'Research'   },
  { id: 'about',      label: 'Skills'     },
  { id: 'contact',    label: 'Contact'    },
]

// Replace this URL with your actual hosted resume PDF
const RESUME_URL = 'https://drive.google.com/file/d/YOUR_RESUME_FILE_ID/view'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState<string>('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  const baseLinkCls = 'relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 select-none cursor-pointer'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070f]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_2px_30px_rgba(0,0,0,0.6)]'
          : ''
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 origin-left pointer-events-none"
        style={{ scaleX }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">

        {/* ── Logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group font-mono font-bold text-lg sm:text-xl tracking-wider select-none"
        >
          <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-200">{'</'}</span>
          <span className="text-white group-hover:text-gray-100 transition-colors duration-200">PRITHVI</span>
          <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-200">{'>'}</span>
        </button>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`${baseLinkCls} ${active === item.id ? 'text-white' : 'text-white/50 hover:text-white/90'}`}
            >
              {active === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md bg-white/10 border border-white/10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* ── Right side: socials + Resume ── */}
        <div className="flex items-center gap-2">

          {/* Social icons */}
          <div className="hidden lg:flex items-center gap-1 mr-2">
            <motion.a
              href="https://github.com/PR-ODINSON"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              className="p-2 text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <SiGithub className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/prithviraj-verma-b58707289/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              className="p-2 text-white/40 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Resume CTA */}
          <motion.a
            href={RESUME_URL}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/60 text-sm font-medium transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors ml-1"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-[#05070f]/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      active === item.id
                        ? 'bg-white/10 text-white border border-white/10'
                        : 'text-white/55 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-gray-700 mr-3 font-mono text-xs tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </button>
                </motion.div>
              ))}

              <div className="flex items-center gap-2 pt-3 mt-2 border-t border-white/10">
                <a
                  href={RESUME_URL}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <a href="https://github.com/PR-ODINSON" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5" aria-label="GitHub">
                  <SiGithub className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/prithviraj-verma-b58707289/" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 text-white/40 hover:text-blue-400 rounded-lg hover:bg-white/5" aria-label="LinkedIn">
                  <SiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}