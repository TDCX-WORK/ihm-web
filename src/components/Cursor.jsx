import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import s from './Cursor.module.css'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring suave para el círculo grande (lag)
  const springX = useSpring(cursorX, { stiffness: 80, damping: 18, mass: 0.4 })
  const springY = useSpring(cursorY, { stiffness: 80, damping: 18, mass: 0.4 })

  const dotVisible = useRef(true)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <>
      {/* Punto pequeño — sigue el cursor exacto */}
      <motion.div
        className={s.dot}
        style={{ x: cursorX, y: cursorY }}
      />

      {/* Círculo grande — sigue con spring lag */}
      <motion.div
        className={s.ring}
        style={{ x: springX, y: springY }}
      />
    </>
  )
}
