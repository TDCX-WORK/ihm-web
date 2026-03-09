/**
 * DotGrid — fondo de puntos estilo Redo Media.
 * Copiado del comportamiento real de su sitio:
 *   - Puntos pequeños (~2px), grid de ~22px, opacidad visible
 *   - Sin máscara de borde — cubre toda la sección
 *   - position: absolute, zIndex: 0
 */
export default function DotGrid({
  color   = 'rgba(240,236,228,0.16)',  // Opacidad aumentada: Redo usa ~15%
  size    = 22,                         // Spacing entre puntos (px)
  dotR    = '1.2px',                    // Radio del punto
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: '0',               // Contained within parent
        pointerEvents: 'none',
        zIndex: 0,
        backgroundImage: `radial-gradient(circle ${dotR}, ${color} 0%, transparent 100%)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
