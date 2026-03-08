import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaChevronDown, FaBrain, FaLayerGroup, FaMicrochip, FaChartLine } from 'react-icons/fa'
import { SiIeee } from 'react-icons/si'

type Step = {
  label: string
  detail: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const pipeline: Step[] = [
  {
    label: '1. Raw Signal Acquisition',
    detail: 'EEG/ECG/PPG physiological signals sampled at 256 Hz. Applied bandpass filtering (0.5–40 Hz) and notch filter at 60 Hz to remove powerline interference.',
    icon: FaMicrochip,
    color: 'text-cyan-400',
  },
  {
    label: '2. Feature Extraction',
    detail: 'Biorthogonal Wavelet Decomposition (bior2.6) to extract time-frequency features across 5 sub-bands. Computed 42 statistical and spectral features per 30-second epoch.',
    icon: FaLayerGroup,
    color: 'text-blue-400',
  },
  {
    label: '3. Hybrid Architecture',
    detail: 'Fused VGG16 (spatial pattern extraction from spectrogram images) with Vision Transformer (long-range temporal dependencies). Designed a custom cross-attention bridge between the two streams.',
    icon: FaBrain,
    color: 'text-violet-400',
  },
  {
    label: '4. Training & Validation',
    detail: 'Trained on 10,000+ annotated biomedical signal epochs. 5-fold cross-validation. Used class-weighted loss to handle severe sleep stage imbalance (REM: 8%, N3: 12%).',
    icon: FaChartLine,
    color: 'text-emerald-400',
  },
]

const metrics = [
  { label: 'Overall Accuracy', value: '99.2%', sub: 'EEG/ECG sleep staging' },
  { label: 'Model Size Reduction', value: '40%', sub: 'vs. baseline VGG16' },
  { label: 'Signal Epochs Processed', value: '10K+', sub: 'Clinical dataset' },
  { label: 'IEEE Impact Factor', value: '3.4', sub: 'IEEE Access journal' },
]

export default function TechDeepDive() {
  const [open, setOpen] = useState(false)

  return (
    <section className="section-padding bg-[#07090f]">
      <div className="section-container">

        {/* Header trigger */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-mono text-violet-500/70 uppercase tracking-widest mb-3">Engineering Depth</p>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="heading-lg text-white">
                Technical <span className="gradient-text">Deep Dive</span>
              </h2>
              <p className="mt-3 body-base text-gray-500">
                How I built a{' '}
                <span className="text-white font-medium">99.2% accuracy biomedical AI system</span>{' '}
                published in IEEE Access (Impact Factor 3.4).
              </p>
            </div>
            <button
              onClick={() => setOpen(v => !v)}
              className="self-start shrink-0 sm:mt-1 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-500/30 bg-violet-500/5 text-violet-400 hover:bg-violet-500/10 text-sm font-medium transition-colors"
            >
              {open ? 'Collapse' : 'Expand'}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <FaChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>
        </motion.div>

        {/* Metrics strip — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8"
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/8 bg-gray-900/60 p-4 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{m.value}</p>
              <p className="text-xs font-semibold text-gray-300 mt-1">{m.label}</p>
              <p className="text-[10px] text-gray-600 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Collapsible deep dive */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="deep-dive"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-6">
                {/* Challenge context */}
                <div className="rounded-xl border border-white/8 bg-gray-900/60 p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <SiIeee className="w-4 h-4 text-blue-400" />
                    The Engineering Challenge
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Sleep stage classification from raw physiological signals is a hard multi-class problem with high class imbalance,
                    noisy inputs, and expert-level annotation costs. The goal was to build a model that could match clinical polysomnography
                    accuracy while being compact enough for real-time inference on edge devices.
                  </p>
                </div>

                {/* ML Pipeline */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">ML Pipeline</h3>
                  <div className="space-y-3">
                    {pipeline.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex gap-4 rounded-xl border border-white/6 bg-gray-900/40 p-4 sm:p-5"
                      >
                        <div className="shrink-0 mt-0.5">
                          <step.icon className={`w-4 h-4 ${step.color}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${step.color} mb-1`}>{step.label}</p>
                          <p className="text-sm text-gray-400 leading-relaxed">{step.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Key insight */}
                <div className="rounded-xl border border-cyan-500/15 bg-cyan-500/5 p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-cyan-400 mb-2">Key Engineering Insight</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    The breakthrough came from recognizing that sleep staging requires <em>both</em> local morphological patterns (handled by
                    CNN) <em>and</em> global temporal context across epochs (handled by Vision Transformer). Instead of choosing one, I
                    designed a cross-attention fusion layer that lets each stream weight the other, reducing model size 40% while
                    improving accuracy by 2.3%.
                  </p>
                </div>

                {/* Publication link */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://doi.org/10.1109/ACCESS.2025.3571145"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-sm font-medium transition-colors"
                  >
                    <SiIeee className="w-4 h-4" />
                    Read IEEE Paper
                  </a>
                  <span className="text-xs text-gray-600">IEEE Access, 2025 · DOI: 10.1109/ACCESS.2025.3571145</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
