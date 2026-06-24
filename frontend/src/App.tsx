import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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

// Section order: Hero → Research → Projects → Experience → Achievements → Leadership → Contact

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
                <Research />
                <Projects />
                <Experience />
                <Achievements />
                <Leadership />
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
