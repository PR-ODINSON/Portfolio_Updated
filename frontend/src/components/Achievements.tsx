import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa'

type Achievement = {
  title: string
  description: string
  image: string
  icon: React.ComponentType<any>
  category: string
  date: string
}

const CATEGORY_COLOR: Record<string, { badge: string; glow: string; border: string }> = {
  Competition: { badge: 'from-red-500 to-orange-500',   glow: 'rgba(239,68,68,0.25)',    border: '#ef4444' },
  Hackathon:   { badge: 'from-amber-400 to-yellow-500', glow: 'rgba(251,191,36,0.25)',   border: '#fbbf24' },
  Leadership:  { badge: 'from-blue-500 to-indigo-500',  glow: 'rgba(99,102,241,0.25)',   border: '#6366f1' },
  Research:    { badge: 'from-violet-500 to-purple-600',glow: 'rgba(139,92,246,0.25)',   border: '#8b5cf6' },
  Academic:    { badge: 'from-emerald-500 to-teal-500', glow: 'rgba(16,185,129,0.25)',   border: '#10b981' },
  Coding:      { badge: 'from-cyan-500 to-blue-500',    glow: 'rgba(6,182,212,0.25)',    border: '#06b6d4' },
}
const defaultColor = { badge: 'from-gray-500 to-gray-600', glow: 'rgba(156,163,175,0.2)', border: '#9ca3af' }

const achievements: Achievement[] = [
  {
    title: '1st Runner Up - IIT Bombay Techfest',
    description: 'Secured 1st Runner Up position in prestigious IIT Bombay Techfest competition among 500+ participants',
    image: '/achievements/1st runner up- IIT bombay Techfest.jpg',
    icon: FaTrophy,
    category: 'Competition',
    date: '2024'
  },
  {
    title: 'Google Student Ambassador',
    description: 'Selected as Google Student Ambassador for promoting Google technologies and organizing developer events',
    image: '/achievements/Google_student_ambassador.jpg',
    icon: FaStar,
    category: 'Leadership',
    date: '2024'
  },
  {
    title: 'Winner - Flux Hackathon',
    description: 'Won the Flux Hackathon with innovative AI-powered solution for real-world problem solving',
    image: '/achievements/Winner_Flux_hackathon.jpg',
    icon: FaTrophy,
    category: 'Hackathon',
    date: '2024'
  },
  {
    title: 'Top 10 Percentile - IIT Guwahati',
    description: 'Achieved Top 10 Percentile ranking in IIT Guwahati competitive examination',
    image: '/achievements/Top_10 Percentile_IIT_guwahati.jpg',
    icon: FaMedal,
    category: 'Academic',
    date: '2024'
  },
  {
    title: 'Odoo Hackathon - Top 10',
    description: 'Secured Top 10 position in Odoo Hackathon with enterprise-level business solution',
    image: '/achievements/Odoo_hackathon_Top_10.jpg',
    icon: FaAward,
    category: 'Hackathon',
    date: '2024'
  },
  {
    title: 'Campus Ambassador - Unstop',
    description: 'Appointed as Campus Ambassador for Unstop platform, organizing coding competitions and events',
    image: '/achievements/Campus_ambassador_unstop.jpg',
    icon: FaStar,
    category: 'Leadership',
    date: '2024'
  },
  {
    title: 'Conference Paper - IITRAM',
    description: 'Published research paper in IITRAM conference on AI and Machine Learning applications',
    image: '/achievements/Conference_paper_IITRAM.jpg',
    icon: FaAward,
    category: 'Research',
    date: '2024'
  },
  {
    title: 'Conference Paper - PDEU',
    description: 'Presented research paper at PDEU conference on innovative technology solutions',
    image: '/achievements/Conference_paper_PDEU.jpg',
    icon: FaAward,
    category: 'Research',
    date: '2024'
  },
  {
    title: 'Arcade Legend Swags',
    description: 'Earned Arcade Legend status with exclusive swags for exceptional performance in coding challenges',
    image: '/achievements/Arcade_legend_swags.jpg',
    icon: FaMedal,
    category: 'Coding',
    date: '2024'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const swordVariants = {
  hidden: { 
    x: -100, 
    opacity: 0,
    rotate: -45
  },
  show: { 
    x: 0, 
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
}

const cardVariants = {
  hidden: { 
    y: 50, 
    opacity: 0,
    scale: 0.9
  },
  show: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(142, 236, 245, 0.2)",
    transition: { duration: 0.3 }
  }
}

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = ['All', 'Competition', 'Hackathon', 'Leadership', 'Research', 'Academic', 'Coding']
  
  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory)

  return (
    <section 
      id="achievements" 
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 section-padding"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-500/20 to-blue-500/20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="heading-lg text-white">
            My{' '}
            <span
              className="gradient-text"
              style={{ backgroundImage: 'linear-gradient(90deg,#fbbf24,#f97316)' }}
            >
              Achievements
            </span>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 160, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-3 h-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
          <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
            {achievements.length} milestones across competitions, research, leadership & more
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all border-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-transparent shadow-lg'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Infinite Scrolling Achievement Array */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Infinite Scrolling Container */}
          <motion.div
            className="flex gap-6 items-start"
            animate={{
              x: isPaused ? undefined : [0, -(456 * filteredAchievements.length)]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: filteredAchievements.length * 4,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={`first-${achievement.title}`}
                variants={cardVariants}
                onClick={() => setSelectedImage(achievement.image)}
                className="group relative flex-shrink-0 w-[380px] rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 overflow-hidden shadow-xl cursor-pointer transition-all duration-300"
                style={{
                  borderLeft: `3px solid ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}50`,
                }}
                whileHover={{
                  y: -8,
                  borderColor: (CATEGORY_COLOR[achievement.category] ?? defaultColor).border,
                  boxShadow: `0 20px 40px ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).glow}`,
                }}
              >
                {/* Image */}
                <div className="relative w-full h-[240px] overflow-hidden bg-gray-950">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* dark gradient at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />

                  {/* Category badge — category-specific colour */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2.5 py-1 bg-gradient-to-r ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).badge} text-white text-[10px] font-bold rounded-full shadow-lg`}>
                      {achievement.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-3 left-3 z-10">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}, ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}aa)` }}
                    >
                      <achievement.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Shimmer sweep on hover */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, transparent, ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}, transparent)` }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors mb-1 line-clamp-2 leading-snug">
                    {achievement.title}
                  </h3>
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: (CATEGORY_COLOR[achievement.category] ?? defaultColor).border }}
                  >
                    {achievement.date}
                  </span>
                  <p className="mt-1.5 text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Second set for seamless loop */}
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={`second-${achievement.title}`}
                variants={cardVariants}
                onClick={() => setSelectedImage(achievement.image)}
                className="group relative flex-shrink-0 w-[380px] rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 overflow-hidden shadow-xl cursor-pointer transition-all duration-300"
                style={{ borderLeft: `3px solid ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}50` }}
                whileHover={{
                  y: -8,
                  borderColor: (CATEGORY_COLOR[achievement.category] ?? defaultColor).border,
                  boxShadow: `0 20px 40px ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).glow}`,
                }}
              >
                <div className="relative w-full h-[240px] overflow-hidden bg-gray-950">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2.5 py-1 bg-gradient-to-r ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).badge} text-white text-[10px] font-bold rounded-full shadow-lg`}>
                      {achievement.category}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}, ${(CATEGORY_COLOR[achievement.category] ?? defaultColor).border}aa)` }}
                    >
                      <achievement.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors mb-1 line-clamp-2 leading-snug">
                    {achievement.title}
                  </h3>
                  <span className="text-[11px] font-semibold" style={{ color: (CATEGORY_COLOR[achievement.category] ?? defaultColor).border }}>
                    {achievement.date}
                  </span>
                  <p className="mt-1.5 text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-10 sm:w-28 h-full bg-gradient-to-r from-gray-800 via-gray-800/50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-10 sm:w-28 h-full bg-gradient-to-l from-gray-800 via-gray-800/50 to-transparent pointer-events-none z-10"></div>
        </motion.div>

        {/* Full Size Image Modal */}
        {selectedImage && (() => {
          const match = achievements.find(a => a.image === selectedImage)
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22 }}
              className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Achievement"
                className="w-full max-h-[70vh] object-contain bg-gray-950"
              />
              {match && (
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-snug">{match.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{match.description}</p>
                    </div>
                    <span className={`flex-shrink-0 px-3 py-1 bg-gradient-to-r ${(CATEGORY_COLOR[match.category] ?? defaultColor).badge} text-white text-xs font-bold rounded-full`}>
                      {match.category}
                    </span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold rounded-full flex items-center justify-center text-lg transition-all"
              >
                ×
              </button>
              <div className="absolute bottom-[5.5rem] left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gray-900/80 backdrop-blur-sm text-gray-400 text-xs rounded-full border border-gray-700">
                Click outside to close
              </div>
            </motion.div>
          </motion.div>
          )
        })()}

      </div>
    </section>
  )
}
