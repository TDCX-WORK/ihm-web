import { motion } from 'framer-motion'
import Contact from '../sections/Contact'
import s from './Contacto.module.css'

export default function Contacto() {
  return (
    <div className={s.page}>
      <motion.div
        className={s.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className={s.label}>Contacto</p>
        <h1 className={s.title}>
          Hablamos<br />
          <span className={s.titleRed}>sin compromiso.</span>
        </h1>
      </motion.div>

      <Contact />
    </div>
  )
}
