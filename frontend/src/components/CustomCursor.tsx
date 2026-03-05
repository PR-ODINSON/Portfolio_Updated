import { useEffect, useRef } from 'react'

/**
 * Lag-free custom cursor.
 *
 * Strategy for zero-lag:
 *  • The "dot" (small inner circle) is synced 1:1 to raw mouse events via direct
 *    DOM style mutation — no React re-renders, no setState, pure imperativism.
 *  • The "ring" (larger outer circle) uses a lerp loop running in rAF to produce a
 *    smooth trailing effect with no perceptible input lag.
 *  • Both use CSS `transform: translate3d` so the browser composites them on the
 *    GPU and never triggers layout/paint.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Current raw mouse position (updated synchronously on mousemove)
    let mx = -100, my = -100
    // Smooth ring position (lerped toward mx/my each frame)
    let rx = -100, ry = -100
    let rafId = 0
    let isVisible = false

    // Track whether we're hovering an interactive element
    let isHovering = false

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!isVisible) {
        rx = mx; ry = my            // teleport ring on first appear
        isVisible = true
        dot.style.opacity  = '1'
        ring.style.opacity = '1'
      }
      // Move dot instantly (no rAF overhead — direct style write)
      dot.style.transform = `translate3d(${mx}px,${my}px,-0) translate(-50%,-50%)`
    }

    const onLeave = () => {
      isVisible = false
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }

    const onEnter = () => {
      // handled by first mousemove
    }

    // Detect interactive elements for "hover" cursor state
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a,button,[role="button"],[tabindex],input,textarea,select,label')
      if (interactive && !isHovering) {
        isHovering = true
        dot.classList.add('cursor-hover')
        ring.classList.add('cursor-hover')
      } else if (!interactive && isHovering) {
        isHovering = false
        dot.classList.remove('cursor-hover')
        ring.classList.remove('cursor-hover')
      }
    }

    const onDown = () => {
      dot.classList.add('cursor-click')
      ring.classList.add('cursor-click')
    }
    const onUp = () => {
      dot.classList.remove('cursor-click')
      ring.classList.remove('cursor-click')
    }

    // rAF loop — only updates the ring (lerp trailing)
    const LERP = 0.13
    const loop = () => {
      rx += (mx - rx) * LERP
      ry += (my - ry) * LERP
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mouseleave', onLeave, { passive: true })
    window.addEventListener('mouseenter', onEnter, { passive: true })
    window.addEventListener('mouseover',  onOver,  { passive: true })
    window.addEventListener('mousedown',  onDown,  { passive: true })
    window.addEventListener('mouseup',    onUp,    { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="custom-cursor-ring"
      />
      {/* Inner dot — follows mouse 1:1 */}
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor-dot"
      />
    </>
  )
}
