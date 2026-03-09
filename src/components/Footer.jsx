import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import s from './Footer.module.css'

const cols = [
  {
    label: 'Empresa',
    items: [
      { l: 'Inicio',    to: '/' },
      { l: 'Servicios', to: '/servicios' },
      { l: 'Nosotros',  to: '/nosotros' },
      { l: 'Contacto',  to: '/contacto' },
    ],
  },
  {
    label: 'Servicios',
    items: ['Social Media', 'Paid Media', 'Copywriting', 'Diseño', 'Web', 'Audiovisual', 'IA']
      .map(l => ({ l, to: '/servicios' })),
  },
  {
    label: 'Redes',
    items: [
      { l: 'Instagram', to: '#' },
      { l: 'LinkedIn',  to: '#' },
      { l: 'Twitter',   to: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={s.footer}>
      {/* Big name */}
      <div className={s.bigLineWrap}>
        <motion.div
          className={s.bigLine}
          initial={{ y: '105%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          I Hate Marqueting<span className={s.red}>®</span>
        </motion.div>
      </div>

      {/* Grid */}
      <div className={s.grid}>
        {cols.map(({ label, items }) => (
          <div key={label}>
            <p className={s.colLabel}>{label}</p>
            <ul className={s.colList}>
              {items.map(({ l, to }) => (
                <li key={l}>
                  <Link to={to} className={s.colLink} data-cursor="">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={s.contact}>
          <p className={s.colLabel}>Contacto</p>
          <a href="tel:+34642016237"            className={s.contactBig} data-cursor="llamar">642 01 62 37</a>
          <a href="mailto:hola@ihatemarqueting.es" className={s.contactMed} data-cursor="email">hola@ihatemarqueting.es</a>
          <p className={s.location}>Madrid, España</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={s.bottom}>
        <p className={s.copy}>© {new Date().getFullYear()} I Hate Marqueting. Todos los derechos reservados.</p>
        <div className={s.legal}>
          {['Privacidad', 'Aviso legal', 'Cookies'].map(l => (
            <a key={l} href="#" className={s.legalLink}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
