/**
 * RisingLineVertical — versión móvil
 * Corre de arriba abajo por el lado izquierdo del título
 * La curva tiene micro-fluctuaciones laterales (stock chart rotado)
 * El dot hace loop perpetuo y el icono se enciende al llegar abajo
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const VB_W = 44
const VB_H = 280
const ICON_CX = 22
const ICON_CY = 268

// Path vertical: baja de arriba a abajo con micro-ondulaciones laterales
// Las ondas van de izquierda → derecha simulando crecimiento
const PATH_D = `
  M 22 6
  C 18 30, 26 50, 20 70
  C 16 88, 28 106, 22 124
  C 18 140, 26 158, 20 176
  C 16 192, 28 210, 22 228
  C 18 244, 26 256, ${ICON_CX} ${ICON_CY}
`

const CYCLE_MS     = 3800
const PAUSE_AT_END = 900

export default function RisingLineVertical({ className = '' }) {
  const svgRef    = useRef(null)
  const pathRef   = useRef(null)
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const ring2Ref  = useRef(null)
  const rafRef    = useRef(null)
  const startRef  = useRef(null)
  const pauseRef  = useRef(false)
  const pauseTimerRef = useRef(null)

  const lineCtrl = useAnimation()
  const [iconLit, setIconLit] = useState(false)
  const isInView = useInView(svgRef, { once: true, margin: '0px 0px -60px 0px' })

  useEffect(() => {
    if (!isInView) return
    lineCtrl.start({
      pathLength: 1,
      transition: { duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
    })
  }, [isInView])

  const moveDot = useCallback((timestamp) => {
    if (!pathRef.current || !dotRef.current) {
      rafRef.current = requestAnimationFrame(moveDot)
      return
    }
    if (pauseRef.current) {
      rafRef.current = requestAnimationFrame(moveDot)
      return
    }
    if (!startRef.current) startRef.current = timestamp

    const raw = ((timestamp - startRef.current) % CYCLE_MS) / CYCLE_MS
    // easeInOutCubic
    const t = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2

    const total = pathRef.current.getTotalLength()
    const pt    = pathRef.current.getPointAtLength(t * total)

    dotRef.current.setAttribute('cx', pt.x)
    dotRef.current.setAttribute('cy', pt.y)
    ringRef.current?.setAttribute('cx', pt.x)
    ringRef.current?.setAttribute('cy', pt.y)
    ring2Ref.current?.setAttribute('cx', pt.x)
    ring2Ref.current?.setAttribute('cy', pt.y)

    if (raw > 0.97 && !pauseRef.current) {
      pauseRef.current = true
      setIconLit(true)
      pauseTimerRef.current = setTimeout(() => {
        setIconLit(false)
        pauseRef.current = false
        startRef.current = null
      }, PAUSE_AT_END)
    }

    rafRef.current = requestAnimationFrame(moveDot)
  }, [])

  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => {
      rafRef.current = requestAnimationFrame(moveDot)
    }, 500)
    return () => {
      clearTimeout(t)
      clearTimeout(pauseTimerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, moveDot])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <filter id="rlv-glow">
          <feGaussianBlur stdDeviation="1.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rlv-dot-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rlv-icon-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Gradiente vertical: tenue arriba, sólido abajo */}
        <linearGradient id="rlv-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#e8180c" stopOpacity="0.04"/>
          <stop offset="40%"  stopColor="#e8180c" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#e8180c" stopOpacity="0.9"/>
        </linearGradient>
      </defs>

      {/* Track guía */}
      <path d={PATH_D} stroke="rgba(232,24,12,0.07)" strokeWidth="1" strokeLinecap="round"/>

      {/* Línea animada */}
      <motion.path
        ref={pathRef}
        d={PATH_D}
        stroke="url(#rlv-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#rlv-glow)"
        initial={{ pathLength: 0 }}
        animate={lineCtrl}
      />

      {/* Halo exterior */}
      <circle ref={ring2Ref} r="12" cx="22" cy="6" fill="none" stroke="#e8180c" strokeWidth="0.5" strokeOpacity="0.12"/>
      {/* Anillo */}
      <circle ref={ringRef}  r="6.5" cx="22" cy="6" fill="none" stroke="#e8180c" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Dot */}
      <circle ref={dotRef}   r="4" cx="22" cy="6" fill="#e8180c" filter="url(#rlv-dot-glow)"/>

      {/* ── Icono final: ★ ─────────── */}
      <motion.circle
        cx={ICON_CX} cy={ICON_CY} r="18"
        fill={iconLit ? 'rgba(232,24,12,0.12)' : 'rgba(232,24,12,0.03)'}
        stroke={iconLit ? 'rgba(232,24,12,0.55)' : 'rgba(232,24,12,0.12)'}
        strokeWidth="1.5"
        filter={iconLit ? 'url(#rlv-icon-glow)' : undefined}
        animate={iconLit
          ? { scale: [1, 1.15, 1], transition: { duration: 0.5 } }
          : { scale: 1 }}
      />
      <motion.text
        x={ICON_CX} y={ICON_CY + 5}
        textAnchor="middle"
        fontSize="14"
        fill="#e8180c"
        filter={iconLit ? 'url(#rlv-icon-glow)' : undefined}
        animate={{ opacity: iconLit ? 1 : 0.22, scale: iconLit ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: `${ICON_CX}px ${ICON_CY}px` }}
      >★</motion.text>
      <motion.text
        x={ICON_CX} y={ICON_CY + 30}
        textAnchor="middle"
        fontSize="7"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
        fill="#e8180c"
        animate={{ opacity: iconLit ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >100%</motion.text>
      {iconLit && (
        <motion.circle
          cx={ICON_CX} cy={ICON_CY} r="18" fill="none"
          stroke="#e8180c" strokeWidth="1.5"
          initial={{ r: 18, opacity: 0.6 }}
          animate={{ r: 36, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        />
      )}
    </svg>
  )
}
