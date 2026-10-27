const $ = (sel) => document.querySelector(sel)
const fmtNum = new Intl.NumberFormat('en-US')
const fmtMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

/* ---------- Deterministic sample data (same numbers on every load) ---------- */
function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const TOTAL_DAYS = 180
const rand = rng(2026)
const base = []
let v = 1500
for (let i = 0; i < TOTAL_DAYS; i++) {
  v += (rand() - 0.4) * 160 + Math.sin(i / 6) * 30
  v = Math.max(500, v)
  base.push(Math.round(v))
}

const today = new Date()
const labelFor = (index) => {
  const d = new Date(today)
  d.setDate(today.getDate() - (TOTAL_DAYS - 1 - index))
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const sum = (arr) => arr.reduce((a, b) => a + b, 0)

function metrics(from, to) {
  const slice = base.slice(from, to)
  const revenue = sum(slice)
  const orders = Math.round(revenue / 62)
  const conv = 3 + ((revenue % 97) / 97) * 2
  const visitors = Math.round(orders / (conv / 100))
  return { revenue, orders, visitors, conv }
}

const SOURCES = [
  { name: 'Organic search', pct: 42 },
  { name: 'Direct', pct: 27 },
  { name: 'Social media', pct: 18 },
  { name: 'Referral', pct: 13 },
]

const ORDERS = [
  { who: 'Olivia Martin', item: 'Pro plan · yearly', amount: 480, status: 'paid' },
  { who: 'Noah Bennett', item: 'Starter plan', amount: 29, status: 'pending' },
  { who: 'Emma Clarke', item: 'Team plan · 5 seats', amount: 245, status: 'paid' },
  { who: 'Liam Foster', item: 'Pro plan · monthly', amount: 49, status: 'refunded' },
  { who: 'Sophia Reyes', item: 'Enterprise add-on', amount: 900, status: 'paid' },
]

/* ---------- KPI cards with animated counters ---------- */
const KPI_DEFS = [
  { key: 'revenue', label: 'Revenue', fmt: (n) => fmtMoney.format(n) },
  { key: 'orders', label: 'Orders', fmt: (n) => fmtNum.format(Math.round(n)) },
  { key: 'visitors', label: 'Visitors', fmt: (n) => fmtNum.format(Math.round(n)) },
  { key: 'conv', label: 'Conversion', fmt: (n) => `${n.toFixed(2)}%` },
]

const kpisEl = $('#kpis')
KPI_DEFS.forEach((k) => {
  const card = document.createElement('div')
  card.className = 'kpi'
  card.innerHTML = '<div class="kpi__label"></div><div class="kpi__value">0</div><div class="kpi__delta"></div>'
  card.querySelector('.kpi__label').textContent = k.label
  kpisEl.append(card)
  k.el = card
  k.current = 0
})

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function countTo(def, target) {
  const valueEl = def.el.querySelector('.kpi__value')
  const start = def.current
  const t0 = performance.now()
  const duration = reduceMotion ? 0 : 800

  const step = (now) => {
    const p = duration ? Math.min((now - t0) / duration, 1) : 1
    const eased = 1 - Math.pow(1 - p, 3)
    valueEl.textContent = def.fmt(start + (target - start) * eased)
    if (p < 1) requestAnimationFrame(step)
  }
  def.current = target
  requestAnimationFrame(step)
}

function renderKpis(range) {
  const cur = metrics(TOTAL_DAYS - range, TOTAL_DAYS)
  const prev = metrics(TOTAL_DAYS - range * 2, TOTAL_DAYS - range)

  KPI_DEFS.forEach((k) => {
    countTo(k, cur[k.key])
    const delta = ((cur[k.key] - prev[k.key]) / prev[k.key]) * 100
    const el = k.el.querySelector('.kpi__delta')
    const up = delta >= 0
    el.className = `kpi__delta ${up ? 'up' : 'down'}`
    el.textContent = `${up ? '▲' : '▼'} ${Math.abs(delta).toFixed(1)}% vs previous period`
  })
}

/* ---------- Line chart (plain SVG) ---------- */
const svg = $('#chart')
const tip = $('#tip')
const W = 720
const H = 260
const pad = { l: 46, r: 14, t: 14, b: 28 }

function renderChart(range) {
  const offset = TOTAL_DAYS - range
  const data = base.slice(offset)
  const n = data.length
  const max = Math.max(...data) * 1.06
  const min = Math.min(...data) * 0.9

  const x = (i) => pad.l + (i / (n - 1)) * (W - pad.l - pad.r)
  const y = (val) => pad.t + (1 - (val - min) / (max - min)) * (H - pad.t - pad.b)

  let d = `M${x(0)},${y(data[0])}`
  for (let i = 1; i < n; i++) {
    const cx = (x(i - 1) + x(i)) / 2
    d += ` C${cx},${y(data[i - 1])} ${cx},${y(data[i])} ${x(i)},${y(data[i])}`
  }
  const area = `${d} L${x(n - 1)},${H - pad.b} L${x(0)},${H - pad.b} Z`

  let grid = ''
  for (let g = 0; g <= 4; g++) {
    const val = min + ((max - min) * g) / 4
    const gy = y(val)
    grid += `<line class="grid-line" x1="${pad.l}" x2="${W - pad.r}" y1="${gy}" y2="${gy}"/>`
    grid += `<text class="axis" x="${pad.l - 8}" y="${gy + 4}" text-anchor="end">$${(val / 1000).toFixed(1)}k</text>`
  }
  for (let l = 0; l < 5; l++) {
    const idx = Math.round((l / 4) * (n - 1))
    grid += `<text class="axis" x="${x(idx)}" y="${H - 8}" text-anchor="middle">${labelFor(offset + idx)}</text>`
  }

  svg.innerHTML = `
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6c7bff" stop-opacity=".35"/>
        <stop offset="1" stop-color="#6c7bff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${grid}
    <path class="area" d="${area}" fill="url(#areaGrad)"/>
    <path class="line" d="${d}" pathLength="1"/>
    <line class="guide" id="guide" y1="${pad.t}" y2="${H - pad.b}" visibility="hidden"/>
    <circle class="dot" id="dot" r="6" visibility="hidden"/>
  `

  const guide = $('#guide')
  const dot = $('#dot')

  svg.onpointermove = (e) => {
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const idx = Math.max(0, Math.min(n - 1, Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (n - 1))))
    const cx = x(idx)
    const cy = y(data[idx])

    guide.setAttribute('x1', cx)
    guide.setAttribute('x2', cx)
    dot.setAttribute('cx', cx)
    dot.setAttribute('cy', cy)
    guide.setAttribute('visibility', 'visible')
    dot.setAttribute('visibility', 'visible')

    tip.hidden = false
    tip.style.left = `${(cx / W) * rect.width}px`
    tip.style.top = `${(cy / H) * rect.height}px`
    tip.replaceChildren()
    const strong = document.createElement('b')
    strong.textContent = fmtMoney.format(data[idx])
    tip.append(strong, document.createTextNode(labelFor(offset + idx)))
  }

  svg.onpointerleave = () => {
    guide.setAttribute('visibility', 'hidden')
    dot.setAttribute('visibility', 'hidden')
    tip.hidden = true
  }
}

/* ---------- Sources + orders ---------- */
function renderSources() {
  const root = $('#sources')
  root.replaceChildren()
  SOURCES.forEach((s) => {
    const row = document.createElement('div')
    const label = document.createElement('div')
    label.className = 'src__row'
    const name = document.createElement('span')
    name.textContent = s.name
    const pct = document.createElement('span')
    pct.textContent = `${s.pct}%`
    label.append(name, pct)

    const bar = document.createElement('div')
    bar.className = 'bar'
    const fill = document.createElement('span')
    bar.append(fill)

    row.append(label, bar)
    root.append(row)
    requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.width = `${s.pct * 2}%`)))
  })
}

function renderOrders() {
  const body = $('#orders')
  ORDERS.forEach((o) => {
    const tr = document.createElement('tr')
    const cells = [o.who, o.item, fmtMoney.format(o.amount)]
    cells.forEach((text) => {
      const td = document.createElement('td')
      td.textContent = text
      tr.append(td)
    })
    const td = document.createElement('td')
    const pill = document.createElement('span')
    pill.className = `pill ${o.status}`
    pill.textContent = o.status[0].toUpperCase() + o.status.slice(1)
    td.append(pill)
    tr.append(td)
    body.append(tr)
  })
}

/* ---------- Range switcher ---------- */
const rangeButtons = document.querySelectorAll('.range button')

function setRange(range) {
  rangeButtons.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.range) === range)))
  renderKpis(range)
  renderChart(range)
}

rangeButtons.forEach((b) => b.addEventListener('click', () => setRange(Number(b.dataset.range))))

renderSources()
renderOrders()
setRange(30)
