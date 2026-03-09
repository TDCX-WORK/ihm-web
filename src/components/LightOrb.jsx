export default function LightOrb({ x = '50%', y = '50%', color = 'var(--red)', size = 500, opacity = 0.1 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x, top: y,
        width: size, height: size,
        borderRadius: '50%',
        /* Radial gradient replaces blur — same visual, zero GPU cost */
        background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
        opacity,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        /* No filter:blur — use CSS gradient falloff instead */
      }}
    />
  )
}
