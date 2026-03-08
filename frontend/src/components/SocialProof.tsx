import { motion } from 'framer-motion'
import { SiIeee } from 'react-icons/si'
import { FaUniversity, FaGlobeEurope, FaTrophy, FaStar } from 'react-icons/fa'

const credentials = [
  {
    icon: SiIeee,
    label: 'IEEE Access',
    detail: '3 Publications · 3.4 Impact Factor',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: FaUniversity,
    label: 'IIT Delhi',
    detail: 'Research Intern · Deep Learning Lab',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: FaGlobeEurope,
    label: 'Garnet AI · Dublin',
    detail: 'Full-Stack ML Engineer · LLM Platform',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: FaStar,
    label: 'Google',
    detail: 'Student Ambassador',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: FaTrophy,
    label: 'IIT Bombay Techfest',
    detail: '1st Runner Up · 500+ Participants',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
]

export default function SocialProof() {
  return (
    <section className="relative border-y border-white/6 bg-[#07090f] overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="section-container py-5 sm:py-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          {/* Label */}
          <span className="shrink-0 text-[10px] font-mono text-gray-600 uppercase tracking-widest whitespace-nowrap">
            Trusted by
          </span>
          <div className="hidden sm:block w-px h-5 bg-gray-800" />

          {/* Credentials */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 w-full">
            {credentials.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full ${c.bg} border ${c.border} group`}
              >
                <c.icon className={`w-3.5 h-3.5 shrink-0 ${c.color}`} />
                <span className="text-xs font-semibold text-white/90 whitespace-nowrap">{c.label}</span>
                <span className="hidden md:block text-[10px] text-gray-500 border-l border-white/10 pl-2 whitespace-nowrap">
                  {c.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </section>
  )
}
