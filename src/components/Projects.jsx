import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { projects } from '../data.js'

/** Real link when available, otherwise a disabled "Coming soon" button. */
function LinkButton({ href, icon: Icon, label }) {
  const url = href?.trim()

  if (!url) {
    return (
      <span className="btn btn--ghost btn--sm btn--disabled" aria-disabled="true" title="Link will be added after hosting">
        <Icon /> {label}
        <small>soon</small>
      </span>
    )
  }

  return (
    <a className="btn btn--ghost btn--sm" href={url} target="_blank" rel="noopener noreferrer">
      <Icon /> {label}
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader eyebrow="Selected work" title="Projects" />

        <div className="cards">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.12}>
              <TiltCard className="card-glass project-card" max={9}>
                <div className="project-card__media depth-sm">
                  <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
                  <span className="project-card__index">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="depth">{p.title}</h3>

                {p.description && <p className="project-card__desc">{p.description}</p>}

                {p.tags && (
                  <ul className="tags" aria-label="Technologies">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}

                <div className="project-card__actions depth">
                  <LinkButton href={p.github} icon={FaGithub} label="GitHub" />
                  <LinkButton href={p.demo} icon={FaArrowUpRightFromSquare} label="Live demo" />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
