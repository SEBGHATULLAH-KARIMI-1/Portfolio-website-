import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * 3D tilt card: rotates toward the pointer with spring physics and adds a
 * moving glare. Children can use the .depth / .depth-sm / .depth-lg classes
 * to "pop out" of the card in 3D space.
 */
export default function TiltCard({
  children,
  className = '',
  max = 10,
  glare = true,
  ...rest
}) {
  const reduce = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 20, mass: 0.6 }

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)

  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 55%)`
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 })

  if (reduce) {
    return (
      <div className={`tilt ${className}`} {...rest}>
        {children}
      </div>
    )
  }

  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
    glareOpacity.set(1)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <motion.div
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          className="tilt__glare"
          aria-hidden="true"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  )
}
