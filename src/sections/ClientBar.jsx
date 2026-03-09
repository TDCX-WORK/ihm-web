import s from './ClientBar.module.css'

/**
 * Para sustituir por logos reales:
 *   <img src="/logos/nombre.png" alt="Nombre" className={s.logoImg} />
 */

const Wordmark = ({ text, size = 18 }) => (
  <svg viewBox={`0 0 ${text.length * 13} 28`} className={s.svg}>
    <text x="2" y="22" fontFamily="'DM Sans',sans-serif" fontWeight="700"
      fontSize={size} fill="rgba(240,236,228,0.85)" letterSpacing="-0.3">{text}</text>
  </svg>
)

const BoxMark = ({ letters, sub }) => (
  <svg viewBox="0 0 88 42" className={s.svg}>
    <rect x="0" y="0" width="38" height="38" rx="3" fill="rgba(240,236,228,0.9)" />
    <text x="19" y="26" fontFamily="'DM Sans',sans-serif" fontWeight="800"
      fontSize="16" fill="#0a0908" textAnchor="middle">{letters}</text>
    <text x="46" y="17" fontFamily="'DM Sans',sans-serif" fontWeight="600"
      fontSize="8" fill="rgba(240,236,228,0.6)" letterSpacing="0.8">{sub?.split(' ')[0]}</text>
    <text x="46" y="29" fontFamily="'DM Sans',sans-serif" fontWeight="400"
      fontSize="7" fill="rgba(240,236,228,0.35)" letterSpacing="0.5">{sub?.split(' ').slice(1).join(' ')}</text>
  </svg>
)

const ScriptMark = ({ text, sub }) => (
  <svg viewBox="0 0 120 40" className={s.svg}>
    <text x="4" y="28" fontFamily="Georgia,'Times New Roman',serif" fontStyle="italic"
      fontSize="26" fill="rgba(240,236,228,0.85)">{text}</text>
    {sub && <text x="6" y="38" fontFamily="'DM Sans',sans-serif"
      fontSize="8" fill="rgba(240,236,228,0.35)" letterSpacing="1">{sub}</text>}
  </svg>
)

const FlameMark = ({ text, sub }) => (
  <svg viewBox="0 0 108 38" className={s.svg}>
    <path d="M10 34C10 34 3 26 5 17C7 8 14 5 14 5C14 5 11 13 16 17C18 19 21 15 21 15C21 15 26 22 23 30C21 34 17 36 13 34Z"
      fill="var(--red)" opacity="0.85"/>
    <text x="30" y="18" fontFamily="'DM Sans',sans-serif" fontWeight="700"
      fontSize="13" fill="rgba(240,236,228,0.85)" letterSpacing="1">{text}</text>
    <text x="30" y="31" fontFamily="'DM Sans',sans-serif" fontWeight="400"
      fontSize="10" fill="rgba(240,236,228,0.4)" letterSpacing="1">{sub}</text>
  </svg>
)

const StackMark = ({ text, sub }) => (
  <svg viewBox="0 0 100 38" className={s.svg}>
    <rect x="0"  y="2"  width="96" height="10" rx="2" fill="rgba(240,236,228,0.85)" />
    <rect x="10" y="16" width="76" height="8"  rx="2" fill="rgba(240,236,228,0.5)" />
    <rect x="22" y="28" width="52" height="6"  rx="2" fill="rgba(240,236,228,0.25)" />
    <text x="48" y="10" fontFamily="'DM Sans',sans-serif" fontWeight="700"
      fontSize="7" fill="#0a0908" textAnchor="middle" dominantBaseline="middle">{text}</text>
    {sub && <text x="48" y="24" fontFamily="'DM Sans',sans-serif"
      fontSize="6" fill="rgba(240,236,228,0.5)" textAnchor="middle">{sub}</text>}
  </svg>
)

const clients = [
  { id: 'sv-plaza',     label: 'SV Suites Viena',  render: () => <BoxMark letters="SV" sub="SUITES VIENA PLAZA" /> },
  { id: 'ifema',        label: 'IFEMA Madrid',      render: () => <FlameMark text="IFEMA" sub="MADRID" /> },
  { id: 'maketa',       label: 'Maketa Design',     render: () => <StackMark text="MAKETA" sub="DESIGN" /> },
  { id: 'viena-cap',    label: 'Viena Capellanes',  render: () => <ScriptMark text="Viena" sub="CAPELLANES" /> },
  { id: 'sv-suites',    label: 'SV Viena',          render: () => <BoxMark letters="SV" sub="SUITES VIENA" /> },
  { id: 'blendex',      label: 'Blendex Trade',     render: () => <Wordmark text="BLENDEX" /> },
  { id: 'clinica-plus', label: 'Clínica Plus',      render: () => <WordmarkBox text="C+" sub="CLÍNICA" /> },
  { id: 'estudio-arch', label: 'Estudio Arch',      render: () => <Wordmark text="ARCH." /> },
  { id: 'farm-roca',    label: 'Farmacia Roca',     render: () => <BoxMark letters="FR" sub="FARMACIA ROCA" /> },
  { id: 'legal-co',     label: 'Legal & Co.',       render: () => <ScriptMark text="Legal" sub="& CO." /> },
  { id: 'inmosur',      label: 'Inmobiliaria Sur',  render: () => <Wordmark text="INMOSUR" size={15}/> },
  { id: 'medcenter',    label: 'MedCenter BCN',     render: () => <StackMark text="MEDCENTER" sub="BCN" /> },
  { id: 'cafeblend',    label: 'CaféBlend',         render: () => <ScriptMark text="Café" sub="BLEND" /> },
  { id: 'technow',      label: 'TechNow',           render: () => <FlameMark text="TECH" sub="NOW" /> },
  { id: 'gruposab',     label: 'Grupo Sabores',     render: () => <Wordmark text="SABORES" size={15}/> },
  { id: 'studioart',    label: 'Studio Art',        render: () => <BoxMark letters="SA" sub="STUDIO ART" /> },
]

// helper used in the list above
function WordmarkBox({ text, sub }) {
  return (
    <svg viewBox="0 0 80 38" className={s.svg}>
      <circle cx="19" cy="19" r="17" fill="rgba(232,24,12,0.15)" stroke="rgba(232,24,12,0.4)" strokeWidth="1" />
      <text x="19" y="24" fontFamily="'DM Sans',sans-serif" fontWeight="800"
        fontSize="14" fill="rgba(240,236,228,0.9)" textAnchor="middle">{text}</text>
      {sub && <text x="44" y="22" fontFamily="'DM Sans',sans-serif"
        fontSize="8" fill="rgba(240,236,228,0.45)" letterSpacing="1">{sub}</text>}
    </svg>
  )
}

export default function ClientBar() {
  // Double for seamless loop
  const doubled = [...clients, ...clients]

  return (
    <section className={s.section}>
      {/* Header */}
      <div className={s.header}>
        <span className={s.headerLine} />
        <span className={s.headerText}>Clientes que ya crecen con nosotros</span>
        <span className={s.headerCount}>{clients.length} marcas</span>
        <span className={s.headerLine} />
      </div>

      {/* Track container */}
      <div className={s.trackWrap}>
        {/* Blur+fade masks */}
        <div className={s.maskLeft}  aria-hidden="true" />
        <div className={s.maskRight} aria-hidden="true" />

        <div className={s.track}>
          {doubled.map((c, i) => (
            <div key={`${c.id}-${i}`} className={s.card}>
              {/* Glass card */}
              <div className={s.cardInner}>
                <div className={s.cardLogo}>{c.render()}</div>
                <p className={s.cardLabel}>{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
