import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import DotGrid from '../components/DotGrid'
import LightOrb from '../components/LightOrb'
import s from './Contact.module.css'

const WA_BASE = 'https://wa.me/34642016237'

const cards = [
  {
    id: 'wa',
    badge: 'Más rápido',
    title: 'WhatsApp\ndirecto.',
    desc: 'Sin formularios. Sin esperas.\nRespuesta en menos de 24h.',
    cta: 'Abrir WhatsApp',
    href: `${WA_BASE}?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20vuestros%20servicios.`,
    // Gradient that bleeds through the diagonal corner
    gradientA: '#1a0a08',
    gradientB: '#7a1508',
    accentColor: '#25D366',
    isWA: true,
  },
  {
    id: 'audit',
    badge: 'Sin compromiso',
    title: 'Auditoría\nexprés.',
    desc: 'Una llamada de 20 min.\nFeedback real, gratis.',
    cta: 'Pedir auditoría',
    href: `${WA_BASE}?text=Hola%2C%20me%20interesa%20una%20auditor%C3%ADa%20express%20gratuita.`,
    gradientA: '#080f1a',
    gradientB: '#0a2240',
    accentColor: 'var(--red)',
    isWA: false,
  },
  {
    id: 'budget',
    badge: '48h',
    title: 'Presupuesto\na medida.',
    desc: 'Cuéntanos qué necesitas.\nPropuesta detallada sin letra pequeña.',
    cta: 'Solicitar propuesta',
    href: `${WA_BASE}?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20un%20presupuesto%20a%20medida.`,
    gradientA: '#120d04',
    gradientB: '#3d2a0a',
    accentColor: 'var(--gold)',
    isWA: false,
  },
]

function WAIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function ContactCard({ card, index }) {
  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className={s.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Full-card background gradient — visible at edges */}
      <div
        className={s.cardBg}
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${card.gradientB} 0%, ${card.gradientA} 60%)` }}
      />

      {/* Dark overlay panel — diagonal cut top-right */}
      <div className={s.cardInner}>

        {/* Top row: badge + icon */}
        <div className={s.cardTop}>
          <span className={s.badge} style={{ color: card.accentColor, borderColor: `${card.accentColor}30` }}>
            {card.badge}
          </span>
          <span className={s.iconWrap} style={{ color: card.accentColor }}>
            {card.isWA ? <WAIcon size={18} /> : <span className={s.arrowIcon}>↗</span>}
          </span>
        </div>

        {/* Title */}
        <h3 className={s.cardTitle}>
          {card.title.split('\n').map((line, i) => (
            <span key={i} className={s.titleLine}>{line}</span>
          ))}
        </h3>

        {/* Bottom: desc + cta */}
        <div className={s.cardBottom}>
          <p className={s.cardDesc}>
            {card.desc.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
          <div className={s.cardCta} style={{ color: card.accentColor }}>
            {card.cta}
            <span className={s.ctaArrow}>→</span>
          </div>
        </div>
      </div>

      {/* Accent line at bottom */}
      <div className={s.cardLine} style={{ background: card.accentColor }} />
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const titleX = useTransform(scrollYProgress, [0, 1], ['-2%', '2%'])

  return (
    <section id="contacto" className={s.section} ref={ref}>
      <DotGrid />
      <LightOrb x="80%" y="30%" color="var(--red)" size={600} opacity={0.04} />

      {/* Header */}
      <div className={s.header}>
        <ScrollReveal className={s.labelRow}>
          <span>© Contacto</span>
          <span>sin burocracia</span>
        </ScrollReveal>

        <motion.div style={{ x: titleX }}>
          <h2 className={s.title}>
            Hablemos.<br />
            <span className={s.titleDim}>Sin rodeos.</span>
          </h2>
        </motion.div>

        <ScrollReveal delay={0.1}>
          <p className={s.sub}>
            Elige cómo prefieres empezar. La primera conversación
            no cuesta nada y respondemos el mismo día.
          </p>
        </ScrollReveal>
      </div>

      {/* Cards */}
      <div className={s.cards}>
        {cards.map((card, i) => (
          <ContactCard key={card.id} card={card} index={i} />
        ))}
      </div>

      {/* Bottom bar */}
      <motion.div
        className={s.bottomBar}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className={s.bottomLeft}>
          <span className={s.bottomLogo}>IHM<span>®</span></span>
          <span className={s.bottomTagline}>Marketing que funciona, o no cobras.</span>
        </div>
        <div className={s.bottomRight}>
          <a href={`${WA_BASE}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
            <WAIcon size={14} />
            642 01 62 37
          </a>
          <span className={s.bottomCity}>Madrid · España</span>
        </div>
      </motion.div>
    </section>
  )
}
