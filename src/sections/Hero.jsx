import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import s from './Hero.module.css'

// ─── Data ──────────────────────────────────────────────────────
const chartData = [
  { m: 'Ene', v: 12 }, { m: 'Feb', v: 19 }, { m: 'Mar', v: 15 },
  { m: 'Abr', v: 28 }, { m: 'May', v: 24 }, { m: 'Jun', v: 38 },
  { m: 'Jul', v: 32 }, { m: 'Ago', v: 45 }, { m: 'Sep', v: 41 },
  { m: 'Oct', v: 58 }, { m: 'Nov', v: 52 }, { m: 'Dic', v: 67 },
]

const reviews = [
  { name: 'Carlos M.', role: 'Hotel Boutique', text: 'Doblamos reservas en 3 meses. No creía que una web marcara tanta diferencia.' },
  { name: 'Ana L.',    role: 'Restaurante',    text: 'El contenido que crean para nuestras redes es exactamente lo que necesitábamos. Resultado inmediato.' },
  { name: 'Pedro S.',  role: 'Clínica dental', text: 'Profesionales, rápidos y sin humo. Exactamente lo que prometieron.' },
]

const services = ['Redes sociales', 'Paid Media', 'Copywriting', 'Diseño', 'Web', 'Audiovisual', 'IA']

// ─── Hook contador ─────────────────────────────────────────────
function useCounter(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startT = null
    const step = (ts) => {
      if (!startT) startT = ts
      const p = Math.min((ts - startT) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

// ─── Dona SVG ──────────────────────────────────────────────────
function Donut({ pct, size = 80, stroke = 8, delay = 0 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const [dash, setDash] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setDash((pct / 100) * circ), delay * 1000 + 200)
    return () => clearTimeout(t)
  }, [pct, circ, delay])
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#fff" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - dash} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' }} />
    </svg>
  )
}

// ─── HERO ──────────────────────────────────────────────────────
export default function Hero() {
  const [inView,         setInView]         = useState(false)
  const [reviewIdx,      setReviewIdx]      = useState(0)
  const [activeService,  setActiveService]  = useState(null)
  const ref      = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 4000)
    return () => clearInterval(t)
  }, [])

  const c1   = useCounter(30,  1600, inView)
  const c2   = useCounter(15,  1400, inView)
  const c3   = useCounter(3,   1200, inView)
  const cSat = useCounter(100, 2200, inView)

  return (
    <section ref={ref} className={s.hero}>

      {/* ══ IZQUIERDA ══ */}
      <div className={s.left}>

        {/* Pill con muñeco sentado encima */}
        <motion.div
          className={s.pillWrap}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {/* Muñeco — position absolute, bottom: 0, transform sube su altura completa */}
          <motion.div
            className={s.char}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img src="/characters/sentado.png" alt="" className={s.charImg} />
          </motion.div>

          <span className={s.pill}>Agencia de marketing · Madrid</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className={s.h1}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Tu negocio<br />
          digitalizado,<br />
          <span className={s.h1Red}>sin hipotecarte.</span>
        </motion.h1>

        {/* Párrafo */}
        <motion.p
          className={s.para}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Tu negocio no necesita una web de tres mil euros con palabras vacías.
          Necesita una que <strong>funcione</strong>, que <strong>guste</strong> y que <strong>no te arruine.</strong>
        </motion.p>

        {/* Botón */}
        <motion.div
          className={s.btnWrap}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
        >
          <Link to="/contacto" className={s.btn}>
            Solicita tu presupuesto
          </Link>
        </motion.div>

      </div>

      {/* ══ DERECHA ══ */}
      <motion.div
        className={s.right}
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className={s.panel}>

          {/* Fila 1: stats */}
          <div className={s.row2}>
            <motion.div className={s.card}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className={s.stat}>+{c1}</p>
              <p className={s.cardLabel}>Clientes activos</p>
            </motion.div>
            <motion.div className={s.card}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              whileHover={{ scale: 1.03 }}
            >
              <p className={s.stat}>+{c2}</p>
              <p className={s.cardLabel}>Proyectos al año</p>
            </motion.div>
          </div>

          {/* Fila 2: reseña */}
          <motion.div className={`${s.card} ${s.cardLeft}`}
            style={{ padding: '20px' }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={reviewIdx}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.32 }} style={{ width: '100%' }}
              >
                <p className={s.reviewText}>"{reviews[reviewIdx].text}"</p>
                <div className={s.reviewBottom}>
                  <div>
                    <p className={s.reviewName}>{reviews[reviewIdx].name}</p>
                    <p className={s.cardLabel}>{reviews[reviewIdx].role}</p>
                  </div>
                  <div className={s.dots}>
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setReviewIdx(i)}
                        className={`${s.dot} ${i === reviewIdx ? s.dotActive : ''}`}
                        style={{ width: i === reviewIdx ? 20 : 6 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Fila 3: gráfica + 3días/Google */}
          <div className={s.row2}>
            <motion.div className={`${s.card} ${s.cardLeft}`}
              style={{ padding: '18px' }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54 }}
            >
              <p className={s.cardTitle}>Crecimiento</p>
              <p className={s.cardLabel}>Últimos 12 meses</p>
              <div className={s.chartWrap}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#fff" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#fff" strokeWidth={1.5} fill="url(#gUp)" dot={false} />
                    <Tooltip
                      contentStyle={{ background: 'rgba(0,0,0,.65)', border: 'none', borderRadius: 8, fontSize: 11, color: '#fff' }}
                      labelFormatter={(_, p) => p?.[0]?.payload?.m || ''}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className={s.subCol}>
              <motion.div className={s.card}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <p className={s.statMd}>{c3} días</p>
                <p className={s.cardLabel}>De brief a online</p>
              </motion.div>
              <motion.div className={s.card}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.66 }}
                whileHover={{ scale: 1.03 }}
              >
                <p className={s.stars}>★★★★★</p>
                <p className={s.google}>GOOGLE</p>
              </motion.div>
            </div>
          </div>

          {/* Fila 4: dona + servicios */}
          <div className={s.row2}>
            <motion.div className={s.card}
              style={{ gap: 10, padding: '22px 18px' }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className={s.donutWrap}>
                <Donut pct={inView ? 100 : 0} size={80} stroke={7} delay={0.8} />
                <div className={s.donutLabel}>
                  <p className={s.donutText}>{cSat}%</p>
                </div>
              </div>
              <p className={s.cardTitle}>Satisfacción</p>
              <p className={s.cardLabel}>Clientes 2024</p>
            </motion.div>

            <motion.div className={`${s.card} ${s.cardLeft}`}
              style={{ padding: '18px', gap: 10 }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.78 }}
            >
              <p className={s.cardTitle}>¿Qué necesitas?</p>
              <div className={s.services}>
                {services.map(svc => (
                  <motion.button
                    key={svc}
                    onClick={() => setActiveService(activeService === svc ? null : svc)}
                    whileTap={{ scale: 0.93 }}
                    className={`${s.serviceBtn} ${activeService === svc ? s.serviceBtnActive : ''}`}
                  >
                    {svc}
                  </motion.button>
                ))}
              </div>
              <motion.button
                className={s.arrowBtn}
                onClick={() => activeService && navigate('/contacto')}
                whileHover={activeService ? { x: 4 } : {}}
                whileTap={activeService ? { scale: 0.95 } : {}}
                style={{ cursor: activeService ? 'pointer' : 'default' }}
              >
                <span className={`${s.arrowText} ${activeService ? s.arrowTextActive : ''}`}>
                  {activeService ? `Hablemos de ${activeService.toLowerCase()}` : 'Selecciona un servicio'}
                </span>
                <motion.span
                  className={`${s.arrow} ${activeService ? s.arrowActive : ''}`}
                  animate={{ x: activeService ? [0, 4, 0] : 0 }}
                  transition={{ repeat: activeService ? Infinity : 0, duration: 1.2 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
