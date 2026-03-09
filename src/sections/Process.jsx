import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplitText    from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import LightOrb from '../components/LightOrb'
import DotGrid  from '../components/DotGrid'
import s from './Process.module.css'

const steps = [
  { n: '01', name: 'Brief',        time: '30 min',   color: 'var(--red)',  desc: 'Una llamada, sin formularios. Solo lo que necesitamos saber para entender tu negocio y lo que quieres conseguir de verdad.' },
  { n: '02', name: 'Estrategia',   time: '48h',      color: 'var(--gold)', desc: 'El plan completo: qué vamos a hacer, cuándo, cuánto cuesta y qué resultados podemos esperar. Con todos los números encima de la mesa.' },
  { n: '03', name: 'Producción',   time: 'Variable', color: 'var(--cream)',desc: 'Ejecutamos con criterio y velocidad. Te pedimos lo que necesitamos, cuando lo necesitamos. Sin perseguirnos mutuamente.' },
  { n: '04', name: 'Lanzamiento',  time: 'Día 1',    color: 'var(--red)',  desc: 'Publicamos, activamos campañas y medimos desde el primer día. El seguimiento empieza antes de que veas resultados.' },
  { n: '05', name: 'Optimización', time: 'Continuo', color: 'var(--gold)', desc: 'Lo que funciona lo escalamos. Lo que no funciona lo cambiamos sin drama. Iteración constante, sin excusas.' },
]

function DetailCard({ step }) {
  return (
    <motion.div
      className={s.card}
      key={step.n}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={s.cardAccent} style={{
        background: `linear-gradient(90deg, ${step.color}, transparent)`,
        boxShadow: `0 0 20px ${step.color}`,
      }} />
      <div className={s.cardBigN}>{step.n}</div>
      <h3 className={s.cardName}>{step.name}</h3>
      <p className={s.cardDesc}>{step.desc}</p>
      <div className={s.cardBottom}>
        <span className={s.cardLine} style={{ background: step.color }} />
        <span className={s.cardTime} style={{ color: step.color }}>{step.time}</span>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const [active, setActive] = useState(0)
  const inlineRefs = useRef([])

  // Mobile: scroll to inline detail when step is activated
  const handleStep = (i) => {
    const prev = active
    setActive(i)
    // Only scroll on mobile (inline detail visible)
    if (window.innerWidth <= 1024 && inlineRefs.current[i]) {
      setTimeout(() => {
        inlineRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 80)
    }
  }

  return (
    <section id="process" className={s.section}>
      <DotGrid />
      <LightOrb x="8%" y="78%" color="var(--red)" size={500} opacity={0.07} />

      <ScrollReveal className={s.label}>
        <span>© Cómo trabajamos</span>
        <span>(05 pasos)</span>
      </ScrollReveal>

      <SplitText text="Sin vueltas. Al grano." tag="h2" className={s.title} stagger={0.05} />

      <div className={s.grid}>
        {/* Steps list */}
        <div className={s.stepsList}>
          {steps.map((step, i) => (
            <div key={step.n}>
              <motion.div
                className={`${s.step} ${active === i ? s.stepActive : ''}`}
                onClick={() => handleStep(i)}
                data-cursor="ver"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <span className={s.stepN}>{step.n}</span>
                <motion.h3
                  className={s.stepName}
                  animate={{ x: active === i ? 6 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {step.name}
                </motion.h3>
                <span className={s.stepTime} style={{ color: active === i ? step.color : undefined }}>
                  {step.time}
                </span>
                {/* Mobile chevron */}
                <motion.span
                  className={s.chevron}
                  animate={{ rotate: active === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >›</motion.span>
              </motion.div>

              {/* Inline detail — only visible on mobile/tablet */}
              <div ref={el => inlineRefs.current[i] = el} className={s.inlineDetail}>
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <DetailCard step={step} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky detail — desktop only */}
        <div className={s.detail}>
          <AnimatePresence mode="wait">
            <DetailCard key={active} step={steps[active]} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
