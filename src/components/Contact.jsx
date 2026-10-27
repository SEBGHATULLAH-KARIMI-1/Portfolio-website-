import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa6'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'
import { sendMessage } from '../services/contact.js'

const EMPTY = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [simulated, setSimulated] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    try {
      const result = await sendMessage(values)
      setSimulated(result.simulated)
      setStatus('sent')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const field = (name, label, props = {}) => {
    const Tag = props.as ?? 'input'
    const { as, ...rest } = props
    return (
      <div className={`field ${errors[name] ? 'field--error' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <Tag
          id={name}
          name={name}
          value={values[name]}
          onChange={onChange}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
          {...rest}
        />
        {errors[name] && (
          <span id={`${name}-error`} className="field__error" role="alert">
            {errors[name]}
          </span>
        )}
      </div>
    )
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader eyebrow="Let's talk" title="Contact me" />

        <Reveal>
          <TiltCard className="card-glass form" max={3} glare={false}>
            <form onSubmit={onSubmit} noValidate>
              <h3>Get in touch</h3>
              {field('name', 'Name', { type: 'text', placeholder: 'Enter your name', autoComplete: 'name' })}
              {field('email', 'Email', { type: 'email', placeholder: 'Enter your email', autoComplete: 'email' })}
              {field('message', 'Message', { as: 'textarea', placeholder: 'Tell me about your project...', rows: 5 })}

              <button className="btn btn--primary btn--block" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : (<>Send message <FaPaperPlane /></>)}
              </button>

              <div className="form__status" aria-live="polite">
                <AnimatePresence mode="wait">
                  {status === 'sent' && (
                    <motion.p
                      key="sent"
                      className="form__ok"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {simulated
                        ? 'Demo mode: the form works, but no endpoint is configured so nothing was delivered.'
                        : 'Thank you! Your message has been sent.'}
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      key="error"
                      className="form__fail"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Something went wrong. Please try again later.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
