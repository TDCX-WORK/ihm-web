import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import s from './Cursor.module.css'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // No instalar cursor personalizado en dispositivos táctiles (móvil/tablet)
    if (window.matchMedia('(pointer: coarse)').matches) return
    const activate = () => setMounted(true)
    window.addEventListener('mousemove', activate, { once: true })
    return () => window.removeEventListener('mousemove', activate)
  }, [])

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Outer ring lags more for "stretch" effect
  const cfg     = { damping: 22, stiffness: 300, mass: 0.5 }
  const cfgLazy = { damping: 26, stiffness: 160, mass: 0.6 }

  const sx = useSpring(mx, cfg)
  const sy = useSpring(my, cfg)
  const lx = useSpring(mx, cfgLazy)
  const ly = useSpring(my, cfgLazy)

  const [hovered, setHovered]   = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [text, setText]         = useState('')

  useEffect(() => {
    const onMove = e => { mx.set(e.clientX); my.set(e.clientY) }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    const onEnter = e => {
      const el = e.target.closest('[data-cursor]')
      if (el) {
        setHovered(true)
        setText(el.dataset.cursor || '')
      }
    }
    const onLeave = e => {
      if (!e.target.closest('[data-cursor]')) {
        setHovered(false)
        setText('')
      }
    }
    const onLeaveWin = () => setHidden(true)
    const onEnterWin = () => setHidden(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    document.documentElement.addEventListener('mouseleave', onLeaveWin)
    document.documentElement.addEventListener('mouseenter', onEnterWin)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      document.documentElement.removeEventListener('mouseleave', onLeaveWin)
      document.documentElement.removeEventListener('mouseenter', onEnterWin)
    }
  }, [mx, my])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          {/* Dot — follows instantly */}
          <motion.div
            className={s.dot}
            style={{ x: sx, y: sy }}
            animate={{ scale: clicking ? 0.5 : hovered ? 0 : 1, opacity: hidden ? 0 : 1 }}
            transition={{ scale: { duration: 0.12 } }}
          />

          {/* Ring — lags behind */}
          <motion.div
            className={`${s.ring} ${hovered ? s.ringHovered : ''} ${clicking ? s.ringClicking : ''}`}
            style={{ x: lx, y: ly }}
            animate={{ scale: clicking ? 0.8 : hovered ? 1.6 : 1, opacity: hidden ? 0 : 1 }}
            transition={{ scale: { duration: 0.2 } }}
          >
            {text && <span className={s.ringText}>{text}</span>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
