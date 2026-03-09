import SplitText    from '../components/SplitText'
import ScrollReveal from '../components/ScrollReveal'
import LightOrb     from '../components/LightOrb'
import Contact      from '../sections/Contact'
import s from './Nosotros.module.css'

const team = [
  { name: 'Equipo IHM', role: 'Marketing Strategy', desc: 'Llevamos años viendo cómo las agencias cobran demasiado por hacer demasiado poco. Decidimos que había otra forma.' },
]

const values = [
  { n: '01', v: 'Honestidad radical',    d: 'Te decimos lo que funciona y lo que no, aunque no sea lo que quieres escuchar.' },
  { n: '02', v: 'Resultados medibles',   d: 'Todo lo que hacemos tiene un número detrás. Si no se puede medir, no lo hacemos.' },
  { n: '03', v: 'Velocidad de ejecución',d: 'El mercado no espera. Nosotros tampoco.' },
  { n: '04', v: 'Sin humo',             d: 'Sin buzzwords, sin presentaciones de 80 slides, sin palabras vacías.' },
]

export default function Nosotros() {
  return (
    <>
      <section className={s.hero}>
        <LightOrb x="65%" y="55%" color="var(--red)" size={600} opacity={0.09} />
        <ScrollReveal className={s.label}>Nosotros</ScrollReveal>
        <SplitText text="La agencia que odia el marketing de postureo." tag="h1" className={s.title} stagger={0.04} />
        <ScrollReveal delay={0.2}>
          <p className={s.sub}>Somos un equipo pequeño, directo y sin complejos. Hacemos marketing que funciona porque nos importan los resultados más que la imagen.</p>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className={s.values}>
        <ScrollReveal className={s.sectionLabel}>Cómo somos</ScrollReveal>
        <div className={s.valuesList}>
          {values.map((v, i) => (
            <ScrollReveal key={v.n} as="div" delay={i * 0.07} className={s.valueItem}>
              <span className={s.valueN}>{v.n}</span>
              <h3 className={s.valueTitle}>{v.v}</h3>
              <p className={s.valueDesc}>{v.d}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Contact />
    </>
  )
}
