import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { profile } from '../data.js'

// [text, colour-class] — a tiny hand-made syntax highlighter.
const lines = [
  [['const ', 'k'], ['developer ', 'v'], ['= {', 'p']],
  [['  name: ', 'p'], [`'${profile.firstName}'`, 's'], [',', 'p']],
  [['  role: ', 'p'], ["'Software Engineer'", 's'], [',', 'p']],
  [['  stack: ', 'p'], ["['React', 'Node', 'Java']", 's'], [',', 'p']],
  [['  learning: ', 'p'], ['true', 'b'], [',', 'p']],
  [['}', 'p']],
]

const total = lines.reduce((n, l) => n + l.reduce((m, [t]) => m + t.length, 0), 0)

/** Floating code window that types itself, then loops. */
export default function CodeWindow() {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? total : 0)

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(
      () => setN((v) => (v >= total + 40 ? 0 : v + 1)), // short pause at the end, then restart
      n >= total ? 60 : 38,
    )
    return () => clearTimeout(id)
  }, [n, reduce])

  let left = n
  return (
    <div className="code-win" aria-hidden="true">
      <div className="code-win__bar">
        <i /><i /><i />
        <span>developer.js</span>
      </div>
      <pre className="code-win__body">
        {lines.map((line, i) => {
          const parts = line.map(([text, cls], j) => {
            const shown = text.slice(0, Math.max(0, left))
            left -= text.length
            return shown ? <span key={j} className={`t-${cls}`}>{shown}</span> : null
          })
          return <div key={i}>{parts}{'\u200b'}</div>
        })}
        <span className="code-win__caret" />
      </pre>
    </div>
  )
}
