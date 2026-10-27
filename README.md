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
public/images/            profile + project images
src/data.js               ALL content (texts, links, skills, projects) — edit here
src/components/           Hero, About, Projects, Skills, Contact, Navbar, ...
  Scene3D.jsx             Three.js background (lazy-loaded, pauses off-screen)
  TiltCard.jsx            reusable 3D tilt + glare card
src/services/contact.js   contact form transport
.github/workflows/        automatic deploy to GitHub Pages
```

## Projects and links

Open `src/data.js` and edit the `projects` list. Each project has a `github`
and a `demo` link. If a link is left as `''`, the card shows a disabled
"Coming soon" button instead of a broken link.

## Contact form

Without configuration the form only *simulates* sending. To receive real messages:

1. Create a form endpoint (e.g. https://formspree.io).
2. Locally: copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=<your url>`.
3. On GitHub: Settings → Secrets and variables → Actions → **Variables** →
   add `VITE_CONTACT_ENDPOINT` with the same URL (the `.env` file is not pushed).

## Deploy to GitHub Pages

The site deploys automatically on every push to `main`
(`.github/workflows/deploy.yml`).

One-time setup: repository **Settings → Pages → Build and deployment → Source:
GitHub Actions**. After the first run finishes (Actions tab), the site is at
`https://<username>.github.io/<repository>/`.

`vite.config.js` uses `base: './'`, so it works on a sub-path without extra config.

## Accessibility & performance

- All animations respect `prefers-reduced-motion` (3D scene is not mounted at all).
- Three.js is code-split and stops rendering when the hero is off-screen.
- If WebGL is unavailable the page still works (error boundary).
