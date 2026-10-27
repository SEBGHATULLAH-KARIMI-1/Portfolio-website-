# Sample projects

Four small, standalone projects (plain HTML / CSS / JS — no build step):

| Folder | What it shows |
| --- | --- |
| `task-manager/` | DOM manipulation, filters, localStorage, SVG progress ring |
| `coffee-landing/` | Landing page, CSS-only animated cup, 3D hover cards, scroll reveal |
| `analytics-dashboard/` | Hand-drawn SVG line chart with tooltip, animated counters, responsive layout |
| `memory-game/` | CSS 3D card flips, game state, timer, best score |

Preview images for the portfolio are already in `public/images/samples/`.
They are illustrated mock-ups — after hosting, replace them with real
screenshots (same file name, or change the path in `src/data.js`).

## Try one locally
Open the folder's `index.html` in a browser. Nothing to install.

## Host (GitHub Pages)
For each project folder:

1. Create a new GitHub repo (e.g. `task-manager`).
2. Upload the 3 files of that folder (`index.html`, `style.css`, `script.js`) to the repo root.
3. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
4. Your link will be `https://<username>.github.io/<repo>/`.

## Add the links to the portfolio
Open `src/data.js`, find the project and fill in the two fields:

```js
github: 'https://github.com/<username>/task-manager',
demo:   'https://<username>.github.io/task-manager/',
```

Until a link is filled in, the card shows a disabled "Coming soon" button.
