import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import TechDeepDive from './components/TechDeepDive'
import Research from './components/Research'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <Hero />
                  <SocialProof />
                  <Projects />
                  <TechDeepDive />
                  <Experience />
                  <Research />
                  <About />
                  <Contact />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
