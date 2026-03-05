import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FiMail } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const LEFT_ITEMS = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
]
const RIGHT_ITEMS = [
  { id: 'achievements', label: 'Achievements' },
  { id: 'research',     label: 'Research'     },
  { id: 'contact',      label: 'Contact'      },
]
const ALL_ITEMS = [...LEFT_ITEMS, ...RIGHT_ITEMS]

const SOCIALS = [
  { href: 'https://github.com/PR-ODINSON',                           Icon: SiGithub,   label: 'GitHub',   cls: 'hover:text-white'    },
  { href: 'https://www.linkedin.com/in/prithviraj-verma-b58707289/', Icon: SiLinkedin, label: 'LinkedIn', cls: 'hover:text-blue-400' },
  { href: 'mailto:prithraj120@gmail.com',                            Icon: FiMail,     label: 'Email',    cls: 'hover:text-cyan-400' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState<string>('')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Nav background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' }
    )
    ALL_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // On homepage scroll into view; on a sub-route let NavLink route normally
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  const baseLinkCls = 'relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 select-none'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/85 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_30px_rgba(0,0,0,0.5)]'
          : ''
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 origin-left pointer-events-none"
        style={{ scaleX }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">

        {/* ── Left nav items ── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {LEFT_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
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
            </NavLink>
          ))}
        </div>

        {/* ── Center logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group font-mono font-bold text-lg sm:text-xl tracking-wider select-none"
        >
          <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-200">{'</'}</span>
          <span className="text-white group-hover:text-gray-100 transition-colors duration-200">PRITHVI</span>
          <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-200">{'>'}</span>
        </button>

        {/* ── Right nav + socials + mobile toggle ── */}
        <div className="flex items-center gap-1">

          {/* Right nav items */}
          <div className="hidden lg:flex items-center gap-0.5">
            {RIGHT_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
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
              </NavLink>
            ))}
          </div>

          {/* Social icons — desktop only */}
          <div className="hidden lg:flex items-center gap-0.5 ml-3 pl-3 border-l border-white/10">
            {SOCIALS.map(({ href, Icon, label, cls }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 text-white/40 ${cls} transition-colors duration-200`}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

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
            className="lg:hidden overflow-hidden border-t border-white/10 bg-gray-950/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-1 max-w-7xl mx-auto">
              {ALL_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={`/${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
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
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile socials */}
              <div className="flex gap-1 pt-3 mt-2 border-t border-white/10">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="p-2.5 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}