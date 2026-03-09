import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import s from './Navbar.module.css'

const links = [
  { to: '/',          label: 'Inicio',    end: true  },
  { to: '/servicios', label: 'Servicios', end: false },
  { to: '/nosotros',  label: 'Nosotros',  end: false },
  { to: '/contacto',  label: 'Contacto',  end: false },
]

export default function Navbar() {
  const [pill, setPill]         = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setPill(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className={s.outer}>
        {/* CSS transition — mucho más suave que Framer Motion para backdrop-filter */}
        <nav className={`${s.nav} ${pill ? s.navPill : s.navBar}`}>
          <div className={`${s.glint} ${pill ? s.glintVisible : ''}`} />

          <Link to="/" className={s.logo} data-cursor="">
            IHM<span className={s.red}>®</span>
          </Link>

          <ul className={s.links}>
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to} end={end} data-cursor=""
                  className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/contacto" className={`${s.cta} ${pill ? s.ctaRed : ''}`} data-cursor="hablamos">
            {pill ? 'Contactar' : '642 01 62 37'}
          </Link>
        </nav>
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className={s.mobileBar}>
        <Link to="/" className={s.logo}>IHM<span className={s.red}>®</span></Link>
        <button
          className={`${s.burger} ${menuOpen ? s.burgerOpen : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </div>

      <motion.div
        className={s.drawer}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        initial={false}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <ul className={s.drawerList}>
          {links.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to} end={end}
                className={({ isActive }) => `${s.drawerLink} ${isActive ? s.drawerActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >{label}</NavLink>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/34642016237?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20vuestros%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className={s.drawerCta}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escríbenos por WhatsApp
            </a>
          </li>
        </ul>
      </motion.div>
    </>
  )
}
