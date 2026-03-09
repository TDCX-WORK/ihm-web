import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import s from './Navbar.module.css'

const links = [
  { to: '/',          label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros',  label: 'Nosotros' },
  { to: '/contacto',  label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        className={`${s.nav} ${scrolled ? s.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className={s.logo}>IHM<span className={s.dot}>®</span></Link>

        <ul className={s.links}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a href="tel:+34642016237" className={s.cta}>
          642 01 62 37
        </a>
      </motion.nav>
    </>
  )
}
