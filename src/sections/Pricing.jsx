import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import s from './Pricing.module.css'

const plans = [
  {
    id: '01',
    name: 'Starter',
    price: 'desde 400€',
    note: '/ mes',
    features: ['1 red social', '8 publicaciones/mes', 'Copywriting incluido', 'Informe mensual'],
  },
  {
    id: '02',
    name: 'Push',
    price: 'desde 650€',
    note: '/ mes',
    badge: 'Popular',
    features: ['2 redes sociales', '16 publicaciones/mes', 'Copy + diseño', '2 Reels/mes', 'Informe semanal'],
  },
  {
    id: '03',
    name: 'Full',
    price: 'A medida',
    note: 'hablamos',
    features: ['Todo lo del Push', 'Paid Media', 'Web o landing', 'Account manager', 'Estrategia completa'],
  },
]

export default function Pricing() {
  const [active, setActive] = useState('02')

  return (
    <section className={s.section}>
      <div className={s.sectionLabel}>
        <span>© Precios</span>
        <span>(WDX® — 04)</span>
      </div>

      <SplitText
        text="Claro, directo, sin sorpresas."
        tag="h2"
        className={s.title}
        stagger={0.03}
        duration={0.7}
      />

      <div className={s.grid}>
        {plans.map((plan, i) => (
          <ScrollReveal key={plan.id} delay={i * 0.1} y={30}>
            <motion.div
              className={`${s.card} ${active === plan.id ? s.cardActive : ''}`}
              onHoverStart={() => setActive(plan.id)}
              layout
            >
              {plan.badge && <span className={s.badge}>{plan.badge}</span>}

              <div className={s.cardTop}>
                <span className={s.cardNum}>{plan.id}</span>
                <h3 className={s.planName}>{plan.name}</h3>
              </div>

              <div className={s.priceRow}>
                <p className={s.price}>{plan.price}</p>
                <p className={s.priceNote}>{plan.note}</p>
              </div>

              <div className={s.divider} />

              <ul className={s.features}>
                {plan.features.map(f => (
                  <li key={f} className={s.feature}>
                    <span className={s.check}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contacto"
                className={`${s.cta} ${active === plan.id ? s.ctaActive : ''}`}
              >
                Empezar →
              </Link>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
