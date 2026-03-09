/**
 * ScrollText — efecto word-by-word reveal al scrollear.
 * Clonado del efecto de Redo Media:
 *   cada palabra empieza en gris y se ilumina a blanco
 *   conforme entra en el viewport, de izquierda a derecha.
 */
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function Word({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.13, 1])
  const smoothOpacity = useSpring(opacity, { damping: 40, stiffness: 200 })

  return (
    <motion.span
      style={{
        opacity: smoothOpacity,
        display: 'inline-block',
        marginRight: '0.22em',
        color: 'inherit',
        willChange: 'opacity',
      }}
    >
      {word}
    </motion.span>
  )
}

export default function ScrollText({ text, className = '', style = {} }) {
  const ref    = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.2'],
  })

  const words = text.split(' ')
  const total = words.length

  return (
    <p ref={ref} className={className} style={{ ...style, lineHeight: 1.35 }}>
      {words.map((word, i) => {
        const start = i / total
        const end   = (i + 1) / total
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
          />
        )
      })}
    </p>
  )
}
