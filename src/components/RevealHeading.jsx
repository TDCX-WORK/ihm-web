/**
 * RevealHeading — título con clip-path reveal estilo Redo Media.
 * El texto sale de detrás de un "cortinón" invisible de abajo a arriba.
 */
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RevealHeading({ text, tag = 'h2', className = '', delay = 0, style = {} }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const Tag    = tag

  // Split into words for stagger
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} style={{ overflow: 'visible', ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: '0.22em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >{word}</motion.span>
        </span>
      ))}
    </Tag>
  )
}
