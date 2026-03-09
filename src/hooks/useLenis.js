import { useEffect } from 'react'

export default function useLenis() {
  useEffect(() => {
    // Lenis on mobile causes touch interception issues on iOS Safari
    // iOS already has native smooth scroll — only activate on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    let lenis
    let rafId

    const init = () => {
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          touchMultiplier: 1.5,
          gestureOrientation: 'vertical',
          prevent: (node) => node.tagName === 'TEXTAREA',
        })

        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      }).catch(() => {})
    }

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(init, { timeout: 500 })
    } else {
      setTimeout(init, 100)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])
}
