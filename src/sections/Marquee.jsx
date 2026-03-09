import s from './Marquee.module.css'

const items = [
  'Social Media', 'Paid Media', 'Copywriting', 'Diseño Web',
  'Audiovisual', 'IA', 'Email Marketing', 'SEO', 'Branding',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className={s.wrap}>
      <div className={s.track}>
        {doubled.map((item, i) => (
          <span key={i} className={s.item}>
            <span className={s.text}>{item}</span>
            <span className={s.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
