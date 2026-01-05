import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SiReact, SiNodedotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'

type Experience = {
  company: string
  role: string
  period: string
  startDate: Date
  endDate: Date | null
  description: string[]
  tech: string[]
}

const techIcons = [SiReact, SiNodedotjs, SiTypescript, SiTailwindcss]

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
  },
  {
    company: 'Garnet AI, Dublin, Ireland',
    role: 'Full-Stack ML Engineer',
    period: 'May 2025 – July 2025',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-07-01'),
    description: [
      'Spearheaded the development of a full-stack SaaS Vendor Onboarding platform, reducing onboarding time by 40% and improving sales efficiency across B2B operations.',
      'Integrated GPT-4 powered automation modules for compliance documentation and vendor verification, cutting manual workload by 60%.',
      'Built CI/CD pipelines on AWS with Docker and GitHub Actions, achieving zero-downtime deployments and accelerating feature delivery cycles by 30%.'
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'AIML'],
  },
  {
    company: 'IIT Delhi, New Delhi',
    role: 'Research Intern',
    period: 'Jan 2025 – Jun 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-01'),
    description: [
      'Built high-accuracy deep learning models for EEG signal classification: 99.58% for K-complex and 98.08% for spindle detection on sleep datasets.',
      'Incorporated Explainable AI methods (e.g., Grad-CAM, SHAP) to increase model transparency for clinical neurologists.',
      'Developed a real-time EEG analysis pipeline, reducing manual scoring time by over 50% in trial deployments.'
    ],
    tech: ['Deep Learning', 'EEG', 'Explainable AI', 'Python'],
  },
  {
    company: 'MarkX AI Labs, Ahmedabad',
    role: 'AI/ML Intern',
    period: 'Jan 2025 – Present',
    startDate: new Date('2025-01-01'),
    endDate: null,
    description: [
      'Developed reinforcement learning-based trading algorithms.',
      'Deployed ML models on Telegram bot for real-time investment recommendations.',
      'Achieved high prediction accuracy in financial pattern recognition.'
    ],
    tech: ['Python', 'RL', 'Scikit-learn', 'PyTorch'],
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
  },
  {
    company: 'Yads Technology Pvt. Ltd.',
    role: 'Data Science Intern',
    period: 'May 2024 – July 2024',
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-07-01'),
    description: [
      'Built analytics dashboards and optimized data APIs for faster decision-making.',
      'Improved data processing pipelines by 40%.'
    ],
    tech: ['Python', 'Pandas', 'SQL', 'Power BI'],
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

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 5
  }
}

function TimelineNode({ exp, index, isLast }: { exp: Experience; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const isLeft = index % 2 === 0
  
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Desktop Center Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-8 bottom-[-3rem] w-px bg-gradient-to-b from-cyan-500/50 to-gray-800 transform -translate-x-1/2 hidden md:block" />
      )}
      
      {/* Mobile Left Line */}
      {!isLast && (
        <div className="absolute left-6 top-8 bottom-[-3rem] w-px bg-gradient-to-b from-cyan-500/50 to-gray-800 md:hidden" />
      )}

      <div className={`relative flex flex-col md:flex-row items-center justify-between mb-16 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Empty Space for Desktop Balance */}
        <div className="hidden md:block w-[45%]" />

        {/* Center Dot */}
        <div className="absolute left-6 md:left-1/2 w-6 h-6 bg-gray-900 rounded-full transform -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.6)] z-10 mt-8 border-2 border-cyan-400 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>

        {/* Content Card */}
        <motion.div 
          className="w-full md:w-[45%] pl-16 md:pl-0"
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
        >
          <ExperienceCard exp={exp} expanded={expanded} setExpanded={setExpanded} />
        </motion.div>

      </div>
    </div>
  )
}

function ExperienceCard({ exp, expanded, setExpanded }: { 
  exp: Experience; 
  expanded: boolean; 
  setExpanded: (expanded: boolean) => void 
}) {
  
  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 cursor-pointer transition-all duration-500 group hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]"
      whileHover={{ y: -5 }}
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Date Badge */}
      <div className="absolute -top-3 right-6 bg-gray-900 border border-cyan-500/30 px-4 py-1.5 rounded-full shadow-lg z-10 group-hover:border-cyan-400/60 transition-colors group-hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]">
        <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wide">{exp.period}</span>
      </div>

      <div className="relative z-10 mb-6">
        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300 mb-2">
          {exp.role}
        </h3>
        <h4 className="text-lg text-gray-400 font-medium flex items-center gap-2 group-hover:text-gray-300 transition-colors">
          <span className="w-2 h-2 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all"></span>
          {exp.company}
        </h4>
      </div>

      {/* Tags Preview */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-4">
        {exp.tech.slice(0, 3).map((tech, i) => (
          <span key={i} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-500/5 text-cyan-300/80 border border-cyan-500/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
            {tech}
          </span>
        ))}
        {exp.tech.length > 3 && (
          <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 text-gray-400 border border-gray-700">
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
              
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors cursor-default">
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
    <section id="experience" className="mx-auto w-full px-4 sm:px-6 py-20 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}>
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 sm:text-4xl lg:text-5xl">
            Work Experience
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          />
          <p className="mt-4 text-gray-400 text-sm max-w-2xl mx-auto">
            Journey through my professional experiences, arranged chronologically with alternating layout. 
            Click on cards to explore details.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5 mb-12"
        >
          {techIcons.map((Icon, idx) => (
            <motion.div
              key={idx}
              variants={iconVariants}
              whileHover="hover"
              className="rounded-xl bg-white/10 backdrop-blur-sm p-4 shadow-md"
            >
              <Icon className="h-8 w-8 text-[#8eecf5]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Tree Timeline with Left-Right Alternating Layout */}
        <div className="relative mt-16">
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
          
          {/* End of timeline marker */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center shadow-lg border-4 border-gray-900">
              <div className="w-4 h-4 rounded-full bg-gray-500" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
