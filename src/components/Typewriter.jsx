import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Types and erases a rotating list of words. */
export default function Typewriter({ words, speed = 70, pause = 1600 }) {
  const reduce = useReducedMotion()
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return undefined

    const word = words[index % words.length]
    let timer

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed,
      )
    }

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, speed, pause, reduce])

  if (reduce) return <span>{words[0]}</span>

  return (
    <span aria-label={words.join(', ')}>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  )
}
