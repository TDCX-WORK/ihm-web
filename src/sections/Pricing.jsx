/**
 * Pricing — scroll-driven card reveal
 * Fase 1 (0→0.35): 3 tarjetas se SEPARAN desde el centro
 * Fase 2 (0.45→0.95): flip rotateY 0→180, escalonado
 * Al final: todas RECTAS (rotateZ: 0)
 * Mobile: reveal simple staggered
 */
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import SplitText  from '../components/SplitText'
import DotGrid    from '../components/DotGrid'
import s from './Pricing.module.css'

const plans = [
  {
    id: '01',
    name: 'Starter',
    price: '400€',
    note: '/mes',
    frontBg: 'linear-gradient(145deg, #232120 0%, #333030 100%)',
    frontLabel: 'Para empezar',
    accent: 'rgba(240,236,228,0.55)',
  },
  {
    id: '02',
    name: 'Push',
    price: '650€',
    note: '/mes',
    frontBg: 'linear-gradient(145deg, #c8100a 0%, #8c0b06 100%)',
    frontLabel: 'Más popular',
    accent: '#e8180c',
    badge: true,
    features: ['2 redes sociales', '16 publicaciones/mes', 'Copy + diseño', '2 Reels/mes', 'Informe semanal', 'Soporte prioritario'],
  },
  {
    id: '03',
    name: 'Full',
    price: 'A medida',
    note: '',
    frontBg: 'linear-gradient(145deg, #c4a882 0%, #8a7455 100%)',
    frontLabel: 'Sin límites',
    accent: '#c4a882',
  },
]

const planFeatures = {
  '01': ['1 red social', '8 publicaciones/mes', 'Copywriting incluido', 'Informe mensual', 'Soporte por email'],
  '02': ['2 redes sociales', '16 publicaciones/mes', 'Copy + diseño', '2 Reels/mes', 'Informe semanal', 'Soporte prioritario'],
  '03': ['Todo lo del Push', 'Paid Media incluido', 'Web o landing page', 'Account manager', 'Estrategia completa', 'Reunión mensual'],
}

// Spread X para desktop
const SPREAD_X = [-420, 0, 420]

function PricingCard({ plan, index, spreadProgress, flipProgress }) {
  const spreadX = useTransform(spreadProgress, [0, 1], [0, SPREAD_X[index]])
  // rotateZ: empieza en 0, sube ligero al hacer spread, vuelve a 0 al final
  const rotZ = useTransform(spreadProgress, [0, 0.5, 1], [0, [-5, 0, 4][index], 0])
  const rotY = useTransform(flipProgress, [0, 1], [0, 180])

  const springX    = useSpring(spreadX, { damping: 30, stiffness: 110 })
  const springRotZ = useSpring(rotZ,    { damping: 30, stiffness: 110 })

  const frontOpacity = useTransform(flipProgress, [0.38, 0.5], [1, 0])
  const backOpacity  = useTransform(flipProgress, [0.38, 0.5], [0, 1])

  return (
    <motion.div
      className={s.cardOuter}
      style={{
        x: springX,
        rotateZ: springRotZ,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        zIndex: index === 1 ? 2 : 1,
      }}
    >
      {/* FRONT */}
      <motion.div
        className={s.cardFace}
        style={{ background: plan.frontBg, opacity: frontOpacity }}
      >
        <span className={s.frontN}>{plan.id}</span>
        <div className={s.frontMiddle}>
          <span className={s.frontLabel}>{plan.frontLabel}</span>
          <span className={s.frontName}>{plan.name}</span>
        </div>
        <div className={s.frontPrice}>
          <span>{plan.price}</span>
          {plan.note && <span className={s.frontNote}>{plan.note}</span>}
        </div>
        <div className={s.frontDeco} style={{ background: plan.accent }} />
      </motion.div>

      {/* BACK */}
      <motion.div
        className={`${s.cardFace} ${s.cardBack}`}
        style={{ opacity: backOpacity, rotateY: '180deg' }}
      >
        {plan.badge && <span className={s.badge}>Más popular</span>}

        <div className={s.backHead}>
          <span className={s.backN}>{plan.id}</span>
          <h3 className={s.planName}>{plan.name}</h3>
        </div>

        <div className={s.priceRow}>
          <span className={s.price}>{plan.price}</span>
          {plan.note && <span className={s.priceNote}>{plan.note}</span>}
        </div>

        <div className={s.divider} style={{ background: plan.accent, opacity: 0.35 }} />

        <ul className={s.features}>
          {planFeatures[plan.id].map(f => (
            <li key={f} className={s.feature}>
              <span className={s.check} style={{ color: plan.accent }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/contacto"
          className={s.cardCta}
          style={plan.id === '02'
            ? { background: plan.accent, borderColor: plan.accent, color: '#fff' }
            : { borderColor: `${plan.accent}55` }}
        >
          {plan.id === '03' ? 'Hablamos' : 'Empezar'}
        </Link>
      </motion.div>
    </motion.div>
  )
}

// Mobile card — animación cinematográfica: cae desde profundidad girando en 3 ejes
function MobileCard({ plan, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.2'],
  })

  // Entra desde profundidad (scaleZ) + gira en X + leve Z según posición
  const rotateX = useTransform(scrollYProgress, [0, 0.6, 1], [22, 4, 0])
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1],
    index === 0 ? [-6, -2, 0] : index === 2 ? [6, 2, 0] : [0, 0, 0]
  )
  const scale   = useTransform(scrollYProgress, [0, 0.7, 1], [0.82, 0.96, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1])
  const y       = useTransform(scrollYProgress, [0, 1], [60, 0])
  // Blur: empieza desenfocado y se enfoca al llegar
  const blur    = useTransform(scrollYProgress, [0, 0.5], [8, 0])
  const blurStr = useTransform(blur, v => `blur(${v}px)`)

  const springRX = useSpring(rotateX, { damping: 22, stiffness: 85 })
  const springRZ = useSpring(rotateZ, { damping: 22, stiffness: 85 })
  const springY  = useSpring(y,       { damping: 22, stiffness: 85 })
  const springS  = useSpring(scale,   { damping: 22, stiffness: 85 })

  return (
    <motion.div
      ref={ref}
      className={s.mobileCard}
      style={{
        opacity,
        y: springY,
        scale: springS,
        rotateX: springRX,
        rotateZ: springRZ,
        filter: blurStr,
        transformPerspective: 1000,
        transformOrigin: 'top center',
        willChange: 'transform, opacity, filter',
      }}
    >
      <div className={s.mobileCardTop} style={{ background: plan.frontBg }}>
        <span className={s.frontN}>{plan.id}</span>
        <span className={s.frontName}>{plan.name}</span>
        <div className={s.mobilePrice}>
          <span>{plan.price}</span>
          {plan.note && <span className={s.frontNote}>{plan.note}</span>}
        </div>
        {plan.badge && <span className={s.mobileBadge}>Más popular</span>}
      </div>
      <div className={s.mobileCardBody}>
        <ul className={s.features}>
          {planFeatures[plan.id].map(f => (
            <li key={f} className={s.feature}>
              <span className={s.check} style={{ color: plan.accent }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
        <Link to="/contacto" className={s.cardCta}
          style={plan.id === '02'
            ? { background: plan.accent, borderColor: plan.accent, color: '#fff' }
            : { borderColor: `${plan.accent}55` }}>
          {plan.id === '03' ? 'Hablamos' : 'Empezar'}
        </Link>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const outerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  const spreadProgress = useTransform(scrollYProgress, [0.02, 0.38], [0, 1])
  const flipProgress0  = useTransform(scrollYProgress, [0.42, 0.80], [0, 1])
  const flipProgress1  = useTransform(scrollYProgress, [0.48, 0.86], [0, 1])
  const flipProgress2  = useTransform(scrollYProgress, [0.54, 0.92], [0, 1])
  const flipProgs      = [flipProgress0, flipProgress1, flipProgress2]

  const headerO = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.12], [24, 0])

  return (
    <div ref={outerRef} className={s.outerScroll} id="pricing">
      <DotGrid />

      {/* ── Desktop sticky animation ─────────────────────────── */}
      <div className={s.sticky}>
        <motion.div className={s.header} style={{ y: headerY, opacity: headerO }}>
          <span className={s.label}>© Precios · sin sorpresas</span>
          <SplitText text="Elige tu nivel." tag="h2" className={s.title} stagger={0.04} />
        </motion.div>

        <div className={s.stage}>
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              spreadProgress={spreadProgress}
              flipProgress={flipProgs[i]}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile layout (CSS hides/shows) ─────────────────── */}
      <div className={s.mobileLayout}>
        <div className={s.mobileHeader}>
          <span className={s.label}>© Precios · sin sorpresas</span>
          <h2 className={s.title}>Elige tu nivel.</h2>
        </div>
        <div className={s.mobileGrid}>
          {plans.map((plan, i) => (
            <MobileCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
