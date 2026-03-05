import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { 
  FaCode, FaBrain, FaPalette, FaDatabase, FaServer, FaGitAlt, FaCloud 
} from 'react-icons/fa'
import { 
  SiReact, SiTypescript, SiPython, SiJavascript, SiNodedotjs, SiMongodb, SiDocker, SiFigma, SiTensorflow 
} from 'react-icons/si'

const tabs = ['Languages', 'Libraries & Frameworks', 'Machine Learning', 'Tools & Platforms'] as const
type Tab = (typeof tabs)[number]

const showcaseStats = [
  { value: '3.4',  label: 'IEEE Impact Factor', sub: 'IEEE Access journal',      colorFrom: '#8b5cf6', colorTo: '#7c3aed' },
  { value: '99.2%',label: 'Model Accuracy',      sub: 'EEG/ECG sleep staging',    colorFrom: '#06b6d4', colorTo: '#3b82f6' },
  { value: '50+',  label: 'Students Mentored',   sub: 'IITRAM Coding Club',        colorFrom: '#10b981', colorTo: '#059669' },
  { value: '60%',  label: 'Workflow Reduction',  sub: 'Garnet AI automation',      colorFrom: '#f59e0b', colorTo: '#d97706' },
]

const expertise = [
  { Icon: FaBrain,      title: 'Machine Learning',       desc: 'TensorFlow, PyTorch, Scikit-Learn, Computer Vision',         color: 'text-cyan-400',    bg: 'bg-cyan-400/10'    },
  { Icon: FaCode,       title: 'Full-Stack Development', desc: 'React, NestJS, FastAPI, MongoDB, PostgreSQL, REST APIs',     color: 'text-blue-400',    bg: 'bg-blue-400/10'    },
  { Icon: SiTensorflow, title: 'Research & Deep Learning',desc: 'Signal Processing, Transformers, IEEE Publications',        color: 'text-violet-400',  bg: 'bg-violet-400/10'  },
  { Icon: FaCloud,      title: 'DevOps & Cloud',         desc: 'Docker, AWS/GCP, GitOps, CI/CD pipelines',                  color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
]


export default function About() {
  const [active, setActive] = useState<Tab>('Languages')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const techStacks = {
    Languages: [
      { name: 'Python',     icon: SiPython,     proficiency: 95 },
      { name: 'C++',        icon: FaCode,        proficiency: 90 },
      { name: 'JavaScript', icon: SiJavascript,  proficiency: 85 },
      { name: 'TypeScript', icon: SiTypescript,  proficiency: 80 },
      { name: 'SQL',        icon: FaDatabase,    proficiency: 85 },
      { name: 'MATLAB',     icon: FaCode,        proficiency: 75 },
    ],
    'Libraries & Frameworks': [
      { name: 'React',        icon: SiReact,      proficiency: 90 },
      { name: 'Next.js',      icon: SiReact,      proficiency: 85 },
      { name: 'NestJS',       icon: SiNodedotjs,  proficiency: 85 },
      { name: 'FastAPI',      icon: FaServer,     proficiency: 85 },
      { name: 'Tailwind CSS', icon: FaPalette,    proficiency: 90 },
      { name: 'TensorFlow',   icon: SiTensorflow, proficiency: 90 },
    ],
    'Machine Learning': [
      { name: 'PyTorch',      icon: FaBrain,    proficiency: 90 },
      { name: 'Scikit-learn', icon: FaBrain,    proficiency: 95 },
      { name: 'Pandas',       icon: FaDatabase, proficiency: 95 },
      { name: 'NumPy',        icon: FaCode,     proficiency: 95 },
      { name: 'MLflow',       icon: FaBrain,    proficiency: 85 },
      { name: 'OpenCV',       icon: FaCode,     proficiency: 80 },
    ],
    'Tools & Platforms': [
      { name: 'AWS',        icon: FaCloud,    proficiency: 85 },
      { name: 'Docker',     icon: SiDocker,   proficiency: 85 },
      { name: 'Git',        icon: FaGitAlt,   proficiency: 95 },
      { name: 'PostgreSQL', icon: FaDatabase, proficiency: 85 },
      { name: 'MongoDB',    icon: SiMongodb,  proficiency: 80 },
      { name: 'Figma',      icon: SiFigma,    proficiency: 85 },
    ],
  }

  return (
    <section id="about" className="relative isolate overflow-hidden bg-gray-900 section-padding">
      <div ref={ref} className="section-container">

        {/* ── Top grid: left = stat cards + expertise, right = bio ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mb-14 lg:mb-20">

          {/* LEFT — stat cards + core expertise */}
          <motion.div
            className="flex flex-col gap-5 order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* 2×2 achievement stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {showcaseStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="relative overflow-hidden rounded-xl bg-gray-800/60 border border-gray-700/60 p-4 backdrop-blur-sm cursor-default"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  {/* hover glow overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{ background: `linear-gradient(135deg, ${s.colorFrom}18, ${s.colorTo}10)` }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{s.value}</p>
                  <p className="text-xs font-semibold text-gray-200 leading-snug mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{s.sub}</p>
                  {/* bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-70"
                    style={{ background: `linear-gradient(90deg, ${s.colorFrom}, ${s.colorTo})` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Core Expertise — icon rows */}
            <motion.div
              className="rounded-xl bg-gray-800/40 border border-gray-700/50 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                Core Expertise
              </p>
              <div className="space-y-3">
                {expertise.map(({ Icon, title, desc, color, bg }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${bg} flex items-center justify-center mt-0.5`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${color}`}>{title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Currently exploring */}
            <motion.p
              className="text-xs text-gray-400 leading-relaxed border-l-2 border-cyan-500/40 pl-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Currently exploring:{' '}
              <span className="text-cyan-400 font-medium">
                LLM agents, agentic workflows, RAG systems, and scalable MLOps
              </span>{' '}
              for production environments. Open to AI/ML engineering and applied research roles.
            </motion.p>
          </motion.div>

          {/* RIGHT — bio */}
          <motion.div
            className="flex flex-col justify-center space-y-5 order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="heading-lg text-white">
              Transforming Ideas Into{' '}
              <span className="gradient-text">Innovation</span>
            </h2>

            <p className="body-base text-gray-300">
              I'm an{' '}
              <span className="text-cyan-400 font-semibold">AI/ML Engineer</span> focused on building intelligent systems that move from research to real-world deployment. My work combines{' '}
              <span className="text-cyan-400 font-semibold">applied machine learning</span>, product development, and research-driven problem solving — currently in my pre-final year at{' '}
              <span className="text-cyan-300 font-semibold">IITRAM, Ahmedabad</span>.
            </p>

            <div className="card card-padding">
              <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2" />
                Research Impact
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Co-authored{' '}
                <span className="text-cyan-400 font-medium italic">
                  "Multi Feature Fusion for Sleep Stage Classification using EEG and ECG Signals"
                </span>{' '}
                published in{' '}
                <span className="text-blue-400 font-medium">IEEE Access (Impact Factor: 3.4)</span>.
                Achieved{' '}
                <span className="text-green-400 font-semibold">99.2% accuracy</span> using Vision Transformer-based architectures.
              </p>
            </div>

            <div className="card card-padding">
              <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                Technical Leadership
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Led AI/ML initiatives at{' '}
                <span className="text-cyan-400 font-medium">IITRAM's Coding Club (Tekstra)</span> as AI/ML Team Lead, mentoring{' '}
                <span className="text-green-400 font-semibold">50+ students</span>, organizing workshops, talks, and hackathons to promote the coding culture.
              </p>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'React', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'].map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="bg-gray-800 border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-700/80 text-cyan-400 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-default"
                  whileHover={{ scale: 1.07 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.5 + idx * 0.07 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Resume button ── */}
        <motion.div
          className="flex justify-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <motion.a
            href="https://drive.google.com/file/d/1FAvOEMlgpb-EHnjtrniqd0k-Ebdo9xEn/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 22px rgba(6,182,212,0.35)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        {/* ── Technology Stack ── */}
        <div>
          <h3 className="heading-sm text-center text-white mb-6 sm:mb-8">Technology Stack</h3>

          {/* Tab pills */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-7 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                  active === tab
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md border-transparent'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tech cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {techStacks[active].map((tech, idx) => (
              <motion.div
                key={tech.name}
                className="card p-3 sm:p-4 text-center relative group cursor-default hover:border-cyan-500/30 hover:shadow-[0_0_18px_rgba(6,182,212,0.1)] transition-all duration-200"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-lg bg-gray-700/60 border border-gray-600 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 flex items-center justify-center transition-all duration-200">
                  <tech.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-cyan-300 transition-colors duration-200" />
                </div>
                <div className="text-white text-xs sm:text-sm font-medium">{tech.name}</div>
                <div className="h-1 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: idx * 0.06 }}
                  />
                </div>
                {/* proficiency tooltip */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 border border-gray-700 text-white text-xs rounded-md shadow-lg hidden group-hover:block whitespace-nowrap z-10">
                  {tech.proficiency}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
