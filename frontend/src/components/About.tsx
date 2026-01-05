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

const container = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
}


export default function About() {
  const [active, setActive] = useState<Tab>('Languages')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const techStacks = {
    Languages: [
      { name: 'Python', icon: SiPython, proficiency: 95 },
      { name: 'C++', icon: FaCode, proficiency: 90 },
      { name: 'JavaScript', icon: SiJavascript, proficiency: 85 },
      { name: 'TypeScript', icon: SiTypescript, proficiency: 80 },
      { name: 'SQL', icon: FaDatabase, proficiency: 85 },
      { name: 'MATLAB', icon: FaCode, proficiency: 75 },
    ],
    'Libraries & Frameworks': [
      { name: 'React', icon: SiReact, proficiency: 90 },
      { name: 'Next.js', icon: SiReact, proficiency: 85 },
      { name: 'NestJS', icon: SiNodedotjs, proficiency: 85 },
      { name: 'FastAPI', icon: FaServer, proficiency: 85 },
      { name: 'Tailwind CSS', icon: FaPalette, proficiency: 90 },
      { name: 'TensorFlow', icon: SiTensorflow, proficiency: 90 },
    ],
    'Machine Learning': [
      { name: 'PyTorch', icon: FaBrain, proficiency: 90 },
      { name: 'Scikit-learn', icon: FaBrain, proficiency: 95 },
      { name: 'Pandas', icon: FaDatabase, proficiency: 95 },
      { name: 'NumPy', icon: FaCode, proficiency: 95 },
      { name: 'MLflow', icon: FaBrain, proficiency: 85 },
      { name: 'OpenCV', icon: FaCode, proficiency: 80 },
    ],
    'Tools & Platforms': [
      { name: 'AWS', icon: FaCloud, proficiency: 85 },
      { name: 'Docker', icon: SiDocker, proficiency: 85 },
      { name: 'Git', icon: FaGitAlt, proficiency: 95 },
      { name: 'PostgreSQL', icon: FaDatabase, proficiency: 85 },
      { name: 'MongoDB', icon: SiMongodb, proficiency: 80 },
      { name: 'Figma', icon: SiFigma, proficiency: 85 },
    ],
  }



  return (
    <section id="about" className="relative isolate overflow-hidden bg-gray-900 section-padding">
      {/* Hero Visual + Intro */}
      <div ref={ref} className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Text Content - RIGHT */}
          <motion.div variants={container} className="space-y-4 sm:space-y-6 flex flex-col justify-center order-2 lg:order-2">
            <motion.h2
              className="heading-lg text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            >
              Transforming Ideas Into{' '}
              <span className="gradient-text">
                Innovation
              </span>
            </motion.h2>
            
            <motion.div
              className="text-gray-300 body-base space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                I'm a passionate <span className="text-cyan-400 font-semibold">AI/ML Engineer</span> and{' '}
                <span className="text-cyan-400 font-semibold">Full-Stack Developer</span> with production experience and published research in biomedical signal processing. Currently a <span className="text-cyan-300 font-semibold">pre-final year student</span> building cutting-edge solutions.
              </p>
              
              <p>
                Currently building <span className="text-cyan-400 font-semibold">LLM-powered automation systems</span> at Garnet AI that streamline vendor onboarding processes, reducing manual workflow time by <span className="text-green-400 font-semibold">28%</span> across 1000s enterprise clients.
              </p>
              
              <div className="card card-padding my-4">
                <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                  Research Impact
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  Authored <span className="text-cyan-400 font-medium">"PPG-Based Accurate Insomnia Detection System Using Convolutional Neural Networks With Self-Attention Mechanism and Gated Recurrent Units"</span> published in <span className="text-blue-400 font-medium">IEEE Access (Impact Factor: 3.4)</span>. Developed Vision Transformer-based framework achieving <span className="text-green-400 font-semibold">98.34% accuracy</span> improvement over baseline methods.
                </p>
              </div>
              
              <div className="card card-padding my-4">
                <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Technical Leadership
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  Led AI/ML initiatives at <span className="text-cyan-400 font-medium">IITRAM's Coding Club</span>, mentoring <span className="text-green-400 font-semibold">50+ students</span> in machine learning fundamentals and organizing technical workshops that increased ML adoption by <span className="text-green-400 font-semibold">65%</span>.
                </p>
              </div>
            </motion.div>

            {/* Tech Badges */}
            <motion.div className="flex flex-wrap gap-2 sm:gap-3">
              {['Python', 'React', 'TensorFlow', 'PyTorch', 'AWS', 'Docker'].map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="bg-gray-800 border border-gray-700 text-cyan-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-700 transition-all relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {tech}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg hidden group-hover:block whitespace-nowrap">
                    {tech} Expertise
                  </span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section - LEFT */}
          <motion.div
            className="relative w-full max-w-md mx-auto lg:mx-0 flex flex-col order-1 lg:order-1"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
          {/* Main Innovation Image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/Prithvi_coding.jpg"
              alt="AI Innovation Concept"
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          </motion.div>
          
          {/* Floating Icons - Removed Cloud and Rocket */}
          {[
            { Icon: SiReact, style: 'top-6 left-6', delay: 0 },
            { Icon: FaBrain, style: 'top-16 right-8', delay: 0.5 }
          ].map(({ Icon, style, delay }, i) => (
            <motion.div
              key={i}
              className={`absolute ${style} w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg z-10`}
              animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          ))}

          {/* Core Expertise - Moved below image */}
          <motion.div 
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h4 className="text-white font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              Core Expertise
            </h4>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div>
                <span className="text-cyan-400 font-medium">🔹 Machine Learning:</span>
                <span className="text-gray-300"> TensorFlow, PyTorch, Scikit-Learn, Computer Vision</span>
              </div>
              <div>
                <span className="text-cyan-400 font-medium">🔹 Full-Stack Development:</span>
                <span className="text-gray-300"> React, Node.js, MongoDB, RESTful APIs</span>
              </div>
              <div>
                <span className="text-cyan-400 font-medium">🔹 Research:</span>
                <span className="text-gray-300"> Signal Processing, Deep Learning, Academic Publications</span>
              </div>
              <div>
                <span className="text-cyan-400 font-medium">🔹 Tools:</span>
                <span className="text-gray-300"> Docker, Git, AWS/GCP, Data Visualization</span>
              </div>
            </div>
          </motion.div>

          {/* Currently Exploring */}
          <motion.div
            className="mt-4 text-sm text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p>
              Currently exploring: <span className="text-cyan-400 font-medium">Large Language Models, MLOps, and scaling ML systems</span> for production environments. Open to opportunities in AI/ML engineering, full-stack development, and applied research roles where I can contribute to products that impact millions of users.
            </p>
          </motion.div>
        </motion.div>
      </div>
      </div>

      {/* Centered Resume Button */}
      <div className="section-container">
        <motion.div
          className="flex justify-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="/Prithviraj_resume_28-09.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>

        {/* Tech Stack Tabs */}
        <div>
          <h3 className="heading-sm text-center text-white mb-6 sm:mb-8">Technology Stack</h3>
          <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                  active === tab
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md border-transparent'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {techStacks[active].map((tech, idx) => (
              <motion.div
                key={tech.name}
                className="card p-3 sm:p-4 text-center hover:scale-105 transition-transform relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                  <tech.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-white text-xs sm:text-sm font-medium">{tech.name}</div>
                <div className="h-1 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.proficiency}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg hidden group-hover:block whitespace-nowrap z-10">
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
