// NeuralNetworkViz is intentionally not rendered in the current design.
// Component preserved here for potential future use.

import { useEffect, useRef } from 'react'

export default function NeuralNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    // Visualization disabled — kept as placeholder
  }, [])
  return <canvas ref={canvasRef} style={{ display: 'none' }} aria-hidden="true" />
}
