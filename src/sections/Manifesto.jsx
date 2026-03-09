import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import ScrollText   from '../components/ScrollText'
import DotGrid      from '../components/DotGrid'
import s from './Manifesto.module.css'

const lines = [
  { text: 'MARKETING  QUE  FUNCIONA  —  ', dir: 1,  variant: 'solid'   },
  { text: 'SIN  BULLSHIT  SIN  HUMO  —  ', dir: -1, variant: 'outline' },
  { text: 'RESULTADOS  REALES  SIEMPRE  —  ', dir: 1,  variant: 'solid'   },
]

const pillars = [
  { n: 'I',   title: 'Directo al grano',         body: 'Sin presentaciones de 40 diapositivas. Sin buzzwords. Solo lo que necesitas saber para tomar decisiones.' },
  { n: 'II',  title: 'Resultados o no cobra',     body: 'Somos los primeros a los que no les interesa que sigas pagando sin ver retorno. Raro en este sector, lo sabemos.' },
  { n: 'III', title: 'Sin contratos de miedo',    body: 'Permanencia mínima de 3 meses porque la estrategia necesita tiempo. Nada más. Sin cláusulas ocultas.' },
]

const BIG_TEXT = 'Hacemos marketing de verdad. Sin diapositivas infinitas, sin humo, sin letras pequeñas. Nos contratas, nos ponemos a trabajar, y tú ves los resultados. Así de simple. Así de diferente.'

function LineItem({ text, dir }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [`${dir * -4}%`, `${dir * 4}%`])
  const repeated = text.repeat(6)
  return (
    <motion.div ref={ref} className={`${s.textLine}`} style={{ x }}>
      <span className={s.lineText}>{repeated}{repeated}</span>
    </motion.div>
  )
}

export default function Manifesto() {
  return (
    <section className={s.section}>
      <DotGrid />

      {/* Sliding text layers */}
      {lines.map(({ text, dir, variant }, i) => (
        <div key={i} className={`${s.lineWrap} ${s[variant]}`}>
          <LineItem text={text} dir={dir} />
        </div>
      ))}

      {/* ScrollText — el efecto Redo Media */}
      <div className={s.scrollTextWrap}>
        <ScrollText
          text={BIG_TEXT}
          className={s.bigStatement}
        />
      </div>

      {/* Pillars */}
      <div className={s.pillars}>
        {pillars.map(({ n, title, body }, i) => (
          <ScrollReveal key={n} delay={i * 0.1} className={s.pillar}>
            <span className={s.pillarN}>{n}</span>
            <h3 className={s.pillarTitle}>{title}</h3>
            <p className={s.pillarBody}>{body}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
