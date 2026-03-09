import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import LightOrb from '../components/LightOrb'
import RisingLine from '../components/RisingLine'
import RisingLineVertical from '../components/RisingLineVertical'
import s from './Testimonials.module.css'

const reviews = [
  { name: 'Carlos M.', role: 'Hotel Boutique · Madrid',    text: 'Doblamos reservas directas en 3 meses. No creía que la web y las redes marcaran tanta diferencia hasta que lo vi con mis propios ojos.' },
  { name: 'Ana L.',    role: 'Restaurante · Valencia',      text: 'El contenido que crean es exactamente lo que necesitábamos. Resultado inmediato, sin vueltas ni reuniones infinitas.' },
  { name: 'Pedro S.',  role: 'Clínica Dental · Barcelona',  text: 'Profesionales, rápidos y sin humo. Exactamente lo que prometieron, cuando lo prometieron.' },
  { name: 'Laura G.',  role: 'E-commerce · Bilbao',         text: 'En la primera llamada ya lo tenían claro. El ROI habla solo. Llevamos 8 meses y no he pensado en cambiarlos.' },
  { name: 'Sofía R.',  role: 'Estudio Fotografía · Sevilla',text: 'De 800 a 12k seguidores en cuatro meses. Los clientes que llegan ya saben perfectamente lo que ofrezco.' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])

  return (
    <section ref={ref} id="testimonials" className={s.section}>
      <LightOrb x="85%" y="50%" color="var(--gold)" size={500} opacity={0.05} />

      <div className={s.head}>
        <ScrollReveal className={s.label}>
          <span>© Lo que dicen</span>
          <span>★★★★★ Google</span>
        </ScrollReveal>

        <div className={s.titleRow}>
          <SplitText
            text="Resultados reales, clientes reales."
            tag="h2"
            className={s.title}
            stagger={0.04}
          />
          {/* Desktop: horizontal */}
          <RisingLine className={s.graph} />
        </div>
        {/* Mobile: vertical — debajo del título */}
        <div className={s.graphMobileWrap}>
          <RisingLineVertical className={s.graphMobile} />
        </div>
      </div>

      {/* Horizontal parallax track */}
      <motion.div className={s.track} style={{ x }}>
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className={s.card}
            data-cursor="leer"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            {/* Top shimmer line */}
            <div className={s.cardShimmer} />

            <div className={s.stars}>
              {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
            </div>

            <p className={s.quote}>"{r.text}"</p>

            <div className={s.author}>
              <div className={s.avatar}>{r.name[0]}</div>
              <div>
                <p className={s.authorName}>{r.name}</p>
                <p className={s.authorRole}>{r.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
