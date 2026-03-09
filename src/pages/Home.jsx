import Hero        from '../sections/Hero'
import Marquee     from '../sections/Marquee'
import Services    from '../sections/Services'
import Process     from '../sections/Process'
import Pricing     from '../sections/Pricing'
import Testimonials from '../sections/Testimonials'
import Contact     from '../sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Contact />
    </>
  )
}
