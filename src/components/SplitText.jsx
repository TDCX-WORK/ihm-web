import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SplitText — revela texto palabra a palabra desde abajo enmascarado.
 * 
 * Props:
 *   text        — string a animar
 *   tag         — elemento HTML ('h1','h2','p'...) default 'p'
 *   className   — clase CSS opcional
 *   delay       — delay inicial en segundos, default 0
 *   duration    — duración de cada palabra, default 0.6
 *   stagger     — delay entre palabras, default 0.04
 *   once        — solo animar una vez, default true
 */
export default function SplitText({
  text,
  tag = 'p',
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  once = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' })

  const words = text.split(' ')

  const Tag = tag

  return (
    <Tag ref={ref} className={className} style={{ overflow: 'visible' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
