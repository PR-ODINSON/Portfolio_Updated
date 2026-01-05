import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center"
    >
      {/* Background decorative elements with parallax effect */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
          initial={{ y: 0, scale: 1 }}
          animate={{ 
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute right-1/2 top-1/2 h-[30rem] w-[30rem] translate-x-1/2 rounded-full bg-gradient-to-l from-purple-500/20 to-indigo-500/20 blur-2xl"
          initial={{ x: 0, y: 0 }}
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </div>

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-80px)] py-12 sm:py-16">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="text-center lg:text-left space-y-4 sm:space-y-6"
            >
              <motion.p
                variants={item}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400"
              >
                WELCOME, I'M
              </motion.p>
              
              <motion.h1
                variants={item}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="heading-xl gradient-text"
              >
                PRITHVIRAJ VERMA
              </motion.h1>
              
              <motion.p
                variants={item}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="body-lg text-gray-100"
              >
                As a passionate <span className="text-cyan-400 font-semibold">AI/ML Engineer</span> and <span className="text-cyan-400 font-semibold">Full-Stack Developer</span>, I create
                scalable, intelligent systems that bridge data-driven intelligence with seamless user
                experiences.
              </motion.p>
              
              <motion.p
                variants={item}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="body-base text-gray-300"
              >
                With expertise across AI, web technologies, and cloud deployment, I focus on transforming ideas 
                into production-grade innovation and making ML solutions scalable & accessible.
              </motion.p>
              
              <motion.div
                variants={item}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-primary w-full sm:w-auto text-center"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="btn btn-secondary w-full sm:w-auto text-center"
                >
                  Get in Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: 3 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0"
            >
              <motion.img
                src="/prithvi.png"
                alt="Prithviraj Verma"
                className="w-full h-auto rounded-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}