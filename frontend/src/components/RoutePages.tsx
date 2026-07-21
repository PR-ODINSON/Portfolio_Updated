// Sub-route pages that reuse existing section components inside a FocusPage
// wrapper. Keeps content authored in one place and lets the PageTransition
// animate between routes.

import FocusPage from './FocusPage'
import Projects from './Projects'
import Research from './Research'
import Experience from './Experience'
import Achievements from './Achievements'
import Leadership from './Leadership'
import Contact from './Contact'

export function WorkRoute() {
  return (
    <FocusPage eyebrow="Selected Work" title="Projects & Deployments">
      <Projects />
    </FocusPage>
  )
}

export function ResearchRoute() {
  return (
    <FocusPage eyebrow="IEEE Publications" title="Research Papers & Focus">
      <Research />
    </FocusPage>
  )
}

export function AboutRoute() {
  return (
    <FocusPage eyebrow="About" title="Experience, Achievements & Leadership">
      <Experience />
      <Achievements />
      <Leadership />
    </FocusPage>
  )
}

export function ContactRoute() {
  return (
    <FocusPage eyebrow="Contact" title="Let's build something real">
      <Contact />
    </FocusPage>
  )
}
