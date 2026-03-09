import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplitText from '../components/SplitText'
import s from './Testimonials.module.css'

const testimonials = [
  { name: 'Carlos M.', role: 'Hotel Boutique · Madrid',      quote: 'Doblamos reservas directas en 3 meses. No creía que una web marcara tanta diferencia. Ahora sí lo creo.' },
  { name: 'Ana L.',    role: 'Restaurante · Valencia',        quote: 'El contenido que crean es exactamente lo que necesitábamos. Resultado inmediato, sin vueltas ni reuniones infinitas.' },
  { name: 'Pedro S.',  role: 'Clínica Dental · Barcelona',    quote: 'Profesionales, rápidos y sin humo. Exactamente lo que prometieron, cuando lo prometieron.' },
  { name: 'Laura G.',  role: 'E-commerce · Bilbao',           quote: 'En la primera llamada ya lo tenían claro. El ROI habla solo.' },
  { name: 'Sofía R.',  role: 'Estudio Fotografía · Madrid',   quote: 'Pasé de 800 seguidores a 12k en cuatro meses. Los clientes que llegan ya saben lo que ofrezco.' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  return (
    <section className={s.section} ref={ref}>
      <div className={s.sectionLabel}>
        <span>© Testimonios</span>
        <span>(WDX® — 05)</span>
      </div>

      <SplitText
        text="Lo que dicen los que saben."
        tag="h2"
        className={s.title}
        stagger={0.03}
        duration={0.7}
      />

      {/* Track horizontal animado con parallax de scroll */}
      <div className={s.trackWrap}>
        <motion.div className={s.track} style={{ x }}>
          {testimonials.map((t, i) => (
            <div key={i} className={s.card}>
              <p className={s.stars}>★★★★★</p>
              <p className={s.quote}>"{t.quote}"</p>
              <div className={s.author}>
                <div className={s.avatar}>{t.name[0]}</div>
                <div>
                  <p className={s.authorName}>{t.name}</p>
                  <p className={s.authorRole}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
