import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

const VB_W = 960
const VB_H = 110
const ICON_CX = 938  // icono al final
const ICON_CY = 8

// Path termina EXACTAMENTE donde está el icono
const PATH_D = `M 6 96 C 40 94, 80 88, 120 80 C 160 72, 190 68, 230 58 S 290 42, 340 36 C 380 30, 420 28, 460 22 S 530 14, 590 10 C 640 6, 700 5, 780 5 L ${ICON_CX} ${ICON_CY}`

const CYCLE_MS     = 4000
const PAUSE_AT_END = 1000

export default function RisingLine({ className = '' }) {
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

  // Dibuja la línea una vez
  useEffect(() => {
    if (!isInView) return
    lineCtrl.start({
      pathLength: 1,
      transition: { duration: 3.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
    })
  }, [isInView])

  // Loop del dot via rAF + getPointAtLength
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

    const elapsed = (timestamp - startRef.current) % CYCLE_MS
    // easeInOutCubic para que el movimiento sea más orgánico
    const raw = elapsed / CYCLE_MS
    const t = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2

    const total = pathRef.current.getTotalLength()
    const pt    = pathRef.current.getPointAtLength(t * total)

    dotRef.current.setAttribute('cx',  pt.x)
    dotRef.current.setAttribute('cy',  pt.y)
    ringRef.current?.setAttribute('cx',  pt.x)
    ringRef.current?.setAttribute('cy',  pt.y)
    ring2Ref.current?.setAttribute('cx', pt.x)
    ring2Ref.current?.setAttribute('cy', pt.y)

    // Al llegar al 98%: pausa + enciende icono
    if (raw > 0.97 && !pauseRef.current) {
      pauseRef.current = true
      setIconLit(true)
      pauseTimerRef.current = setTimeout(() => {
        setIconLit(false)
        pauseRef.current  = false
        startRef.current  = null
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
      preserveAspectRatio="none"
      fill="none"
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        <filter id="rl-glow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rl-dot-glow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rl-icon-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="rl-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#e8180c" stopOpacity="0.04"/>
          <stop offset="35%"  stopColor="#e8180c" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#e8180c" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="rl-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#e8180c" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#e8180c" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Área rellena bajo la curva */}
      <motion.path
        d={`${PATH_D} L ${ICON_CX} ${VB_H + 10} L 6 ${VB_H + 10} Z`}
        fill="url(#rl-fill)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.8 }}
      />

      {/* Track guía */}
      <path d={PATH_D} stroke="rgba(232,24,12,0.07)" strokeWidth="1" strokeLinecap="round"/>

      {/* Línea animada */}
      <motion.path
        ref={pathRef}
        d={PATH_D}
        stroke="url(#rl-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#rl-glow)"
        initial={{ pathLength: 0 }}
        animate={lineCtrl}
      />

      {/* Halo exterior del dot */}
      <circle ref={ring2Ref} r="13" cx="6" cy="96" fill="none" stroke="#e8180c" strokeWidth="0.5" strokeOpacity="0.12"/>
      {/* Anillo del dot */}
      <circle ref={ringRef}  r="7"  cx="6" cy="96" fill="none" stroke="#e8180c" strokeWidth="1"   strokeOpacity="0.3"/>
      {/* Dot */}
      <circle ref={dotRef}   r="4.5" cx="6" cy="96" fill="#e8180c" filter="url(#rl-dot-glow)"/>

      {/* ── Icono final: ★ que se enciende ─────────── */}
      <motion.circle
        cx={ICON_CX} cy={ICON_CY} r="24"
        fill={iconLit ? 'rgba(232,24,12,0.12)' : 'rgba(232,24,12,0.03)'}
        stroke={iconLit ? 'rgba(232,24,12,0.55)' : 'rgba(232,24,12,0.12)'}
        strokeWidth="1.5"
        filter={iconLit ? 'url(#rl-icon-glow)' : undefined}
        animate={iconLit
          ? { scale: [1, 1.15, 1], transition: { duration: 0.5, ease: 'easeOut' } }
          : { scale: 1 }}
      />
      {/* Estrella */}
      <motion.text
        x={ICON_CX} y={ICON_CY + 6}
        textAnchor="middle"
        fontSize="18"
        fill="#e8180c"
        filter={iconLit ? 'url(#rl-icon-glow)' : undefined}
        animate={{
          opacity: iconLit ? 1 : 0.22,
          scale: iconLit ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformOrigin: `${ICON_CX}px ${ICON_CY}px` }}
      >★</motion.text>
      {/* "100%" debajo */}
      <motion.text
        x={ICON_CX} y={ICON_CY + 38}
        textAnchor="middle"
        fontSize="8"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="600"
        letterSpacing="0.08em"
        fill="#e8180c"
        animate={{ opacity: iconLit ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >100%</motion.text>
      {/* Pulso */}
      {iconLit && (
        <motion.circle
          cx={ICON_CX} cy={ICON_CY} r="24" fill="none"
          stroke="#e8180c" strokeWidth="1.5"
          initial={{ r: 24, opacity: 0.6 }}
          animate={{ r: 50, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}
    </svg>
  )
}
