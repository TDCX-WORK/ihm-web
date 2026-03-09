import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SplitText({
  text,
  tag = 'p',
  className = '',
  delay = 0,
  duration = 0.85,
  stagger = 0.055,
  once = true,
  style = {},
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' })
  const Tag = tag
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
            marginRight: '0.24em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0, rotateX: 20 }}
            animate={inView ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
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
