import Hero          from '../sections/Hero'
import ClientBar     from '../sections/ClientBar'
import Services      from '../sections/Services'
import Manifesto     from '../sections/Manifesto'
import Process       from '../sections/Process'
import Testimonials  from '../sections/Testimonials'
import Pricing       from '../sections/Pricing'
import Contact       from '../sections/Contact'
import SectionDivider from '../components/SectionDivider'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <ClientBar />
      <SectionDivider dim />
      <Services />
      <SectionDivider dim />
      <Manifesto />
      <SectionDivider dim />
      <Process />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Pricing />
      <SectionDivider dim />
      <Contact />
    </>
  )
}
