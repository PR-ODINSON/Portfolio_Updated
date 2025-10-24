import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type Project = {
  title: string
  description: string
  image: string
  github?: string
  demo?: string
  tech: string[]
}

const projects: Project[] = [
  {
    title: 'StartupX',
    description:
      'A comprehensive startup ecosystem platform connecting entrepreneurs, investors, and mentors. Features startup discovery, investment tracking, mentorship matching, and business analytics dashboard with real-time market insights.',
    image: '/projects/StartupX.png',
    github: '#',
    demo: 'https://start-upx.netlify.app/',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
  },
  {
    title: 'CareerBuddy',
    description:
      'AI-driven career platform that parses resumes, provides job suggestions, and matches candidates using ML models. A comprehensive SaaS solution for career development with intelligent matching algorithms and personalized recommendations.',
    image: '/projects/CareerBuddy.png',
    github: 'https://github.com/PR-ODINSON/CareerBuddy',
    demo: '#',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Python', 'ML APIs'],
  },
  {
    title: 'AI Attendance System',
    description:
      'Industry-level real-time face recognition attendance system with live video feed processing and database integration. Features advanced computer vision algorithms for accurate face detection and recognition in various lighting conditions.',
    image: '/projects/AttendanceSystem.png',
    github: 'https://github.com/PR-ODINSON/Attendance-System',
    demo: '#',
    tech: ['OpenCV', 'Flask', 'SQL', 'React', 'Computer Vision'],
  },
  {
    title: 'AI Telemedicine System',
    description:
      'Healthcare system with AI chatbot for diagnosis, e-prescriptions, and doctor consultations. Features intelligent symptom analysis, automated appointment scheduling, and secure patient data management.',
    image: '/projects/Telemedicine.webp',
    github: 'https://github.com/PR-ODINSON/TeleMedicine-SIH',
    demo: '#',
    tech: ['AI/ML', 'NLP', 'React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'AscendOS',
    description:
      'Intelligent Productivity & Automation Suite - A personalized AI workspace designed to automate daily workflow tasks using embedded ML modules. Features smart task management, automated scheduling, and intelligent workflow optimization.',
    image: '/projects/AscendOS.png',
    github: 'https://github.com/PR-ODINSON/Solo_leveling',
    demo: '#',
    tech: ['Next.js', 'Tailwind CSS', 'Flask', 'OpenAI API', 'ML'],
  },
  {
    title: 'RentHive',
    description:
      'Modern rental marketplace platform with advanced search filters, virtual tours, and secure payment integration. Features real-time chat, property management dashboard, and AI-powered property recommendations.',
    image: '/projects/RentHive.webp',
    github: '#',
    demo: '#',
    tech: ['React', 'Firebase', 'Stripe', 'Google Maps API', 'Material-UI'],
  },
  {
    title: 'SkillLink',
    description:
      'Professional networking platform for skill-based connections and project collaborations. Features skill matching algorithms, project marketplace, and integrated video conferencing for remote collaboration.',
    image: '/projects/SkillLink.webp',
    github: '#',
    demo: '#',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC', 'Socket.io'],
  },
  {
    title: 'XpenseFlow',
    description:
      'Smart expense tracking and budget management application with AI-powered spending insights. Features receipt scanning, category auto-detection, and predictive budget recommendations.',
    image: '/projects/XpenseFlow.jpg',
    github: '#',
    demo: '#',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'OCR API', 'Chart.js'],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  show: { y: 0, opacity: 1, scale: 1 },
}

const buttonVariants = {
  hover: {
    scale: 1.08,
    boxShadow: '0 10px 20px rgba(142, 236, 245, 0.3)',
  },
  tap: {
    scale: 0.95,
  },
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  return (
    <section
      id="projects"
      className="mx-auto w-full px-6 py-16 bg-gradient-to-b from-gray-800 to-gray-900"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div variants={item} className="text-center">
          <h2 className="heading text-5xl text-transparent bg-clip-text gradient-text text-shadow-lg">
            My Projects
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 160, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto mt-3 h-1 rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
          />
        </motion.div>

        {/* Project Navigation */}
        <div className="mt-14 relative">
          {/* Main Project Display */}
          <AnimatePresence mode="wait">
            <motion.article
              key={currentProject.title}
              initial={{ opacity: 0, x: 300, rotateY: 45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -300, rotateY: -45 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94],
                rotateY: { duration: 0.8 }
              }}
              className="rounded-3xl bg-white/5 p-3 shadow-2xl"
            >
              <div className="rounded-[22px] border border-white/15 bg-black/40 p-4">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* Project image */}
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="rounded-2xl border border-white/15 bg-white/5 p-2 shadow-inner">
                      <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="pointer-events-none absolute -inset-2 rounded-[26px] ring-1 ring-white/10" />
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    className="flex flex-col justify-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="heading text-3xl text-gray-100 text-shadow">
                      {currentProject.title}
                    </h3>
                    <p className="body-text mt-4 text-[15px] leading-7 text-gray-300">
                      {currentProject.description}
                    </p>

                    {/* Tech badges */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentProject.tech.map((tech, idx) => (
                        <motion.span
                          key={tech}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                          className="rounded-full bg-white/10 px-3 py-0.5 text-xs body-semibold text-[#8eecf5]"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <motion.div 
                      className="mt-6 flex flex-wrap gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <motion.a
                        href={currentProject.demo}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm body-semibold text-gray-900 shadow hover:bg-white"
                        onClick={(e) => {
                          e.preventDefault()
                          setOpen(currentProject)
                        }}
                      >
                        Explore
                        <span className="translate-x-0 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </motion.a>
                      {currentProject.github && (
                        <motion.a
                          href={currentProject.github}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm body-semibold text-white/90 hover:bg-white/10"
                        >
                          GitHub
                        </motion.a>
                      )}
                      {currentProject.demo && (
                        <motion.a
                          href={currentProject.demo}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm body-semibold text-white/90 hover:bg-white/10"
                        >
                          Live Demo
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center mt-8 gap-6">
            <motion.button
              onClick={prevProject}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 20px rgba(142, 236, 245, 0.5)",
                rotate: -5
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaChevronLeft className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Project Indicators */}
            <div className="flex gap-2">
              {projects.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextProject}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 20px rgba(142, 236, 245, 0.5)",
                rotate: 5
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaChevronRight className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-[min(90vw,900px)] rounded-2xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="heading text-2xl text-white text-shadow">
                {open?.title}
              </h3>
              <p className="mt-3 text-sm body-text text-gray-300">
                {open?.description}
              </p>
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/15 bg-white/5">
                <img
                  src={open?.image || ''}
                  alt={open?.title || ''}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {open?.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/10 px-3 py-0.5 text-xs body-semibold text-[#8eecf5]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
