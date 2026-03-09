import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * ScrollReveal — wrapper que anima cualquier hijo al entrar en viewport.
 *
 * Props:
 *   children    — contenido a animar
 *   className   — clase CSS opcional
 *   delay       — delay en segundos, default 0
 *   duration    — duración, default 0.7
 *   y           — desplazamiento vertical inicial, default 40
 *   once        — solo una vez, default true
 *   style       — estilos inline adicionales
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 40,
  once = true,
  style = {},
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
