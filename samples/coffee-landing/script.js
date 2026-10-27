const MENU = [
  { name: 'Espresso', cat: 'hot', price: 3.2, icon: '☕', desc: 'A bold, syrupy single-origin shot.' },
  { name: 'Flat White', cat: 'hot', price: 4.5, icon: '🥛', desc: 'Velvety microfoam over a double ristretto.' },
  { name: 'Cappuccino', cat: 'hot', price: 4.3, icon: '☁️', desc: 'Equal parts espresso, milk and airy foam.' },
  { name: 'Cold Brew', cat: 'cold', price: 4.8, icon: '🧊', desc: 'Steeped for 18 hours. Smooth and low acid.' },
  { name: 'Iced Latte', cat: 'cold', price: 5.0, icon: '🥤', desc: 'Espresso, cold milk and plenty of ice.' },
  { name: 'Affogato', cat: 'cold', price: 5.5, icon: '🍨', desc: 'Vanilla gelato drowned in hot espresso.' },
  { name: 'Butter Croissant', cat: 'bakery', price: 3.8, icon: '🥐', desc: 'Laminated by hand, baked every morning.' },
  { name: 'Cinnamon Roll', cat: 'bakery', price: 4.2, icon: '🍥', desc: 'Soft, sticky and generously spiced.' },
  { name: 'Blueberry Muffin', cat: 'bakery', price: 3.6, icon: '🧁', desc: 'Packed with fruit and a crunchy top.' },
]

const itemsEl = document.getElementById('items')
const tabs = document.querySelectorAll('.tabs button')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Scroll reveal */
const observer =
  'IntersectionObserver' in window && !reduceMotion
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              observer.unobserve(e.target)
            }
          }),
        { threshold: 0.15 },
      )
    : null

function reveal(el) {
  if (observer) observer.observe(el)
  else el.classList.add('in')
}

/* Menu */
function itemElement(item) {
  const wrap = document.createElement('div')
  wrap.className = 'reveal'

  const card = document.createElement('article')
  card.className = 'item__card'

  const icon = document.createElement('div')
  icon.className = 'item__icon'
  icon.textContent = item.icon

  const top = document.createElement('div')
  top.className = 'item__top'
  const title = document.createElement('h3')
  title.textContent = item.name
  const price = document.createElement('span')
  price.className = 'price'
  price.textContent = `$${item.price.toFixed(2)}`
  top.append(title, price)

  const desc = document.createElement('p')
  desc.textContent = item.desc

  card.append(icon, top, desc)
  wrap.append(card)

  // Small 3D tilt following the pointer
  if (!reduceMotion) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      card.style.setProperty('--ry', `${x * 12}deg`)
      card.style.setProperty('--rx', `${-y * 12}deg`)
    })
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    })
  }
  return wrap
}

function renderMenu(cat) {
  itemsEl.replaceChildren()
  MENU.filter((m) => cat === 'all' || m.cat === cat).forEach((m, i) => {
    const el = itemElement(m)
    el.style.transitionDelay = `${i * 60}ms`
    itemsEl.append(el)
    reveal(el)
  })
}

tabs.forEach((t) =>
  t.addEventListener('click', () => {
    tabs.forEach((x) => x.setAttribute('aria-selected', String(x === t)))
    renderMenu(t.dataset.cat)
  }),
)

document.querySelectorAll('.features .reveal').forEach(reveal)
reveal(document.getElementById('reserveForm'))
renderMenu('all')

/* Reservation (demo only — nothing is sent anywhere) */
const dateInput = document.getElementById('date')
dateInput.min = new Date().toISOString().split('T')[0]

document.getElementById('reserveForm').addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('name').value.trim()
  const guests = document.getElementById('guests').value
  const date = new Date(`${dateInput.value}T00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const confirm = document.getElementById('confirm')
  confirm.textContent = `Thanks ${name}! A table for ${guests} on ${date} is noted (demo — no real booking).`
  e.target.reset()
  document.getElementById('guests').value = '2'
})

document.getElementById('year').textContent = new Date().getFullYear()
