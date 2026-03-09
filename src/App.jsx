import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Cursor   from './components/Cursor'
import Navbar   from './components/Navbar'
import Footer   from './components/Footer'
import PageTransition from './components/PageTransition'
import Home     from './pages/Home'
import Servicios from './pages/Servicios'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import useLenis from './hooks/useLenis'

export default function App() {
  useLenis()
  const location = useLocation()

  return (
    <>
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition><Home /></PageTransition>
          } />
          <Route path="/servicios" element={
            <PageTransition><Servicios /></PageTransition>
          } />
          <Route path="/nosotros" element={
            <PageTransition><Nosotros /></PageTransition>
          } />
          <Route path="/contacto" element={
            <PageTransition><Contacto /></PageTransition>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
