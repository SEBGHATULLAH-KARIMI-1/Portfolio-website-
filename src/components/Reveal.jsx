import { motion } from 'framer-motion'

/** Fades and slides children in when they scroll into view (once). */
export default function Reveal({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
