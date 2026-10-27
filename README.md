# Sebghatullah Karimi — Portfolio (React + 3D)

Stack: **React 18 · Vite · Framer Motion · Three.js (react-three-fiber / drei)**

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

## Structure

```
public/images/        profile + project screenshots
src/data.js           ALL content (texts, links, skills, projects) — edit here
src/components/       Hero, About, Projects, Skills, Contact, Navbar, ...
  Scene3D.jsx         Three.js background (lazy-loaded, pauses off-screen)
  TiltCard.jsx        reusable 3D tilt + glare card
src/services/contact.js   contact form transport
legacy/               the previous HTML/CSS version (also in git history)
```

## Contact form

Without configuration the form only *simulates* sending. Before deploying:

1. Create a form endpoint (e.g. https://formspree.io).
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=<your url>`.

## Deploy to GitHub Pages

`vite.config.js` uses `base: './'`, so the contents of `dist/` can be published
directly (e.g. with the `gh-pages` package or a GitHub Actions workflow).

## Accessibility & performance

- All animations respect `prefers-reduced-motion` (3D scene is not mounted at all).
- Three.js is code-split and stops rendering when the hero is off-screen.
- If WebGL is unavailable the page still works (error boundary).
