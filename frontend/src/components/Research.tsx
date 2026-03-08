import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaExternalLinkAlt, FaFlask, FaBookOpen, FaQuoteLeft } from 'react-icons/fa'
import { SiIeee } from 'react-icons/si'

const impactStats = [
  { value: '3',    label: 'IEEE Publications',  sub: 'Peer-reviewed papers',       icon: FaBookOpen,  color: '#22d3ee' },
  { value: '3.4',  label: 'Avg Impact Factor',  sub: 'IEEE Access journal',        icon: SiIeee,      color: '#a855f7' },
  { value: '98%+', label: 'Model Accuracy',     sub: 'Best result achieved',       icon: FaFlask,     color: '#10b981' },
]

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
    authors: ["Prithviraj Verma", "et al."],
    journal: "IEEE Access, 2025",
    year: "2025",
    abstract: "This paper presents a novel approach for automated identification of cyclic alternating patterns (CAP) in sleep EEG signals using a fusion architecture combining VGG16 convolutional neural networks and Vision Transformer models. The research contributes to improved sleep analysis and medical diagnostics through advanced deep learning techniques.",
    keywords: ["Sleep Analysis", "CAP Detection", "VGG16", "Vision Transformer", "Deep Learning", "EEG"],
    paperLink: "https://doi.org/10.1109/ACCESS.2025.3571145",
    category: "Journal"
  },
  {
    title: "PPG-Based Accurate Insomnia Detection System Using Convolutional Neural Networks With Self-Attention Mechanism and Gated Recurrent Units",
    authors: ["Prithviraj Verma", "et al."],
    journal: "IEEE Access, 2025",
    year: "2025",
    abstract: "This research presents an accurate insomnia detection system based on photoplethysmography (PPG) signals using a hybrid architecture combining convolutional neural networks with self-attention mechanisms and gated recurrent units for enhanced sleep disorder diagnosis.",
    keywords: ["PPG", "Insomnia Detection", "CNN", "Self-Attention", "GRU", "Sleep Disorders"],
    paperLink: "https://doi.org/10.1109/ACCESS.2025.3598863",
    category: "Journal"
  },
  {
    title: "Automated Sleep Stage Classification Using Biorthogonal Wavelet Decomposition and Machine Learning Techniques",
    authors: ["Prithviraj Verma", "et al."],
    journal: "2025 International Conference on Artificial Intelligence and Machine Vision (AIMV), IEEE",
    year: "2025",
    abstract: "This work presents an automated sleep stage classification system leveraging classical machine learning combined with advanced signal processing techniques, enabling accurate and efficient staging of sleep from physiological signals without manual intervention.",
    keywords: ["Sleep Stage Classification", "Machine Learning", "Signal Processing", "EEG", "Biomedical AI"],
    paperLink: "https://doi.org/10.1109/AIMV66517.2025.11203559",
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
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 section-padding"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/3 h-96 w-96 rounded-full bg-gradient-to-l from-purple-500/10 to-indigo-500/10 blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
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
            <span className="gradient-text">Research</span>{' '}&amp;{' '}Publications
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 160, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-3 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
          />
          <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto">
            Peer-reviewed work on deep learning, biomedical signal processing &amp; AI diagnostics
          </p>
        </motion.div>

        {/* Impact stats row */}
        <motion.div
          className="grid grid-cols-3 gap-2 sm:gap-4 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {impactStats.map((s) => (
            <div
              key={s.label}
              className="relative rounded-xl bg-gray-800/60 border border-gray-700/50 p-3 sm:p-4 text-center overflow-hidden"
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />
              <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">{s.value}</p>
              <p className="text-[11px] font-semibold text-gray-300 mt-0.5">{s.label}</p>
              <p className="text-[10px] text-gray-500">{s.sub}</p>
            </div>
          ))}
        </motion.div>


        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-transparent shadow-md'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'
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
          className="space-y-6 sm:space-y-8"
        >
          {filteredPapers.map((paper, paperIdx) => (
            <motion.div
              key={paper.title}
              variants={paperVariants}
              className="group relative rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 overflow-hidden shadow-xl hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300"
              style={{ borderLeft: '3px solid rgba(6,182,212,0.25)' }}
              whileHover={{ y: -4, borderLeftColor: 'rgba(6,182,212,0.7)' }}
            >
              {/* hover glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(6,182,212,0.07), transparent 60%)' }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="p-5 sm:p-7 relative z-10">
                {/* Top row */}
                <div className="flex items-start gap-4 mb-5">
                  {/* Paper number */}
                  <div className="hidden sm:flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                    <span className="text-4xl font-black text-gray-800 leading-none tabular-nums select-none">
                      {String(paperIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Paper</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Category + Year chips */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        paper.category === 'Journal'    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                        paper.category === 'Conference' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                        paper.category === 'Workshop'   ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30' :
                        'bg-gray-700 text-gray-400 border border-gray-600'
                      }`}>
                        {paper.category}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">{paper.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2.5">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                      {paper.authors.map((author, idx) => (
                        <span
                          key={idx}
                          className={author.includes('Prithviraj') ? 'text-cyan-400 font-semibold' : ''}
                        >
                          {author}{idx < paper.authors.length - 1 ? '·' : ''}
                        </span>
                      ))}
                    </div>

                    {/* Journal */}
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-400">Published in </span>
                      {paper.journal}
                    </p>
                  </div>
                </div>

                {/* Keywords — always visible */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {paper.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 text-[11px] font-medium rounded-md border border-cyan-500/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Abstract expandable */}
                <motion.div
                  initial={false}
                  animate={{ height: expandedPaper === paper.title ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 border-t border-gray-700/50 pt-4">
                    <div className="flex gap-2">
                      <FaQuoteLeft className="text-gray-700 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-400 text-sm leading-relaxed">{paper.abstract}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Actions row */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-2">
                    {paper.paperLink && (
                      <motion.a
                        href={paper.paperLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-md hover:shadow-[0_0_14px_rgba(6,182,212,0.3)] transition-all"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <FaExternalLinkAlt className="w-3 h-3" />
                        View on IEEE
                      </motion.a>
                    )}
                  </div>

                  <motion.button
                    onClick={() => setExpandedPaper(expandedPaper === paper.title ? null : paper.title)}
                    className="text-xs text-gray-500 hover:text-cyan-400 font-medium transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.03 }}
                  >
                    <motion.span
                      animate={{ rotate: expandedPaper === paper.title ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-block"
                    >
                      ▼
                    </motion.span>
                    {expandedPaper === paper.title ? 'Hide Abstract' : 'Read Abstract'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
