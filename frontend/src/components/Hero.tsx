import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import NeuralNetworkViz from './NeuralNetworkViz'
import RotatingText from './RotatingText'

// ── Animated count-up ────────────────────────────────────
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef<number | null>(null)
  useEffect(() => {
    if (target === 0) { setCount(0); return }
    startRef.current = null
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const p = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])
  return count
}

function StatCard({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const count = useCounter(started ? value : 0)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums leading-none">
        {count}{suffix}
      </p>
      <p className="text-[10px] sm:text-xs text-gray-500 mt-1 tracking-wider uppercase">{label}</p>
    </motion.div>
  )
}

// ── Animation variants ───────────────────────────────────
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
}
const item = {
  hidden: { y: 28, opacity: 0 },
  show:  { y: 0,  opacity: 1 },
}

const stats = [
  { value: 8,  suffix: '+',  label: 'Projects' },
  { value: 3,  suffix: '',   label: 'Publications' },
  { value: 6,  suffix: '+',  label: 'Internships' },
  { value: 99, suffix: '%',  label: 'ML Accuracy' },
]

const roles = ['AI / ML Engineer', 'Full-Stack Developer', 'Research Scientist', 'LLM Architect']

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden min-h-screen flex items-center"
      style={{ background: 'linear-gradient(160deg, #05070f 0%, #0b0e1a 60%, #070a14 100%)' }}
    >
      {/* Animated dot grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[15%] top-[-5%] h-[36rem] w-[36rem] rounded-full bg-gradient-to-r from-cyan-600/12 to-indigo-600/12 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[5%] bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-l from-violet-600/12 to-purple-700/12 blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, -22, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute left-[55%] top-[45%] h-[18rem] w-[18rem] rounded-full bg-gradient-to-r from-blue-500/6 to-cyan-500/6 blur-2xl"
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-12 sm:py-16">
          
          {/* ── Text Content ─────────────────────────── */}
          <div className="order-2 lg:order-1">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center lg:text-left space-y-5 sm:space-y-6"
            >
              {/* Status badge */}
              <motion.div variants={item} transition={{ duration: 0.6 }} className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  Available for Opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={item}
                transition={{ duration: 0.8 }}
                className="heading-xl text-white leading-[1.05]"
              >
                Prithviraj{' '}
                <span className="gradient-text">Verma</span>
              </motion.h1>

              {/* Rotating role */}
              <motion.div
                variants={item}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-2 text-base sm:text-lg text-gray-400"
              >
                <span className="text-gray-600 font-mono text-sm">{'<'}</span>
                <RotatingText
                  texts={roles}
                  mainClassName="text-cyan-300 font-semibold tracking-wide"
                  rotationInterval={2600}
                />
                <span className="text-gray-600 font-mono text-sm">{'/>'}</span>
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={item}
                transition={{ duration: 0.8 }}
                className="body-base text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Building <span className="text-white font-medium">production-grade AI/ML systems</span> — from IEEE-published biomedical research to LLM-powered enterprise automation. Pre-final year at IITRAM turning research into{' '}
                <span className="text-cyan-400 font-medium">scalable reality</span>.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={item}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-4 gap-2 sm:gap-4 py-4 border-y border-gray-800/60 max-w-lg mx-auto lg:mx-0"
              >
                {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={item}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(6,182,212,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="btn btn-primary btn-glow w-full sm:w-auto text-center"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 18px rgba(6,182,212,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="btn btn-secondary w-full sm:w-auto text-center"
                >
                  Get in Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Neural Network Visualization ─────────── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <NeuralNetworkViz />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600 pointer-events-none"
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] tracking-[0.2em] font-mono uppercase">Scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-gray-600 to-transparent" />
        <motion.div
          className="w-1 h-1 rounded-full bg-cyan-500/60"
          animate={{ scale: [1, 1.6, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}