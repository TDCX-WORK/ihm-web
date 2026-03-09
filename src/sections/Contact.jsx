import { useState } from 'react'
import { motion } from 'framer-motion'
import s from './Contact.module.css'

const services = ['Social Media', 'Paid Media', 'Copywriting', 'Diseño', 'Web', 'Audiovisual', 'IA', 'No lo sé aún']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    // Aquí iría el envío real (EmailJS, Formspree, etc.)
    setSent(true)
  }

  return (
    <section className={s.section} id="contacto">
      <div className={s.inner}>

        {/* Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={s.label}>Contacto</p>
          <h2 className={s.title}>
            Cuéntanos<br />
            <span className={s.titleRed}>qué necesitas.</span>
          </h2>
          <p className={s.desc}>
            Sin compromiso. Una llamada de 30 minutos y te decimos exactamente
            lo que haríamos, cómo y cuánto costaría.
          </p>

          <div className={s.contactList}>
            <div className={s.contactItem}>
              <div className={s.contactIcon}>📞</div>
              <a href="tel:+34642016237" className={s.contactLink}>642 01 62 37</a>
            </div>
            <div className={s.contactItem}>
              <div className={s.contactIcon}>✉️</div>
              <a href="mailto:hola@ihate marqueting.es" className={s.contactLink}>hola@ihatemarqueting.es</a>
            </div>
            <div className={s.contactItem}>
              <div className={s.contactIcon}>📍</div>
              <p className={s.contactText}>Madrid, España</p>
            </div>
          </div>
        </motion.div>

        {/* Derecha — Formulario */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {sent ? (
            <div className={s.success}>
              <div className={s.successIcon}>✅</div>
              <h3 className={s.successTitle}>Recibido.</h3>
              <p className={s.successText}>Te contactamos en menos de 24h. Prometido.</p>
            </div>
          ) : (
            <form className={s.form} onSubmit={submit}>
              <div className={s.row}>
                <div className={s.field}>
                  <label className={s.label2}>Nombre</label>
                  <input
                    className={s.input} name="name" placeholder="Tu nombre"
                    value={form.name} onChange={handle} required
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label2}>Teléfono</label>
                  <input
                    className={s.input} name="phone" placeholder="600 000 000"
                    value={form.phone} onChange={handle}
                  />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label2}>Email</label>
                <input
                  className={s.input} type="email" name="email" placeholder="tu@email.com"
                  value={form.email} onChange={handle} required
                />
              </div>

              <div className={s.field}>
                <label className={s.label2}>¿Qué necesitas?</label>
                <select className={s.select} name="service" value={form.service} onChange={handle} required>
                  <option value="" disabled>Selecciona un servicio</option>
                  {services.map(sv => (
                    <option key={sv} value={sv}>{sv}</option>
                  ))}
                </select>
              </div>

              <div className={s.field}>
                <label className={s.label2}>Cuéntanos más</label>
                <textarea
                  className={s.textarea} name="message" placeholder="Describe brevemente tu proyecto o situación actual..."
                  value={form.message} onChange={handle}
                />
              </div>

              <button type="submit" className={s.submit}>
                Enviar mensaje
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
