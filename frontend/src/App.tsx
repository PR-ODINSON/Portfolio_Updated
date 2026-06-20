import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Loader      from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import SocialProof from './components/SocialProof'
import TechDeepDive from './components/TechDeepDive'  // Focus section
import Projects    from './components/Projects'
import Research    from './components/Research'
import Experience  from './components/Experience'
import Leadership  from './components/Leadership'
import Achievements from './components/Achievements'
import Contact     from './components/Contact'
import Footer      from './components/Footer'

// Section order (light/dark alternating):
// Hero (dark) → Marquee (dark) → Focus (dark) → Projects (light) →
// Research (light) → Experience (dark) → Leadership (light) →
// Achievements (dark) → Contact CTA (dark/black) → Footer (black)

function useScrollReveal() {
  useEffect(() => {
    const singleEls = document.querySelectorAll<HTMLElement>('.reveal')
    const groupEls  = document.querySelectorAll<HTMLElement>('.reveal-group')
    if (!singleEls.length && !groupEls.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            if (e.target.classList.contains('reveal-group')) {
              const items = e.target.querySelectorAll<HTMLElement>('.reveal-item')
              items.forEach((item, idx) => {
                setTimeout(() => {
                  item.classList.add('in')
                }, idx * 75)
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
  }, [])
}

function MainLayout() {
  useScrollReveal()
  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Hero />
                <SocialProof />
                <TechDeepDive />
                <Projects />
                <Research />
                <Experience />
                <Leadership />
                <Achievements />
                <Contact />
              </>
            }
          />
        </Routes>
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
