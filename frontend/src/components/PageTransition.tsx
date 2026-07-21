// PageTransition — subtle fade + tiny lift on route changes (and mount)
// Used to wrap Routes so any future multi-route setup animates cleanly.

import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
