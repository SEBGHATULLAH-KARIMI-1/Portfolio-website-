import { motion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { skills } from '../data.js'

function SkillGroup({ title, items, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <TiltCard className="card-glass skills-card" max={6}>
        <h3>{title}</h3>
        <ul className="skill-list">
          {items.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
            >
              <FaCircleCheck aria-hidden="true" />
              {name}
            </motion.li>
          ))}
        </ul>
      </TiltCard>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader eyebrow="What I use" title="Skills" />
        <div className="skills-grid">
          <SkillGroup title="Frontend" items={skills.frontend} />
          <SkillGroup title="Backend" items={skills.backend} delay={0.12} />
        </div>
      </div>
    </section>
  )
}
