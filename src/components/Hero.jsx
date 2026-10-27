import { lazy, Suspense, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import Typewriter from './Typewriter.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import { profile, socials } from '../data.js'

// Three.js is heavy, so it loads in a separate chunk after the first paint.
const Scene3D = lazy(() => import('./Scene3D.jsx'))

const ease = [0.22, 1, 0.36, 1]
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '120px' })

  return (
    <section id="home" className="hero" ref={ref}>
      {!reduce && (
        <div className="hero__scene" aria-hidden="true">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Scene3D active={inView} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__grid">
        <motion.div className="hero__text" variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="hero__hello">
            Hi, it&apos;s
          </motion.p>
          <motion.h1 variants={item} className="hero__name">
            {profile.firstName} <span className="gradient-text">{profile.lastName}</span>
          </motion.h1>
          <motion.p variants={item} className="hero__role">
            <Typewriter words={profile.roles} />
          </motion.p>
          <motion.p variants={item} className="hero__intro">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Hire me
            </a>
            <a href="#projects" className="btn btn--ghost">
              View projects
            </a>
          </motion.div>

          <motion.ul variants={item} className="social" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="hero__photo"
          initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TiltCard className="photo-card" max={14}>
              <div className="photo-card__frame">
                <img src={profile.photo} alt={`Portrait of ${profile.name}`} />
              </div>
              <span className="chip chip--a">React</span>
              <span className="chip chip--b">TypeScript</span>
              <span className="chip chip--c">Node.js</span>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
