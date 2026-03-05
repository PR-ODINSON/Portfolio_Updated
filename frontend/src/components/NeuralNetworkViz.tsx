import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Node { ox: number; oy: number; oz: number; color: [number,number,number]; size: number; phase: number }
interface Pulse { t: number; speed: number }
interface Conn { a: number; b: number; pulses: Pulse[] }

const COLORS: [number,number,number][] = [
  [6, 182, 212],   // cyan
  [99, 102, 241],  // indigo
  [139, 92, 246],  // violet
  [168, 85, 247],  // purple
]

export default function NeuralNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const [hovered, setHovered] = useState(false)

  // Spring-driven card scale for the outer wrapper
  const scaleSpring = useSpring(useMotionValue(1), { stiffness: 200, damping: 22 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    const N = 72, R = 118, FOV = 480
    let nodes: Node[] = []
    let conns: Conn[] = []
    let W = 0, H = 0, cx = 0, cy = 0

    // ── Interaction state ─────────────────────────────
    const mouse   = { x: -9999, y: -9999 }  // canvas-space
    let isHovered = false
    let isDragging = false
    let dragLast   = { x: 0, y: 0 }

    // Manual rotation offset (lerped)
    let manualYaw   = 0, manualPitch = 0
    let targetYaw   = 0, targetPitch = 0

    // Speed multiplier (lerped)
    let speedMult    = 1, targetSpeed = 1

    // Hover scale for the canvas orb (drawn scale, smoothly lerped)
    let drawScale    = 1, targetScale = 1

    const build = () => {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      cx = W / 2
      cy = H / 2

      // Fibonacci sphere — even distribution of points on a sphere
      const g = Math.PI * (3 - Math.sqrt(5))
      nodes = Array.from({ length: N }, (_, i) => {
        const y0 = 1 - (i / (N - 1)) * 2
        const r0 = Math.sqrt(1 - y0 * y0)
        return {
          ox: Math.cos(g * i) * r0 * R,
          oy: y0 * R,
          oz: Math.sin(g * i) * r0 * R,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 1.5 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
        }
      })

      conns = []
      for (let i = 0; i < N; i++) {
        let cnt = 0
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].ox - nodes[j].ox
          const dy = nodes[i].oy - nodes[j].oy
          const dz = nodes[i].oz - nodes[j].oz
          if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 68 && cnt < 5) {
            conns.push({ a: i, b: j, pulses: [] })
            cnt++
          }
        }
      }
    }

    build()

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf.current)
      build()
      raf.current = requestAnimationFrame(draw)
    })
    ro.observe(canvas)

    // ── Pointer events ────────────────────────────────
    const onMouseEnter = () => {
      isHovered   = true
      targetSpeed = 2.6
      targetScale = 1.13
      setHovered(true)
      scaleSpring.set(1.04)  // card wrapper also enlarges slightly
    }
    const onMouseLeave = () => {
      isHovered    = false
      isDragging   = false
      targetSpeed  = 1
      targetScale  = 1
      targetYaw    = 0
      targetPitch  = 0
      mouse.x      = -9999
      mouse.y      = -9999
      setHovered(false)
      scaleSpring.set(1)
    }
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (isDragging) {
        const dx = e.clientX - dragLast.x
        const dy = e.clientY - dragLast.y
        targetYaw   += dx * 0.012
        targetPitch += dy * 0.012
        dragLast = { x: e.clientX, y: e.clientY }
      }
    }
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      dragLast   = { x: e.clientX, y: e.clientY }
    }
    const onMouseUp   = () => { isDragging = false }

    canvas.addEventListener('mouseenter', onMouseEnter)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('mousemove',  onMouseMove)
    canvas.addEventListener('mousedown',  onMouseDown)
    window.addEventListener('mouseup',    onMouseUp)

    let lastSpawn = 0
    let burstCount = 0

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H)
      const t = ts * 0.00027

      // ── Lerp interaction state ─────────────────────
      const lerp = (a: number, b: number, k: number) => a + (b - a) * k
      speedMult  = lerp(speedMult,  targetSpeed, 0.06)
      drawScale  = lerp(drawScale,  targetScale, 0.07)
      manualYaw  = lerp(manualYaw,  targetYaw,   0.10)
      manualPitch= lerp(manualPitch,targetPitch, 0.10)

      // Burst pulses on hover start
      if (isHovered && burstCount < 18) {
        const c = conns[Math.floor(Math.random() * conns.length)]
        if (c.pulses.length < 3) c.pulses.push({ t: 0, speed: 0.008 + Math.random() * 0.01 })
        burstCount++
      }
      if (!isHovered) burstCount = 0

      const scaledR = R * drawScale

      // Subtle grid background
      ctx.strokeStyle = isHovered ? 'rgba(99,102,241,0.072)' : 'rgba(99,102,241,0.042)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < W; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      // Deep central glow — intensifies on hover
      const glowAlpha = isHovered ? 0.22 : 0.14
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scaledR * 1.5)
      bgGlow.addColorStop(0, `rgba(99,102,241,${glowAlpha})`)
      bgGlow.addColorStop(0.5, `rgba(139,92,246,${glowAlpha * 0.42})`)
      bgGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bgGlow
      ctx.beginPath(); ctx.arc(cx, cy, scaledR * 1.5, 0, Math.PI * 2); ctx.fill()

      // Atmosphere rim — brighter + wider on hover
      const rimAlpha = isHovered ? 0.14 : 0.055
      const atmGlow = ctx.createRadialGradient(cx, cy, scaledR * 0.78, cx, cy, scaledR * 1.14)
      atmGlow.addColorStop(0, 'rgba(6,182,212,0)')
      atmGlow.addColorStop(0.5, `rgba(6,182,212,${rimAlpha})`)
      atmGlow.addColorStop(1, 'rgba(6,182,212,0)')
      ctx.fillStyle = atmGlow
      ctx.beginPath(); ctx.arc(cx, cy, scaledR * 1.14, 0, Math.PI * 2); ctx.fill()

      // Dual-axis auto rotation + manual drag offset
      const tS   = t * speedMult
      const cosY = Math.cos(tS + manualYaw),  sinY = Math.sin(tS + manualYaw)
      const cosX = Math.cos(tS * 0.37 + manualPitch), sinX = Math.sin(tS * 0.37 + manualPitch)

      const proj = nodes.map(n => {
        // Scale the sphere outward on hover (scale each point from origin)
        const sx = n.ox * drawScale, sy2 = n.oy * drawScale, sz = n.oz * drawScale
        // Rotate Y axis
        const x1 = sx * cosY + sz * sinY
        const z1 = -sx * sinY + sz * cosY
        // Rotate X axis
        const y2 = sy2 * cosX - z1 * sinX
        const z2 = sy2 * sinX + z1 * cosX
        // Perspective project
        const s = FOV / (FOV + z2 + scaledR + 20)
        return { px: cx + x1 * s, py: cy + y2 * s, z: z2, sc: s }
      })

      // Spawn data pulse — faster when hovered
      const spawnInterval = isHovered ? 42 : 88
      if (ts - lastSpawn > spawnInterval) {
        const c = conns[Math.floor(Math.random() * conns.length)]
        const maxPulses = isHovered ? 4 : 2
        if (c.pulses.length < maxPulses) c.pulses.push({ t: 0, speed: (0.005 + Math.random() * 0.006) * speedMult })
        lastSpawn = ts
      }

      // Connections + travelling pulses
      conns.forEach(c => {
        const a = proj[c.a], b = proj[c.b]
        const depth = Math.max(0, ((a.z + b.z) * 0.5 + scaledR) / (scaledR * 2))
        // Boost connection brightness near cursor
        const midX = (a.px + b.px) * 0.5, midY = (a.py + b.py) * 0.5
        const distToCursor = Math.hypot(midX - mouse.x, midY - mouse.y)
        const cursorBoost = isHovered ? Math.max(0, 1 - distToCursor / 80) * 0.28 : 0
        ctx.strokeStyle = `rgba(99,102,241,${depth * 0.17 + cursorBoost})`
        ctx.lineWidth = 0.5 + cursorBoost * 1.2
        ctx.beginPath(); ctx.moveTo(a.px, a.py); ctx.lineTo(b.px, b.py); ctx.stroke()

        c.pulses = c.pulses.filter(p => p.t <= 1)
        c.pulses.forEach(p => {
          p.t += p.speed
          const px = a.px + (b.px - a.px) * p.t
          const py = a.py + (b.py - a.py) * p.t
          const fade = Math.sin(p.t * Math.PI) * Math.sqrt(depth + 0.1)
          if (fade < 0.02) return
          const [rv, gv, bv] = nodes[c.a].color
          const gr = ctx.createRadialGradient(px, py, 0, px, py, 6 * fade)
          gr.addColorStop(0, `rgba(${rv},${gv},${bv},${fade})`)
          gr.addColorStop(1, `rgba(${rv},${gv},${bv},0)`)
          ctx.fillStyle = gr
          ctx.beginPath(); ctx.arc(px, py, 6 * fade, 0, Math.PI * 2); ctx.fill()
        })
      })

      // Horizontal scanner sweep
      const sy = cy + Math.sin(t * 1.85) * R * 0.8
      const sg = ctx.createLinearGradient(cx - R * 1.1, sy, cx + R * 1.1, sy)
      sg.addColorStop(0, 'rgba(6,182,212,0)');    sg.addColorStop(0.38, 'rgba(6,182,212,0)')
      sg.addColorStop(0.5, 'rgba(6,182,212,0.2)'); sg.addColorStop(0.62, 'rgba(6,182,212,0)')
      sg.addColorStop(1, 'rgba(6,182,212,0)')
      ctx.strokeStyle = sg; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(cx - R * 1.1, sy); ctx.lineTo(cx + R * 1.1, sy); ctx.stroke()

      // Nodes — sorted back-to-front for proper depth ordering
      proj
        .map((p, i) => ({ ...p, ni: i }))
        .sort((a, b) => a.z - b.z)
        .forEach(({ px, py, z, sc, ni }) => {
          const depth = Math.max(0.05, (z + scaledR) / (scaledR * 2))
          const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0015 + nodes[ni].phase)
          const r = nodes[ni].size * sc * (0.82 + pulse * 0.28)
          const [rv, gv, bv] = nodes[ni].color
          const alpha = 0.1 + depth * 0.9

          // Cursor proximity — nodes close to mouse light up
          const distC = Math.hypot(px - mouse.x, py - mouse.y)
          const proximity = isHovered ? Math.max(0, 1 - distC / 55) : 0
          const alphaFinal   = Math.min(1, alpha + proximity * 0.7)
          const rFinal       = r * (1 + proximity * 0.9)  // node swells near cursor

          // Outer glow — extra bloom near cursor
          const glowRadius = rFinal * (7 + proximity * 5)
          const glow = ctx.createRadialGradient(px, py, 0, px, py, glowRadius)
          glow.addColorStop(0, `rgba(${rv},${gv},${bv},${(alpha * 0.28) + proximity * 0.5})`)
          glow.addColorStop(1, `rgba(${rv},${gv},${bv},0)`)
          ctx.fillStyle = glow
          ctx.beginPath(); ctx.arc(px, py, glowRadius, 0, Math.PI * 2); ctx.fill()

          // Node body
          ctx.beginPath(); ctx.arc(px, py, rFinal, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rv},${gv},${bv},${alphaFinal})`
          ctx.fill()

          // Proximity ring — white outline flare
          if (proximity > 0.15) {
            ctx.beginPath(); ctx.arc(px, py, rFinal + 2, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(255,255,255,${proximity * 0.55})`
            ctx.lineWidth = proximity * 1.5
            ctx.stroke()
          }

          // Specular highlight
          if (rFinal > 1.3) {
            ctx.beginPath(); ctx.arc(px - rFinal * 0.25, py - rFinal * 0.25, rFinal * 0.38, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${alphaFinal * 0.7})`
            ctx.fill()
          }
        })

      raf.current = requestAnimationFrame(draw)
    }

    raf.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      canvas.removeEventListener('mouseenter', onMouseEnter)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('mousemove',  onMouseMove)
      canvas.removeEventListener('mousedown',  onMouseDown)
      window.removeEventListener('mouseup',    onMouseUp)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{ scale: scaleSpring }}
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0"
    >
      {/* ── Main card ─────────────────────────────────── */}
      <div
        ref={wrapRef}
        className={`relative rounded-2xl border bg-gray-950/90 backdrop-blur-sm overflow-hidden shadow-2xl transition-all duration-500 ${
          hovered
            ? 'border-cyan-400/50 shadow-cyan-500/25'
            : 'border-cyan-500/20 shadow-indigo-500/10'
        }`}
      >

        {/* Canvas */}
        <div className={`relative cursor-crosshair transition-all duration-300 ${hovered ? 'brightness-110' : ''}`} style={{ aspectRatio: '1' }}>
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* CSS 3D orbital rings — speed up on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ perspective: '900px' }}
          >
            <motion.div
              className={`absolute rounded-full border transition-colors duration-500 ${hovered ? 'border-cyan-400/45' : 'border-cyan-400/20'}`}
              style={{ width: hovered ? '68%' : '64%', height: hovered ? '68%' : '64%', rotateX: 72, transition: 'width 0.5s, height 0.5s' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: hovered ? 6 : 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className={`absolute rounded-full border transition-colors duration-500 ${hovered ? 'border-violet-400/35' : 'border-violet-500/15'}`}
              style={{ width: hovered ? '86%' : '80%', height: hovered ? '86%' : '80%', rotateX: 65, transition: 'width 0.5s, height 0.5s' }}
              animate={{ rotate: [0, -360] }}
              transition={{ duration: hovered ? 9 : 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Targeting corner brackets — expand on hover */}
          {(['top-2 left-2 border-l border-t','top-2 right-2 border-r border-t','bottom-2 left-2 border-l border-b','bottom-2 right-2 border-r border-b'] as const).map((cls, i) => (
            <div
              key={i}
              className={`absolute ${cls} transition-all duration-300 ${hovered ? 'w-6 h-6 border-cyan-400/80' : 'w-4 h-4 border-cyan-500/40'}`}
            />
          ))}

          {/* Top label — changes on hover */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className={`text-[9px] font-mono tracking-widest whitespace-nowrap transition-colors duration-300 ${hovered ? 'text-cyan-400/70' : 'text-gray-600'}`}>
              {hovered ? '⚡ DRAG TO ROTATE · HOVER TO EXPLORE' : '72 NEURONS · 280 SYNAPSES'}
            </p>
          </div>

          {/* Hover ripple — expands from centre on hover entry */}
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-cyan-400/30"
                  style={{ width: '20%', height: '20%' }}
                  initial={{ scale: 0.5, opacity: 0.7 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1.8, delay: i * 0.5, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.3 }}
                />
              ))}
            </motion.div>
          )}

          {/* Pulsing reticle rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 1.18].map((scale, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-cyan-500/10"
                style={{ width: '58%', height: '58%' }}
                animate={{ scale: [scale, scale * 1.06, scale], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 2.8 + i * 0.8, repeat: Infinity, delay: i * 1.1, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating badge — right ─────────────────────── */}
      <motion.div
        className="absolute -right-2 top-[20%] bg-gray-900/95 backdrop-blur-sm border border-indigo-500/30 rounded-xl px-3 py-2 shadow-lg shadow-indigo-500/15"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-[8px] text-gray-500 font-mono uppercase tracking-widest">Architecture</p>
        <p className="text-xs text-indigo-300 font-mono font-bold">Transformer</p>
      </motion.div>

      {/* ── Floating badge — left ──────────────────────── */}
      <motion.div
        className="absolute -left-2 bottom-[20%] bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-xl px-3 py-2 shadow-lg shadow-purple-500/15"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <p className="text-[8px] text-gray-500 font-mono uppercase tracking-widest">Parameters</p>
        <p className="text-xs text-purple-300 font-mono font-bold">175 B</p>
      </motion.div>

      {/* Ambient card glow — intensifies on hover */}
      <div className={`absolute inset-0 -z-10 rounded-2xl blur-3xl scale-110 pointer-events-none transition-all duration-500 ${
        hovered
          ? 'bg-gradient-to-br from-cyan-500/18 via-indigo-500/20 to-purple-500/18'
          : 'bg-gradient-to-br from-cyan-500/6 via-indigo-500/8 to-purple-500/6'
      }`} />
    </motion.div>
  )
}
