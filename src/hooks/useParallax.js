import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

/**
 * useParallax — devuelve un ref y un motionValue `y` para parallax.
 *
 * Uso:
 *   const { ref, y } = useParallax({ speed: 0.3 })
 *   <motion.div ref={ref} style={{ y }}>...</motion.div>
 *
 * speed positivo = elemento sube más lento que el scroll (efecto profundidad)
 * speed negativo = elemento baja (efecto inverso)
 */
export default function useParallax({ speed = 0.2, offset = ['start end', 'end start'] } = {}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`])

  return { ref, y }
}
