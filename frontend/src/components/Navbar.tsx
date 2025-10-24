import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail, Globe } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

const socialIcons = [
  { Icon: Github, label: 'GitHub', href: '#', color: 'hover:text-gray-200' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
  { Icon: Mail, label: 'Email', href: 'mailto:prithraj120@gmail.com', color: 'hover:text-red-400' },
  { Icon: Globe, label: 'Website', href: '#', color: 'hover:text-green-400' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const leftUnderlineRef = useRef<HTMLSpanElement | null>(null)
  const rightUnderlineRef = useRef<HTMLSpanElement | null>(null)
  const leftLinksRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const rightLinksRef = useRef<Record<string, HTMLButtonElement | null>>({})
  const navRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: navRef })
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.8])

  // Scroll handler for active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      
      // Get all sections
      const sections = navItems.map(item => ({
        id: item.id === 'home' ? 'home' : item.id,
        element: item.id === 'home' ? document.body : document.getElementById(item.id)
      })).filter(section => section.element)
      
      // Find the section currently in view
      const scrollPosition = window.scrollY + 150 // Offset for navbar height
      
      let activeSection = 'home' // Default to home
      
      for (const section of sections) {
        if (section.element && section.id !== 'home') {
          const rect = section.element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          
          if (scrollPosition >= elementTop - 100) {
            activeSection = section.id
          }
        }
      }
      
      // Special case for home section (top of page)
      if (window.scrollY < 100) {
        activeSection = 'home'
      }
      
      setActive(activeSection)
    }
    
    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
    setActive(id)
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, section: 'left' | 'right') => {
    const elTarget = e.currentTarget as HTMLAnchorElement
    const rect = elTarget.getBoundingClientRect()
    const parentRect = elTarget.parentElement!.getBoundingClientRect()
    
    if (section === 'left' && leftUnderlineRef.current) {
      leftUnderlineRef.current.style.width = `${rect.width}px`
      leftUnderlineRef.current.style.left = `${rect.left - parentRect.left}px`
    } else if (section === 'right' && rightUnderlineRef.current) {
      rightUnderlineRef.current.style.width = `${rect.width}px`
      rightUnderlineRef.current.style.left = `${rect.left - parentRect.left}px`
    }
  }

  // Update underline position when active section changes
  useEffect(() => {
    const leftItems = navItems.slice(0, 3)
    const rightItems = navItems.slice(3)
    
    const activeLeftItem = leftItems.find(item => item.id === active)
    const activeRightItem = rightItems.find(item => item.id === active)
    
    if (activeLeftItem && leftLinksRef.current[active] && leftUnderlineRef.current) {
      const el = leftLinksRef.current[active]
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement!.getBoundingClientRect()
      leftUnderlineRef.current.style.width = `${rect.width}px`
      leftUnderlineRef.current.style.left = `${rect.left - parentRect.left}px`
    }
    
    if (activeRightItem && rightLinksRef.current[active] && rightUnderlineRef.current) {
      const el = rightLinksRef.current[active]
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement!.getBoundingClientRect()
      rightUnderlineRef.current.style.width = `${rect.width}px`
      rightUnderlineRef.current.style.left = `${rect.left - parentRect.left}px`
    }
  }, [active])

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-lg border-b border-white/15 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
        style={{ opacity: backgroundOpacity }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left Navigation */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-4 relative">
            <motion.span 
              ref={leftUnderlineRef} 
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out" 
              initial={{ width: 0 }}
            />
            {navItems.slice(0, 3).map((item) => (
              <NavLink
                key={item.id}
                ref={(el) => {
                  if (el) leftLinksRef.current[item.id] = el as any;
                }}
                to={item.id === 'home' ? '/' : `/${item.id}`}
                onClick={(e) => handleNavLinkClick(e, 'left')}
                className={({ isActive }) => `
                  relative px-3 py-2 text-sm nav-text transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
                `}
                aria-current={item.id === active ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link to="/" className="group relative">
            <div className="brand-display text-2xl font-bold tracking-wider transform transition-all duration-300 group-hover:scale-105">
              <span className="text-gray-300 drop-shadow-lg" 
                    style={{ 
                      fontFamily: "'Space Grotesk', 'Outfit', 'Inter', system-ui, sans-serif",
                      fontWeight: '700',
                      letterSpacing: '0.05em',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.1)'
                    }}>
                {'</'}
              </span>
              <span className="text-gray-200 drop-shadow-lg relative" 
                    style={{ 
                      fontFamily: "'Space Grotesk', 'Outfit', 'Inter', system-ui, sans-serif",
                      fontWeight: '800',
                      letterSpacing: '0.02em',
                      textShadow: '0 2px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.15)',
                      filter: 'brightness(1.1) contrast(1.2)'
                    }}>
                PRITHVI
                {/* Subtle animated underline for the name */}
                <div className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-60 animate-pulse"></div>
              </span>
              <span className="text-gray-300 drop-shadow-lg" 
                    style={{ 
                      fontFamily: "'Space Grotesk', 'Outfit', 'Inter', system-ui, sans-serif",
                      fontWeight: '700',
                      letterSpacing: '0.05em',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.1)'
                    }}>
                {'>'}
              </span>
            </div>
            {/* Animated underline effect */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500 group-hover:w-full"></div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-xl"></div>
          </Link>
        </div>

        {/* Right Navigation & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-4 relative">
            <motion.span 
              ref={rightUnderlineRef} 
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out" 
              initial={{ width: 0 }}
            />
            {navItems.slice(3).map((item) => (
              <NavLink
                key={item.id}
                ref={(el) => {
                  if (el) rightLinksRef.current[item.id] = el as any;
                }}
                to={item.id === 'home' ? '/' : `/${item.id}`}
                onClick={(e) => handleNavLinkClick(e, 'right')}
                className={({ isActive }) => `
                  relative px-3 py-2 text-sm nav-text transition-colors duration-200
                  ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
                `}
                aria-current={item.id === active ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-3 ml-4">
          <div className="hidden md:flex items-center gap-2">
            {socialIcons.map(({ Icon, label, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className={`p-2 text-white/70 ${color} transition-colors relative group`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="size-5" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-xs bg-gray-900/90 text-white px-2 py-1 rounded-md shadow-lg">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>


          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <motion.button 
              onClick={() => setOpen((v) => !v)} 
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white/70 hover:text-white"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </motion.button>
          </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: open ? 'auto' : 0, 
          opacity: open ? 1 : 0,
          scaleY: open ? 1 : 0.95
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="md:hidden overflow-hidden border-t border-white/15 bg-gray-900/90 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
          {navItems.map((item, idx) => (
            <motion.button
              key={item.id}
              onClick={() => handleClick(item.id)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx, type: 'spring', stiffness: 100 }}
              className="text-left text-sm font-semibold py-3 px-4 rounded-lg hover:bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white/80 hover:text-white transition-all"
            >
              {item.label}
            </motion.button>
          ))}
          {/* Mobile Social Icons */}
          <div className="flex gap-3 mt-4 justify-center">
            {socialIcons.map(({ Icon, label, href, color }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className={`p-2 text-white/70 ${color} transition-colors`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + navItems.length) }}
              >
                <Icon className="size-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}