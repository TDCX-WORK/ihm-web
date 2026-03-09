import ScrollReveal from '../components/ScrollReveal'
import SplitText from '../components/SplitText'
import { motion } from 'framer-motion'
import s from './Process.module.css'

const steps = [
  { num: '01', name: 'Brief',        time: '30 min', desc: 'Una llamada. Sin formularios. Solo lo que necesitamos saber.' },
  { num: '02', name: 'Estrategia',   time: '48h',    desc: 'El plan, el precio, el calendario. Sin letra pequeña.' },
  { num: '03', name: 'Producción',   time: 'Variable',desc: 'Ejecutamos rápido y con criterio. Sin perseguirnos.' },
  { num: '04', name: 'Lanzamiento',  time: '3 días',  desc: 'Publicamos, activamos y medimos desde el día uno.' },
  { num: '05', name: 'Optimización', time: 'Continuo',desc: 'Lo que funciona, lo escalamos. Lo que no, lo cambiamos.' },
]

export default function Process() {
  return (
    <section className={s.section}>
      <div className={s.sectionLabel}>
        <span>© Cómo trabajamos</span>
        <span>(WDX® — 03)</span>
      </div>

      <div className={s.header}>
        <SplitText
          text="Sin vueltas. Al grano."
          tag="h2"
          className={s.title}
          stagger={0.04}
          duration={0.7}
        />
      </div>

      <div className={s.steps}>
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.06} y={16}>
            <motion.div
              className={s.step}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              <span className={s.num}>{step.num}</span>
              <h3 className={s.name}>{step.name}</h3>
              <p className={s.desc}>{step.desc}</p>
              <span className={s.time}>{step.time}</span>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
