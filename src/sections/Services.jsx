import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplitText   from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import s from './Services.module.css'

const services = [
  { id: '01', name: 'Social Media',  desc: 'Estrategia, contenido y gestión de redes que convierte seguidores en clientes reales.' },
  { id: '02', name: 'Paid Media',    desc: 'Campañas en Meta y Google optimizadas para que cada euro trabaje. Sin desperdicio.' },
  { id: '03', name: 'Copywriting',   desc: 'Textos que venden sin que parezca que venden. La diferencia siempre está en las palabras.' },
  { id: '04', name: 'Diseño',        desc: 'Identidad visual, portadas, flyers y piezas que paran el scroll.' },
  { id: '05', name: 'Web',           desc: 'Webs rápidas, bonitas y que convierten. Sin código raro ni precios de agencia grande.' },
  { id: '06', name: 'Audiovisual',   desc: 'Reels, vídeos y contenido que funciona en el feed y en la mente.' },
  { id: '07', name: 'IA',            desc: 'Automatizaciones, herramientas y flujos con IA aplicada a tu negocio de verdad.' },
]

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section className={s.section}>
      <div className={s.sectionLabel}>
        <span>© Lo que hacemos</span>
        <span>(WDX® — 02)</span>
      </div>

      <div className={s.header}>
        <SplitText
          text="Servicios que funcionan."
          tag="h2"
          className={s.title}
          stagger={0.03}
          duration={0.7}
        />
        <ScrollReveal delay={0.2} y={20}>
          <p className={s.count}>(0{services.length})</p>
        </ScrollReveal>
      </div>

      <div className={s.list}>
        {services.map((sv, i) => (
          <ScrollReveal key={sv.id} delay={i * 0.05} y={20}>
            <div
              className={`${s.item} ${active === sv.id ? s.itemActive : ''}`}
              onMouseEnter={() => setActive(sv.id)}
              onMouseLeave={() => setActive(null)}
            >
              <span className={s.num}>{sv.id}</span>
              <h3 className={s.name}>{sv.name}</h3>
              <AnimatePresence>
                {active === sv.id && (
                  <motion.p
                    className={s.desc}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {sv.desc}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.span
                className={s.arrow}
                animate={{ x: active === sv.id ? 6 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
