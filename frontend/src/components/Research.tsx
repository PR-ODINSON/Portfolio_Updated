import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaExternalLinkAlt, FaFlask, FaBookOpen } from 'react-icons/fa'

type ResearchPaper = {
  title: string
  authors: string[]
  journal: string
  year: string
  abstract: string
  keywords: string[]
  paperLink?: string
  category: 'Conference' | 'Journal' | 'Workshop' | 'Preprint'
}

const researchPapers: ResearchPaper[] = [
  {
    title: "Automated Identification of Cyclic Alternating Patterns of Sleep Using Fusion of VGG16 and Vision Transformer",
    authors: ["Prithviraj Verma", "Research Collaborators"],
    journal: "IEEE Conference Publication",
    year: "2024",
    abstract: "This paper presents a novel approach for automated identification of cyclic alternating patterns (CAP) in sleep EEG signals using a fusion architecture combining VGG16 convolutional neural networks and Vision Transformer models. The research contributes to improved sleep analysis and medical diagnostics through advanced deep learning techniques.",
    keywords: ["Sleep Analysis", "CAP Detection", "VGG16", "Vision Transformer", "Deep Learning", "EEG"],
    paperLink: "https://ieeexplore.ieee.org/abstract/document/11124893/",
    category: "Conference"
  },
  {
    title: "PPG-Based Accurate Insomnia Detection System Using Convolutional Neural Networks With Self-Attention Mechanism and Gated Recurrent Units",
    authors: ["Prithviraj Verma", "Research Team"],
    journal: "IEEE Conference Publication",
    year: "2024",
    abstract: "This research presents an accurate insomnia detection system based on photoplethysmography (PPG) signals using a hybrid architecture combining convolutional neural networks with self-attention mechanisms and gated recurrent units for enhanced sleep disorder diagnosis.",
    keywords: ["PPG", "Insomnia Detection", "CNN", "Self-Attention", "GRU", "Sleep Disorders"],
    paperLink: "https://ieeexplore.ieee.org/abstract/document/11006687",
    category: "Conference"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const paperVariants = {
  hidden: { 
    y: 60, 
    opacity: 0,
    rotateX: -15
  },
  show: { 
    y: 0, 
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 5,
    boxShadow: "0 25px 50px rgba(142, 236, 245, 0.15)",
    transition: { duration: 0.3 }
  }
}


export default function Research() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = ['All', 'Journal', 'Conference', 'Workshop', 'Preprint']
  
  const filteredPapers = selectedCategory === 'All' 
    ? researchPapers 
    : researchPapers.filter(paper => paper.category === selectedCategory)


  return (
    <section 
      id="research" 
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 py-28 px-6 lg:px-12"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/3 h-96 w-96 rounded-full bg-gradient-to-l from-indigo-500/15 to-cyan-500/15 blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            rotate: [360, 240, 120, 0]
          }}
          transition={{ 
            duration: 35,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaFlask className="text-4xl text-blue-400 mr-4" />
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Research
            </motion.h2>
            <FaBookOpen className="text-4xl text-purple-400 ml-4" />
          </motion.div>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 180, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
          />
          
          <motion.p
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Exploring the frontiers of AI, machine learning, and emerging technologies through rigorous research and innovation
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
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg'
                  : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Research Papers */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-8"
        >
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.title}
              variants={paperVariants}
              whileHover="hover"
              className="group relative rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 overflow-hidden shadow-xl"
            >
              <div className="p-8">
                {/* Paper Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        paper.category === 'Journal' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
                        paper.category === 'Conference' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' :
                        paper.category === 'Workshop' ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white' :
                        'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
                      }`}>
                        {paper.category}
                      </span>
                      <span className="text-sm text-gray-400 font-medium">{paper.year}</span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3 leading-tight">
                      {paper.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-4">
                      <span className="font-medium">Authors:</span>
                      {paper.authors.map((author, idx) => (
                        <span key={idx} className={author.includes('Prithviraj') ? 'text-blue-400 font-semibold' : ''}>
                          {author}{idx < paper.authors.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-400 mb-4">
                      <span className="font-medium">Published in:</span> {paper.journal}
                    </div>
                  </div>

                </div>

                {/* Abstract */}
                <motion.div
                  initial={false}
                  animate={{ height: expandedPaper === paper.title ? 'auto' : '0' }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-700/50">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Abstract</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {paper.abstract}
                    </p>
                    
                    {/* Keywords */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {paper.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <div className="flex flex-wrap gap-3">
                    {paper.paperLink && (
                      <motion.a
                        href={paper.paperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        View Paper
                      </motion.a>
                    )}
                  </div>

                  <motion.button
                    onClick={() => setExpandedPaper(expandedPaper === paper.title ? null : paper.title)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {expandedPaper === paper.title ? 'Show Less' : 'Show More'}
                  </motion.button>
                </div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
