import React from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'
import './theme.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* reducedMotion="user" honours the OS "reduce motion" setting for all animations */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)
