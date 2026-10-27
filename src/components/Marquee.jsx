import { skills } from '../data.js'

const words = [...skills.frontend, ...skills.backend, 'Clean Code', 'Problem Solving']

/** Scrolling tech ribbon. The list is rendered twice so the loop is seamless. */
export default function Marquee() {
  return (
    <div className="ribbon" aria-hidden="true">
      <div className="ribbon__track">
        {[...words, ...words].map((w, i) => (
          <span className="ribbon__item" key={`${w}-${i}`}>
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}
