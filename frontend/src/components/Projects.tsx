import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa'

type Project = {
  title: string
  tagline: string
  problem: string
  approach: string
  impact: string
  image: string
  github?: string
  demo?: string
  tech: string[]
  highlight: string
}

const projects: Project[] = [
  {
    title: 'Garnet AI · Vendor Onboarding Platform',
    tagline: 'LLM-powered enterprise automation at scale',
    problem: 'Enterprise vendor onboarding took 2+ weeks per client, requiring manual compliance review of 50–100-page regulatory documents.',
    approach: 'Built an LLM pipeline using RAG (Retrieval-Augmented Generation) to parse compliance docs, extract obligations, and auto-fill onboarding forms. Deployed on AWS with a React + Node.js frontend serving real enterprise clients.',
    impact: '60% reduction in onboarding time. 200+ enterprise clients processed monthly. 95% accuracy in regulatory document analysis.',
    image: '/projects/CareerBuddy.png',
    github: 'https://github.com/PR-ODINSON/CareerBuddy',
    demo: '#',
    tech: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'RAG', 'Docker', 'AWS'],
    highlight: '60% faster onboarding',
  },
  {
    title: 'AI Attendance System',
    tagline: 'Real-time face recognition for enterprise campuses',
    problem: 'Proxy check-ins and manual attendance tracking were causing compliance issues across 3 industry sites at Insolare Pvt. Ltd.',
    approach: 'Developed a real-time facial recognition pipeline with OpenCV and deep learning models. Integrated with live video feeds and a SQL database. Built a geospatial dashboard for site engineers.',
    impact: '>98% verification accuracy. Eliminated proxy check-ins across all 3 sites. Engineers plan maintenance 30% faster with the GIS dashboard.',
    image: '/projects/AttendanceSystem.png',
    github: 'https://github.com/PR-ODINSON/Attendance-System',
    demo: '#',
    tech: ['Python', 'OpenCV', 'Deep Learning', 'Flask', 'SQL', 'React', 'GIS'],
    highlight: '>98% accuracy',
  },
  {
    title: 'AscendOS · AI Productivity Suite',
    tagline: 'Personal AI workspace with embedded ML automation',
    problem: 'Knowledge workers lose 2–3 hours daily to repetitive scheduling, task switching, and workflow fragmentation across tools.',
    approach: 'Built an intelligent workspace that integrates ML modules for smart task prioritization, automated scheduling, and workflow pattern detection. Built on Next.js with a Flask ML backend.',
    impact: 'Automated >40% of daily workflow tasks in personal trials. Smart scheduling reduced context-switching by 35%.',
    image: '/projects/AscendOS.png',
    github: 'https://github.com/PR-ODINSON/Solo_leveling',
    demo: '#',
    tech: ['Next.js', 'Tailwind CSS', 'Flask', 'OpenAI API', 'ML', 'PostgreSQL'],
    highlight: '40% workflow automated',
  },
  {
    title: 'StartupX · Ecosystem Platform',
    tagline: 'Full-stack platform connecting founders and investors',
    problem: "Early-stage founders lack structured access to investors, mentors, and market intelligence — wasting months on cold outreach.",
    approach: 'Designed and built a full-stack marketplace with startup profiles, investor matching, mentorship scheduling, and a real-time analytics dashboard using Chart.js and MongoDB aggregations.',
    impact: 'Live at start-upx.netlify.app. Connects founders with investors and mentors through intelligent matching algorithms.',
    image: '/projects/StartupX.png',
    github: '#',
    demo: 'https://start-upx.netlify.app/',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
    highlight: 'Live in production',
  },
]

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section
      id="projects"
      className="section-padding bg-gradient-to-b from-gray-900 to-[#07090f]"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        className="section-container"
      >
        {/* Section header */}
        <motion.div variants={cardVariants} className="mb-12 sm:mb-16">
          <p className="text-xs font-mono text-cyan-500/70 uppercase tracking-widest mb-3">Selected Work</p>
          <h2 className="heading-lg text-white">
            Projects &amp; <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="mt-4 body-base text-gray-500 max-w-xl">
            Each project has a real problem, a deliberate approach, and measurable impact.
          </p>
        </motion.div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {projects.map((project) => {
            const isOpen = expanded === project.title
            const hasDemo = project.demo && project.demo !== '#'
            const hasGithub = project.github && project.github !== '#'
            return (
              <motion.article
                key={project.title}
                variants={cardVariants}
                layout
                className="group rounded-2xl border border-white/8 bg-gray-900/60 backdrop-blur-sm overflow-hidden hover:border-white/15 transition-colors duration-300"
              >
                {/* Project image */}
                <div className="relative overflow-hidden h-44 sm:h-48 bg-gray-800/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 backdrop-blur-sm">
                      {project.highlight}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {hasGithub && (
                      <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-black/50 text-white/70 hover:text-white border border-white/10 backdrop-blur-sm transition-colors"
                        aria-label="GitHub"
                        onClick={e => e.stopPropagation()}
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {hasDemo && (
                      <a
                        href={project.demo}
                        target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-black/50 text-white/70 hover:text-cyan-400 border border-white/10 backdrop-blur-sm transition-colors"
                        aria-label="Live Demo"
                        onClick={e => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-400/80 mt-1 font-medium">{project.tagline}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/6 border border-white/10 text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpanded(isOpen ? null : project.title)}
                    className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <FaChevronDown className="w-3 h-3" />
                    </motion.span>
                    {isOpen ? 'Hide case study' : 'View case study'}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="case-study"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/8 space-y-4">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-1">Problem</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{project.problem}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-1">Approach</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{project.approach}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 mb-1">Impact</p>
                            <p className="text-sm text-cyan-300/90 leading-relaxed font-medium">{project.impact}</p>
                          </div>
                          <div className="flex gap-3 pt-1">
                            {hasGithub && (
                              <a
                                href={project.github}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-white/30 text-xs font-medium transition-colors"
                              >
                                <FaGithub className="w-3.5 h-3.5" /> View Code
                              </a>
                            )}
                            {hasDemo && (
                              <a
                                href={project.demo}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-medium transition-colors"
                              >
                                <FaExternalLinkAlt className="w-3 h-3" /> Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div variants={cardVariants} className="text-center mt-10">
          <a
            href="https://github.com/PR-ODINSON"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors font-medium"
          >
            <FaGithub className="w-4 h-4" />
            View all projects on GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
