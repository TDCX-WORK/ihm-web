import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import s from './Footer.module.css'

const navLinks  = ['Inicio', 'Servicios', 'Nosotros', 'Contacto']
const services  = ['Social Media', 'Paid Media', 'Copywriting', 'Diseño', 'Web', 'Audiovisual', 'IA']
const socials   = ['Instagram', 'LinkedIn', 'Twitter']

export default function Footer() {
  return (
    <footer className={s.footer}>

      {/* Big rotating tagline */}
      <div className={s.bigLine}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          I Hate Marqueting<span className={s.red}>®</span>
        </motion.span>
      </div>

      <div className={s.grid}>
        <div>
          <p className={s.colLabel}>Empresa</p>
          <ul className={s.colList}>
            {navLinks.map(l => (
              <li key={l}>
                <Link to={l === 'Inicio' ? '/' : `/${l.toLowerCase()}`} className={s.colLink}>{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={s.colLabel}>Servicios</p>
          <ul className={s.colList}>
            {services.map(sv => (
              <li key={sv}>
                <Link to="/servicios" className={s.colLink}>{sv}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={s.colLabel}>Redes</p>
          <ul className={s.colList}>
            {socials.map(sc => (
              <li key={sc}>
                <a href="#" className={s.colLink}>{sc}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.contact}>
          <p className={s.colLabel}>Contacto</p>
          <a href="tel:+34642016237" className={s.contactBig}>642 01 62 37</a>
          <a href="mailto:hola@ihatemarqueting.es" className={s.contactBig}>hola@ihatemarqueting.es</a>
          <p className={s.location}>Madrid, España</p>
        </div>
      </div>

      <div className={s.bottom}>
        <p className={s.copy}>© {new Date().getFullYear()} I Hate Marqueting. Todos los derechos reservados.</p>
        <div className={s.legal}>
          <a href="#" className={s.legalLink}>Privacidad</a>
          <a href="#" className={s.legalLink}>Aviso legal</a>
          <a href="#" className={s.legalLink}>Cookies</a>
        </div>
      </div>

    </footer>
  )
}
