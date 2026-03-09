import { Routes, Route } from 'react-router-dom'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Cursor    from './components/Cursor'
import Home      from './pages/Home'
import Servicios from './pages/Servicios'
import Nosotros  from './pages/Nosotros'
import Contacto  from './pages/Contacto'
import useLenis  from './hooks/useLenis'

export default function App() {
  useLenis()

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/servicios"  element={<Servicios />} />
          <Route path="/nosotros"   element={<Nosotros />} />
          <Route path="/contacto"   element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
