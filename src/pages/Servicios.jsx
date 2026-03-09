import { motion } from 'framer-motion'
import Services  from '../sections/Services'
import Process   from '../sections/Process'
import Pricing   from '../sections/Pricing'
import Contact   from '../sections/Contact'
import s from './Servicios.module.css'

export default function Servicios() {
  return (
    <div className={s.page}>
      <motion.div
        className={s.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className={s.label}>Servicios</p>
        <h1 className={s.title}>
          Lo que hacemos<br />
          <span className={s.titleRed}>de verdad.</span>
        </h1>
        <p className={s.subtitle}>
          Sin paquetes inflados. Sin reuniones de dos horas.
          Elegimos lo que necesitas y lo ejecutamos.
        </p>
      </motion.div>

      <Services />
      <Process />
      <Pricing />
      <Contact />
    </div>
  )
}
