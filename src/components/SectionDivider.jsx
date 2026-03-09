/**
 * SectionDivider — línea de neón horizontal entre secciones
 * Se activa cuando entra en viewport, un dot recorre la línea una vez
 */
import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function SectionDivider({ color = 'var(--red)', dim = false }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20px 0px' })
  const lineCtrl = useAnimation()
  const dotCtrl  = useAnimation()

  useEffect(() => {
    if (!isInView) return
    // Línea se expande desde el centro
    lineCtrl.start({
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    })
    // Dot viaja de izquierda a derecha
    dotCtrl.start({
      left: '100%',
      opacity: [0, 1, 1, 0],
      transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }
    })
  }, [isInView])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: '1px',
        margin: '0 8px',
        overflow: 'visible',
      }}
    >
      {/* Línea */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: dim
            ? `linear-gradient(90deg, transparent, rgba(232,24,12,0.08) 20%, rgba(232,24,12,0.12) 50%, rgba(232,24,12,0.08) 80%, transparent)`
            : `linear-gradient(90deg, transparent, rgba(232,24,12,0.15) 15%, rgba(232,24,12,0.25) 50%, rgba(232,24,12,0.15) 85%, transparent)`,
          scaleX: 0,
          transformOrigin: 'center',
        }}
        animate={lineCtrl}
      />
      {/* Dot viajero */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#e8180c',
          boxShadow: '0 0 8px 2px rgba(232,24,12,0.6)',
          opacity: 0,
        }}
        animate={dotCtrl}
      />
    </div>
  )
}
