import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import ScrollText  from '../components/ScrollText'
import DotGrid     from '../components/DotGrid'
import s from './WhyUs.module.css'

const reasons = [
  { n: '01', title: 'Sin permanencias largas',   body: 'Tres meses mínimo porque la estrategia necesita tiempo para funcionar. Nada más. Sin años de contrato ni cláusulas que te atrapan.' },
  { n: '02', title: 'Precio real desde el día 1', body: 'El presupuesto que te damos es el que pagas. Sin sorpresas, sin extras que no acordamos, sin factura rara a fin de mes.' },
  { n: '03', title: 'Un equipo, no un robot',    body: 'Tienes una persona de contacto. Alguien que conoce tu negocio, coge el teléfono y sabe qué está pasando sin que tengas que explicarlo cada vez.' },
  { n: '04', title: 'Resultados o lo arreglamos', body: 'Si algo no funciona, lo cambiamos. Sin reuniones de justificación. Sin PowerPoints de excusas. Con acciones concretas.' },
]

export default function WhyUs() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const redX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <section ref={ref} className={s.section}>
      <DotGrid opacity={1} color="rgba(17,17,17,0.7)" />

      {/* Top line movimiento */}
      <motion.div className={s.redStripe} style={{ x: redX }}>
        {'POR QUÉ NOSOTROS — NO ES LO MISMO — RESULTADOS REALES — '}
        {'POR QUÉ NOSOTROS — NO ES LO MISMO — RESULTADOS REALES — '}
      </motion.div>

      <div className={s.inner}>
        {/* Left: big statement */}
        <div className={s.left}>
          <ScrollReveal y={24}>
            <p className={s.eyebrow}>Por qué elegirnos</p>
          </ScrollReveal>
          <ScrollReveal y={32} delay={0.08}>
            <h2 className={s.title}>
              La diferencia<br />
              está en los<br />
              <em>detalles.</em>
            </h2>
          </ScrollReveal>
          <ScrollText
            text="Hay cientos de agencias. La mayoría hace lo mismo: pitch bonito, resultados mediocres y facturas que no cuadran. Nosotros somos diferentes porque nos importa que repitas. Y para eso, primero tienes que ver resultados."
            className={s.sub}
          />
          <ScrollReveal delay={0.26} y={16} style={{ marginTop: 40 }}>
            <Link to="/contacto" className={s.cta} data-cursor="hablemos">
              Hablar con el equipo <span className={s.ctaArrow}>→</span>
            </Link>
          </ScrollReveal>
        </div>

        {/* Right: reason cards */}
        <div className={s.right}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.n} className={s.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
            >
              <span className={s.cardN}>{r.n}</span>
              <div>
                <h3 className={s.cardTitle}>{r.title}</h3>
                <p className={s.cardBody}>{r.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom red bar */}
      <div className={s.bottomBar}>
        <span className={s.bottomStat}>+30 clientes</span>
        <span className={s.bottomSep}>·</span>
        <span className={s.bottomStat}>3 días media de producción</span>
        <span className={s.bottomSep}>·</span>
        <span className={s.bottomStat}>100% satisfacción</span>
      </div>
    </section>
  )
}
