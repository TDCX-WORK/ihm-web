import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollReveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  duration = 0.8,
  y = 32,
  once = true,
  style = {},
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '0px 0px -80px 0px' })
  const Tag = motion[as] || motion.div

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
