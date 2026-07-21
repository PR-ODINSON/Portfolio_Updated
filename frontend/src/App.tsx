import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Loader       from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Research     from './components/Research'
import Projects     from './components/Projects'
import Experience   from './components/Experience'
import Achievements from './components/Achievements'
import Leadership   from './components/Leadership'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import PageTransition from './components/PageTransition'
import {
  WorkRoute,
  ResearchRoute,
  AboutRoute,
  ContactRoute,
} from './components/RoutePages'

function useScrollReveal() {
  const location = useLocation()
  useEffect(() => {
    // Reset any stale .in classes from a previous route so newly-mounted
    // elements can animate in properly
    document.querySelectorAll<HTMLElement>('.reveal.in, .reveal-item.in')
      .forEach(el => el.classList.remove('in'))

    // Delay observer setup so PageTransition's AnimatePresence has time to
    // commit the new route DOM. Without this, the observer runs against the
    // outgoing content and misses the new content entirely on sub-routes.
    const setup = () => {
      const singleEls = document.querySelectorAll<HTMLElement>('.reveal')
      const groupEls  = document.querySelectorAll<HTMLElement>('.reveal-group')
      if (!singleEls.length && !groupEls.length) return () => {}

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              if (e.target.classList.contains('reveal-group')) {
                const items = e.target.querySelectorAll<HTMLElement>('.reveal-item')
                items.forEach((item, idx) => {
                  setTimeout(() => item.classList.add('in'), idx * 75)
                })
              } else {
                e.target.classList.add('in')
              }
              observer.unobserve(e.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
      )
      singleEls.forEach(el => observer.observe(el))
      groupEls.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }

    const t = setTimeout(setup, 60)

    // Safety fallback: after 900ms, force-reveal any straggling elements that
    // are already in the viewport but the observer somehow missed (route
    // transitions, prefers-reduced-motion, etc.)
    const fallback = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
      })
      document.querySelectorAll<HTMLElement>('.reveal-group').forEach(group => {
        const r = group.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          group.querySelectorAll<HTMLElement>('.reveal-item:not(.in)').forEach((item, idx) => {
            setTimeout(() => item.classList.add('in'), idx * 60)
          })
        }
      })
    }, 900)

    return () => { clearTimeout(t); clearTimeout(fallback) }
  }, [location.pathname])
}

// Auto scroll-to-top on route change so each focus page starts at hero banner
function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])
  return null
}

function HomeRoute() {
  return (
    <>
      <Hero />
      <Research />
      <Projects />
      <Experience />
      <Achievements />
      <Leadership />
      <Contact />
    </>
  )
}

function MainLayout() {
  useScrollReveal()
  return (
    <>
      <Loader />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/"          element={<HomeRoute />} />
            <Route path="/work"      element={<WorkRoute />} />
            <Route path="/research"  element={<ResearchRoute />} />
            <Route path="/about"     element={<AboutRoute />} />
            <Route path="/contact"   element={<ContactRoute />} />
            <Route path="*"          element={<HomeRoute />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}
