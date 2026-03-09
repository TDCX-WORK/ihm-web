import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import s from './Cursor.module.css'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const activate = () => setMounted(true)
    window.addEventListener('mousemove', activate, { once: true })
    return () => window.removeEventListener('mousemove', activate)
  }, [])
  // NOTE: early return removed — hooks must be called unconditionally

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Outer ring lags more for "stretch" effect
  const cfg     = { damping: 22, stiffness: 300, mass: 0.5 }
  const cfgLazy = { damping: 26, stiffness: 160, mass: 0.6 }

  const x  = useSpring(mx, cfg)
  const y  = useSpring(my, cfg)
  const rx = useSpring(mx, cfgLazy)
  const ry = useSpring(my, cfgLazy)

  const [label,     setLabel]     = useState('')
  const [active,    setActive]    = useState(false)
  const [isMoving,  setIsMoving]  = useState(false)

  useEffect(() => {
    let timeout

    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setIsMoving(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsMoving(false), 80)
    }

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (el) {
        setActive(true)
        setLabel(el.dataset.cursor || '')
      } else {
        setActive(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className={s.dot}
        style={{ x, y }}
        animate={{ scale: active ? 0 : 1, opacity: active ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — positioned from lazy coords so it stretches behind */}
      <motion.div
        className={s.ring}
        style={{ x: rx, y: ry }}
        animate={{
          width:           active ? 64 : 34,
          height:          active ? 64 : 34,
          borderColor:     active ? 'rgba(232,24,12,0.7)' : 'rgba(240,236,228,0.22)',
          backgroundColor: active ? 'rgba(232,24,12,0.06)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />

      {/* Label */}
      <AnimatePresence>
        {label && (
          <motion.span
            className={s.label}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.16 }}
          >{label}</motion.span>
        )}
      </AnimatePresence>
    </>
  )
}
