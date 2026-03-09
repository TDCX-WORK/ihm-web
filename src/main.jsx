import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './globals.css'
import App from './App.jsx'



// iOS Safari viewport height fix
// Set --vh once at load and freeze it — prevents hero resize when Safari hides address bar
(function() {
  var vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', vh + 'px')
  // Do NOT update on resize — that's what causes the jump
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
