import { motion } from 'framer-motion'
import Contact from '../sections/Contact'
import s from './Nosotros.module.css'

const values = [
  { num: '01', name: 'Claridad',    desc: 'Sin jerga de agencia. Te decimos lo que va a pasar, cuándo y cuánto cuesta. Sin letra pequeña.' },
  { num: '02', name: 'Velocidad',   desc: 'De brief a online en días, no en meses. El tiempo de nuestros clientes vale tanto como el nuestro.' },
  { num: '03', name: 'Criterio',    desc: 'No ejecutamos sin pensar. Cuestionamos, proponemos y empujamos aunque no sea lo más fácil de escuchar.' },
  { num: '04', name: 'Resultados',  desc: 'Bonito está bien. Que venda está mejor. Todo lo que hacemos tiene un objetivo medible detrás.' },
]

export default function Nosotros() {
  return (
    <div className={s.page}>

      {/* Hero */}
      <motion.div
        className={s.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className={s.label}>Nosotros</p>
        <h1 className={s.title}>
          Una agencia pequeña<br />
          <span className={s.titleRed}>con criterio propio.</span>
        </h1>
      </motion.div>

      {/* Manifiesto */}
      <section className={s.manifesto}>
        <div className={s.manifestoInner}>
          <p className={s.manifestoLabel}>Por qué existimos</p>
          <motion.p
            className={s.manifestoText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Porque hay demasiadas agencias que cobran mucho,
            prometen más y{' '}
            <span className={s.manifestoRed}>entregan poco.</span>{' '}
            Nosotros hacemos lo contrario.
          </motion.p>
        </div>
      </section>

      {/* Valores */}
      <section className={s.values}>
        <h2 className={s.valuesTitle}>Cómo pensamos.</h2>
        <div className={s.valuesGrid}>
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              className={s.valueCard}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={s.valueNum}>{v.num}</p>
              <h3 className={s.valueName}>{v.name}</h3>
              <p className={s.valueDesc}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  )
}
