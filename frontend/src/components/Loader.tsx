import { useEffect, useState } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const hide = () => {
      setTimeout(() => setHidden(true), 1400)
    }
    if (document.readyState === 'complete') {
      hide()
    } else {
      window.addEventListener('load', hide)
      return () => window.removeEventListener('load', hide)
    }
  }, [])

  return (
    <div id="loader" className={hidden ? 'loader-hidden' : ''} aria-hidden="true">
      <div style={{ position: 'relative', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader-ring" />
        <span className="loader-monogram">PV</span>
      </div>
      <p className="loader-name">Prithviraj Verma</p>
    </div>
  )
}
