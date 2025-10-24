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
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-12"
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

      <div className="max-w-7xl mx-auto">
        {/* Header with Sword Animation */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={swordVariants}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              className="w-2 h-20 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-4"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Achievements
            </motion.h2>
            <motion.div
              className="w-2 h-20 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full ml-4"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 200, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto h-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
          
          <motion.p
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            A collection of milestones, recognitions, and victories that showcase my journey in technology and innovation
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all border-2 ${
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
          className="relative overflow-hidden"
        >
          {/* Infinite Scrolling Container */}
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100 * filteredAchievements.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: filteredAchievements.length * 3,
                ease: "linear",
              },
            }}
          >
            {/* First set of achievements */}
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={`first-${achievement.title}`}
                variants={cardVariants}
                whileHover="hover"
                className="group relative flex-shrink-0 w-80 h-96 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 overflow-hidden shadow-xl"
              >
                {/* Achievement Image */}
                <div className="relative h-full overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                      {achievement.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <achievement.icon className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-gray-300 font-medium">
                        {achievement.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Sword Slash Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={`second-${achievement.title}`}
                variants={cardVariants}
                whileHover="hover"
                className="group relative flex-shrink-0 w-80 h-96 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 overflow-hidden shadow-xl"
              >
                {/* Achievement Image */}
                <div className="relative h-full overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                      {achievement.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <achievement.icon className="w-6 h-6 text-black" />
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-gray-300 font-medium">
                        {achievement.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Sword Slash Effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays for Seamless Effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10"></div>
        </motion.div>

      </div>
    </section>
  )
}
