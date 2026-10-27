import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa6'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { about, stats } from '../data.js'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return undefined
    if (reduce) {
      ref.current.textContent = `${to}${suffix}`
      return undefined
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to, suffix])

  return <span ref={ref}>{`0${suffix}`}</span>
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader eyebrow="Who I am" title="About me" />

        <div className="about-grid">
          <Reveal>
            <TiltCard className="card-glass about-card">
              <span className="icon-badge depth">
                <FaGraduationCap />
              </span>
              <h3 className="depth-sm">Education</h3>
              <p>{about.education}</p>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard className="card-glass about-card">
              <span className="icon-badge depth">
                <FaBriefcase />
              </span>
              <h3 className="depth-sm">Experience</h3>
              <p>{about.experience}</p>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.2}>
            <TiltCard className="card-glass about-card about-bio" max={6}>
              {about.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </TiltCard>
          </Reveal>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="card-glass stat">
                <div className="stat__num gradient-text">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="stat__label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
