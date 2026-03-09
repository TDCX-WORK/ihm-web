import { Link } from 'react-router-dom'
import SplitText    from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import LightOrb     from '../components/LightOrb'
import Services     from '../sections/Services'
import Contact      from '../sections/Contact'
import s from './Servicios.module.css'

const extra = [
  { title: 'Consultoría estratégica', desc: 'Análisis de tu situación actual y hoja de ruta para los próximos 6 meses. Una sola sesión que cambia cómo ves tu marketing.' },
  { title: 'Auditoría de redes',      desc: 'Revisamos tus cuentas, identificamos qué falla y qué funciona. Informe detallado con acciones concretas en 72h.' },
  { title: 'Formación in-house',      desc: 'Formamos a tu equipo para que lleven parte del trabajo. Transferimos el conocimiento para que no dependas de nadie.' },
]

export default function Servicios() {
  return (
    <>
      {/* Hero */}
      <section className={s.hero}>
        <LightOrb x="70%" y="50%" color="var(--red)" size={600} opacity={0.09} />

        <ScrollReveal className={s.label}>Servicios</ScrollReveal>
        <SplitText
          text="Todo lo que necesitas. Nada que no necesites."
          tag="h1"
          className={s.title}
          stagger={0.04}
        />
        <ScrollReveal delay={0.2}>
          <p className={s.sub}>Trabajamos contigo para elegir exactamente qué tiene sentido para tu negocio.</p>
        </ScrollReveal>
      </section>

      <Services />

      {/* Additional services */}
      <section className={s.extras}>
        <ScrollReveal className={s.extrasLabel}>También hacemos</ScrollReveal>
        <div className={s.extrasGrid}>
          {extra.map(({ title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1} className={s.extraCard}>
              <h3 className={s.extraTitle}>{title}</h3>
              <p className={s.extraDesc}>{desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Contact />
    </>
  )
}
