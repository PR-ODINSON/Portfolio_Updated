import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Experience = {
  company: string
  role: string
  period: string
  startDate: Date
  endDate: Date | null
  description: string[]
  tech: string[]
  color: string
}

// One accent colour per entry (index-matched)
const ENTRY_COLORS = ['#22d3ee','#a855f7','#10b981','#f59e0b','#f43f5e','#60a5fa']

const experiences: Experience[] = [
  {
    company: 'Insolare Pvt. Ltd., Ahmedabad',
    role: 'Machine Learning Engineer Intern',
    period: 'Apr 2025 – Present',
    startDate: new Date('2025-04-01'),
    endDate: null,
    description: [
      'Developed a real-time facial recognition attendance system with >98% verification accuracy, eliminating proxy check-ins across 3 sites.',
      'Automated drone-based solar panel defect detection using CV models, increasing inspection efficiency by 75%.',
      'Designed a geospatial dashboard integrating live GPS data, enabling engineers to plan solar maintenance 30% faster.'
    ],
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'GIS'],
    color: ENTRY_COLORS[0],
  },
  {
    company: 'Garnet AI, Dublin, Ireland',
    role: 'Full-Stack ML Engineer',
    period: 'May 2025 – Aug 2025',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-08-01'),
    description: [
      'Architected and deployed LLM-powered vendor onboarding platform reducing onboarding time by 60%, processing 200+ enterprise clients monthly.',
      'Built compliance assistant using RAG (Retrieval-Augmented Generation) achieving 95% accuracy in regulatory document analysis.',
      'Developed full-stack web application using React, Node.js, and MongoDB serving 500+ daily active users.',
      'Implemented CI/CD pipeline using Docker and AWS, reducing deployment time from 2 hours to 15 minutes.'
    ],
    tech: ['Python', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'OpenAI API'],
    color: ENTRY_COLORS[1],
  },
  {
    company: 'IIT Delhi, New Delhi',
    role: 'Research Intern',
    period: 'Jan 2025 – Jun 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-01'),
    description: [
      'Authored IEEE Access publication on sleep stage classification achieving 99.2% accuracy using EEG/ECG signal fusion.',
      'Developed Vision Transformer-based architecture reducing model size by 40% while maintaining classification performance.',
      'Implemented end-to-end ML pipeline processing 10,000+ biomedical signals with real-time inference capabilities.',
      'Collaborated with medical professionals to validate algorithm performance on clinical datasets.'
    ],
    tech: ['Python', 'PyTorch', 'OpenCV', 'Signal Processing', 'Computer Vision'],
    color: ENTRY_COLORS[2],
  },
  {
    company: 'MarkX AI Labs, Ahmedabad',
    role: 'AI/ML Intern',
    period: 'Jan 2025 – Mar 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-01'),
    description: [
      'Developed an AI-powered Telegram-based trading bot to analyze market trends and provide real-time trading insights.',
      'Implemented agentic workflows enabling the system to execute strategy-driven decisions with real capital in controlled scenarios.',
      'Built automation pipelines for processing financial data and identifying potential trading opportunities.'
    ],
    tech: ['Python', 'RL', 'Scikit-learn', 'PyTorch'],
    color: ENTRY_COLORS[3],
  },
  {
    company: 'BLix Education',
    role: 'AI Researcher',
    period: 'Jan 2025 – March 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-03-01'),
    description: [
      'Developed a self-driving car prototype using Arduino, Python, and advanced machine learning algorithms.',
      'Implemented computer vision for object detection, path planning algorithms, and deep learning models for autonomous navigation.',
      'Integrated sensor fusion and real-time decision-making systems.'
    ],
    tech: ['Arduino', 'Python', 'OpenCV', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
    color: ENTRY_COLORS[4],
  },
  {
    company: 'Yads Technology Pvt. Ltd.',
    role: 'Data Science Intern',
    period: 'Jun 2024 – Aug 2024',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-01'),
    description: [
      'Analyzed datasets to extract meaningful insights supporting business decision-making, identifying trends and performance indicators.',
      'Developed analytical reports and visualizations for stakeholders; contributed to improving data processing workflows and optimizing API operations.',
      'Improved data processing pipelines by 40%, enhancing efficiency of internal data analysis systems.'
    ],
    tech: ['Python', 'Pandas', 'SQL', 'Power BI'],
    color: ENTRY_COLORS[5],
  },
]

// Sort experiences chronologically (latest first)
const getSortedExperiences = () => {
  return experiences
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const item = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1
  }
}

function TimelineNode({ exp, index, isLast }: { exp: Experience; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const isLeft = index % 2 === 0
  const color = exp.color

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Desktop center line */}
      {!isLast && (
        <div
          className="absolute left-1/2 top-8 bottom-[-3rem] w-px transform -translate-x-1/2 hidden md:block"
          style={{ background: `linear-gradient(to bottom, ${color}60, transparent)` }}
        />
      )}
      {/* Mobile left line */}
      {!isLast && (
        <div
          className="absolute left-6 top-8 bottom-[-3rem] w-px md:hidden"
          style={{ background: `linear-gradient(to bottom, ${color}60, transparent)` }}
        />
      )}

      <div className={`relative flex flex-col md:flex-row items-center justify-between mb-16 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
        <div className="hidden md:block w-[45%]" />

        {/* Accent dot */}
        <div
          className="absolute left-6 md:left-1/2 w-5 h-5 bg-gray-900 rounded-full transform -translate-x-1/2 z-10 mt-8 border-2 flex items-center justify-center"
          style={{ borderColor: color, boxShadow: `0 0 12px ${color}80` }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        </div>

        <motion.div
          className="w-full md:w-[45%] pl-16 md:pl-0"
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 50 }}
        >
          <ExperienceCard exp={exp} expanded={expanded} setExpanded={setExpanded} color={color} />
        </motion.div>
      </div>
    </div>
  )
}

function ExperienceCard({ exp, expanded, setExpanded, color }: {
  exp: Experience
  expanded: boolean
  setExpanded: (v: boolean) => void
  color: string
}) {
  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 cursor-pointer transition-colors duration-300 group"
      style={{
        borderLeft: `3px solid ${color}50`,
      }}
      whileHover={{ y: -5, borderColor: `${color}90` }}
    >
      {/* Hover glow layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${color}12, transparent 70%)` }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Date badge */}
      <div
        className="absolute -top-3 right-6 bg-gray-900 px-4 py-1.5 rounded-full shadow-lg z-10 border"
        style={{ borderColor: `${color}40` }}
      >
        <span className="text-xs font-mono font-semibold tracking-wide" style={{ color }}>
          {exp.period}
        </span>
      </div>

      <div className="relative z-10 mb-4">
        <h3 className="text-xl font-bold text-white mb-1.5">{exp.role}</h3>
        <h4 className="text-sm text-gray-400 font-medium flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          />
          {exp.company}
        </h4>
      </div>

      {/* Tag chips */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-3">
        {exp.tech.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="px-2.5 py-1 text-xs font-medium rounded-md border"
            style={{ color: `${color}cc`, borderColor: `${color}25`, backgroundColor: `${color}0d` }}
          >
            {tech}
          </span>
        ))}
        {exp.tech.length > 3 && (
          <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-800 text-gray-400 border border-gray-700">
            +{exp.tech.length - 3}
          </span>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden relative z-10"
          >
            <div className="pt-6 mt-2 border-t border-gray-700/50">
              <div className="text-gray-300 text-sm leading-relaxed mb-6 space-y-3">
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-3">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                        <span className="opacity-90">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{exp.description}</p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium rounded-md border cursor-default"
                    style={{ color: `${color}cc`, borderColor: `${color}30`, backgroundColor: `${color}12` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-6 right-6 text-cyan-500/30 group-hover:text-cyan-400 transition-colors z-10">
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-2 rounded-full group-hover:bg-cyan-500/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const sortedExperiences = getSortedExperiences()

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
      <div className="section-container">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
        <motion.div variants={item} className="text-center mb-10 sm:mb-16">
          <h2 className="heading-xl text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-3 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
          />
          <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
            Click any card to expand full details.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-10">
          <div className="space-y-0">
            {sortedExperiences.map((exp, index) => (
              <TimelineNode
                key={`${exp.company}-${exp.startDate.getTime()}`}
                exp={exp}
                index={index}
                isLast={index === sortedExperiences.length - 1}
              />
            ))}
          </div>
          
          {/* End marker */}
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </section>
  )
}
