import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import SplitText   from '../components/SplitText'
import DotGrid     from '../components/DotGrid'
import ScrollReveal from '../components/ScrollReveal'
import LightOrb    from '../components/LightOrb'
import s from './Services.module.css'

const services = [
  { n: '01', name: 'Social Media',  tag: 'Orgánico',    desc: 'Estrategia, contenido y gestión que convierte seguidores en clientes. Cada post tiene un propósito.' },
  { n: '02', name: 'Paid Media',    tag: 'Performance', desc: 'Campañas en Meta y Google con ROI medible desde el día uno. Sin gasto en vano.' },
  { n: '03', name: 'Copywriting',   tag: 'Conversión',  desc: 'Textos que venden sin que lo parezca. La diferencia siempre está en las palabras correctas.' },
  { n: '04', name: 'Diseño',        tag: 'Visual',      desc: 'Identidad, portadas y piezas que paran el scroll y graban la marca en la memoria.' },
  { n: '05', name: 'Web',           tag: 'Tecnología',  desc: 'Webs rápidas, bonitas y que convierten. Sin código raro ni facturas de agencia grande.' },
  { n: '06', name: 'Audiovisual',   tag: 'Vídeo',       desc: 'Reels, vídeos y contenido que funciona en el feed y en la mente del cliente.' },
  { n: '07', name: 'IA',            tag: 'Futuro',      desc: 'Automatizaciones y flujos con IA aplicada de verdad a tu negocio. No al hype vacío.' },
]

export default function Services() {
  const [active, setActive] = useState(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.05, 0.5], [0, 1])
  const lineX     = useTransform(scrollYProgress, [0.05, 0.5], ['0%', '100%'])

  return (
    <section ref={ref} id="services" className={s.section}>
      <DotGrid maskShape="90% 90%" />
      <LightOrb x="88%" y="18%" color="var(--gold)" size={400} opacity={0.05} />

      <ScrollReveal className={s.label}>
        <span>© Lo que hacemos</span>
        <span>(07 servicios)</span>
      </ScrollReveal>

      <SplitText
        text="Servicios que funcionan."
        tag="h2"
        className={s.title}
        stagger={0.04}
      />

      {/* Glow line that draws itself on scroll */}
      <div className={s.glowTrack}>
        <motion.div
          className={s.glowLine}
          style={{ scaleX: lineScale, transformOrigin: 'left center' }}
        />
        <motion.div
          className={s.glowDot}
          style={{ left: lineX }}
        />
      </div>

      <div className={s.list}>
        {services.map((sv, i) => (
          <motion.div
            key={sv.n}
            className={`${s.item} ${active === sv.n ? s.itemActive : ''}`}
            onHoverStart={() => setActive(sv.n)}
            onHoverEnd={() => setActive(null)}
            onClick={() => setActive(active === sv.n ? null : sv.n)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 0.6, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hover bg bleed */}
            <motion.div
              className={s.hoverBg}
              animate={{ opacity: active === sv.n ? 1 : 0 }}
            />

            <span className={s.num}>{sv.n}</span>

            <div className={s.nameWrap}>
              <motion.h3
                className={s.name}
                animate={{ x: active === sv.n ? 8 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {sv.name}
              </motion.h3>
              <AnimatePresence>
                {active === sv.n && (
                  <motion.p
                    className={s.desc}
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{ duration: 0.24 }}
                  >
                    {sv.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <span className={`${s.tag} ${active === sv.n ? s.tagActive : ''}`}>
              {sv.tag}
            </span>

            <motion.span
              className={s.arrow}
              animate={{ x: active === sv.n ? 6 : 0, opacity: active === sv.n ? 1 : 0.2 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
