import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import LightOrb from '../components/LightOrb'
import DotGrid  from '../components/DotGrid'
import s from './Hero.module.css'

function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let t = null
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) t = requestAnimationFrame(step)
    }
    t = requestAnimationFrame(step)
    return () => cancelAnimationFrame(t)
  }, [started, target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

function Donut({ pct, size = 72, stroke = 7 }) {
  const r    = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const [dash, setDash] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setDash((pct / 100) * circ), 600)
    return () => clearTimeout(t)
  }, [pct, circ])
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#fff" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - dash} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  )
}

const chartData = [
  {m:'Ene',v:12},{m:'Feb',v:19},{m:'Mar',v:15},{m:'Abr',v:28},{m:'May',v:24},
  {m:'Jun',v:38},{m:'Jul',v:32},{m:'Ago',v:45},{m:'Sep',v:41},{m:'Oct',v:58},
  {m:'Nov',v:52},{m:'Dic',v:67},
]

const reviews = [
  { name:'Carlos M.', role:'Hotel Boutique',  text:'Doblamos reservas directas en 3 meses. No creía que marcara tanta diferencia.' },
  { name:'Ana L.',    role:'Restaurante',      text:'Resultado inmediato, sin vueltas ni reuniones infinitas que no llevan a ningún lado.' },
  { name:'Pedro S.',  role:'Clínica Dental',   text:'Profesionales, rápidos y sin humo. Exactamente lo que prometieron.' },
]

const services = ['Redes', 'Paid Media', 'Copy', 'Diseño', 'Web', 'Vídeo', 'IA']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const headY   = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const ox = useSpring(mx, { damping: 35, stiffness: 60 })
  const oy = useSpring(my, { damping: 35, stiffness: 60 })
  const [reviewIdx, setReviewIdx]         = useState(0)
  const [activeService, setActiveService] = useState(null)

  const handleMouse = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width  - 0.5) * 60)
    my.set(((e.clientY - r.top)  / r.height - 0.5) * 40)
  }

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % reviews.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} className={s.hero} onMouseMove={handleMouse}>
      {/* Dot grid background */}
      <DotGrid opacity={1} color="rgba(240,236,228,0.055)" />

      <motion.div className={s.orbs} style={{ x: ox, y: oy }}>
        <LightOrb x="14%" y="40%" color="var(--red)"     size={650} opacity={0.12} />
        <LightOrb x="72%" y="60%" color="var(--gold)"    size={500} opacity={0.07} />
        <LightOrb x="50%" y="88%" color="var(--red-dim)" size={380} opacity={0.08} />
      </motion.div>
      <div className={s.grain} />

      <motion.div className={s.inner} style={{ opacity: fadeOut }}>
        {/* LEFT */}
        <div className={s.left}>
          <motion.div className={s.eyebrow}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <span className={s.eyebrowLine} />
            <span className={s.eyebrowText}>Madrid · Agencia de Marketing Digital</span>
          </motion.div>

          <motion.div className={s.headWrap} style={{ y: headY }}>
            {[
              { text: 'Tu negocio,',      v: 'solid'   },
              { text: 'digitalizado.',    v: 'solid'   },
              { text: 'Sin hipotecarte.', v: 'red'     },
            ].map(({ text, v }, i) => (
              <div key={i} className={s.lineWrap}>
                <motion.h1 className={`${s.h1} ${s[v]}`}
                  initial={{ y: '105%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.05, delay: 0.08 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >{text}</motion.h1>
              </div>
            ))}
          </motion.div>

          <motion.p className={s.sub}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Hacemos que tu marca exista en internet <em>de verdad.</em><br />
            Sin palabrería, sin letra pequeña, sin facturas sorpresa.
          </motion.p>

          <motion.div className={s.ctas}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.8 }}
          >
            <Link to="/contacto" className={s.btnPrimary}    data-cursor="hablemos">Solicitar presupuesto</Link>
            <Link to="/servicios" className={s.btnSecondary} data-cursor="ver">Ver servicios</Link>
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <motion.div className={s.panelWrap}
          initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={s.panel}>
            {/* Row 1: stats */}
            <div className={s.row2}>
              {[{ n: 30, sfx: '+', label: 'Clientes activos' }, { n: 15, sfx: '+', label: 'Proyectos al año' }].map(({ n, sfx, label }, i) => (
                <motion.div key={label} className={s.card}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }} whileHover={{ scale: 1.03 }}
                >
                  <p className={s.statBig}><Counter target={n} suffix={sfx} /></p>
                  <p className={s.cardLabel}>{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Row 2: review */}
            <motion.div className={`${s.card} ${s.cardLeft}`}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }} style={{ padding: '20px' }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={reviewIdx}
                  initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={s.reviewText}>"{reviews[reviewIdx].text}"</p>
                  <div className={s.reviewBottom}>
                    <div>
                      <p className={s.reviewName}>{reviews[reviewIdx].name}</p>
                      <p className={s.cardLabel}>{reviews[reviewIdx].role}</p>
                    </div>
                    <div className={s.dots}>
                      {reviews.map((_, i) => (
                        <button key={i} onClick={() => setReviewIdx(i)}
                          className={`${s.dot} ${i === reviewIdx ? s.dotActive : ''}`}
                          style={{ width: i === reviewIdx ? 20 : 6 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Row 3: chart + mini */}
            <div className={s.row2}>
              <motion.div className={`${s.card} ${s.cardLeft}`}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58 }} style={{ padding: '18px' }}
              >
                <p className={s.cardTitle}>Crecimiento</p>
                <p className={s.cardLabel}>Últimos 12 meses</p>
                <div className={s.chartWrap}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gUp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#fff" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#fff" strokeWidth={1.5} fill="url(#gUp)" dot={false} />
                      <Tooltip contentStyle={{ background: 'rgba(0,0,0,.7)', border: 'none', borderRadius: 8, fontSize: 11, color: '#fff' }}
                        labelFormatter={(_, p) => p?.[0]?.payload?.m || ''} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <div className={s.subCol}>
                <motion.div className={s.card}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.64 }} whileHover={{ scale: 1.03 }}
                >
                  <p className={s.statMd}><Counter target={3} suffix=" días" /></p>
                  <p className={s.cardLabel}>Brief a online</p>
                </motion.div>
                <motion.div className={s.card}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }} whileHover={{ scale: 1.03 }}
                >
                  <p className={s.stars}>★★★★★</p>
                  <p className={s.google}>GOOGLE</p>
                </motion.div>
              </div>
            </div>

            {/* Row 4: dona + servicios */}
            <div className={s.row2}>
              <motion.div className={s.card}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.76 }} whileHover={{ scale: 1.03 }}
                style={{ gap: 8, padding: '20px 16px' }}
              >
                <div className={s.donutWrap}>
                  <Donut pct={100} size={72} stroke={7} />
                  <div className={s.donutLabel}><p className={s.donutText}>100%</p></div>
                </div>
                <p className={s.cardTitle}>Satisfacción</p>
                <p className={s.cardLabel}>Clientes 2024</p>
              </motion.div>

              <motion.div className={`${s.card} ${s.cardLeft}`}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82 }} style={{ padding: '18px', gap: 10 }}
              >
                <p className={s.cardTitle}>¿Qué necesitas?</p>
                <div className={s.services}>
                  {services.map(sv => (
                    <motion.button key={sv}
                      onClick={() => setActiveService(activeService === sv ? null : sv)}
                      whileTap={{ scale: 0.93 }}
                      className={`${s.serviceBtn} ${activeService === sv ? s.serviceBtnActive : ''}`}
                    >{sv}</motion.button>
                  ))}
                </div>
                <div className={s.arrowRow}>
                  <span className={`${s.arrowText} ${activeService ? s.arrowTextActive : ''}`}>
                    {activeService ? `Hablemos de ${activeService.toLowerCase()}` : 'Selecciona'}
                  </span>
                  <motion.span
                    className={`${s.arrowIcon} ${activeService ? s.arrowIconActive : ''}`}
                    animate={{ x: activeService ? [0, 4, 0] : 0 }}
                    transition={{ repeat: activeService ? Infinity : 0, duration: 1.2 }}
                  >→</motion.span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className={s.scrollIndicator}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
      >
        <span className={s.scrollText}>scroll</span>
        <div className={s.scrollLine} />
      </motion.div>
    </section>
  )
}
