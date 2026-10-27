const KEY = 'task-manager:v1'

const $ = (sel) => document.querySelector(sel)
const form = $('#form')
const input = $('#input')
const priority = $('#priority')
const list = $('#list')
const count = $('#count')
const clearBtn = $('#clear')
const ringFg = $('#ringFg')
const ringText = $('#ringText')
const filterButtons = document.querySelectorAll('.filters button')

let filter = 'all'
let tasks = load()

function seed() {
  return [
    { id: 1, text: 'Design the portfolio hero section', priority: 'high', done: true },
    { id: 2, text: 'Add 3D tilt cards', priority: 'medium', done: false },
    { id: 3, text: 'Deploy to GitHub Pages', priority: 'low', done: false },
  ]
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(raw) ? raw : seed()
  } catch {
    return seed()
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  } catch {
    /* storage may be unavailable (private mode) — the app still works in memory */
  }
}

function taskElement(t) {
  const li = document.createElement('li')
  li.className = `task${t.done ? ' done' : ''}`
  li.dataset.id = t.id

  const check = document.createElement('button')
  check.className = 'check'
  check.dataset.action = 'toggle'
  check.setAttribute('aria-label', t.done ? 'Mark as active' : 'Mark as done')
  check.textContent = t.done ? '✓' : ''

  const text = document.createElement('span')
  text.className = 'text'
  text.textContent = t.text

  const badge = document.createElement('span')
  badge.className = `badge ${t.priority}`
  badge.textContent = t.priority

  const del = document.createElement('button')
  del.className = 'del'
  del.dataset.action = 'delete'
  del.setAttribute('aria-label', 'Delete task')
  del.textContent = '✕'

  li.append(check, text, badge, del)
  return li
}

function render() {
  list.replaceChildren()

  const visible = tasks.filter((t) => filter === 'all' || (filter === 'active' ? !t.done : t.done))

  if (!visible.length) {
    const li = document.createElement('li')
    li.className = 'empty'
    li.textContent = 'Nothing here yet ✨'
    list.append(li)
  } else {
    visible.forEach((t) => list.append(taskElement(t)))
  }

  const done = tasks.filter((t) => t.done).length
  const active = tasks.length - done
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  ringFg.style.strokeDashoffset = 100 - pct
  ringText.textContent = `${pct}%`
  count.textContent = `${active} task${active === 1 ? '' : 's'} left`
  clearBtn.hidden = done === 0
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.unshift({ id: Date.now(), text, priority: priority.value, done: false })
  input.value = ''
  save()
  render()
})

list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]')
  if (!btn) return
  const id = Number(btn.closest('.task').dataset.id)

  if (btn.dataset.action === 'toggle') {
    const t = tasks.find((x) => x.id === id)
    if (t) t.done = !t.done
  } else {
    tasks = tasks.filter((x) => x.id !== id)
  }
  save()
  render()
})

filterButtons.forEach((b) =>
  b.addEventListener('click', () => {
    filter = b.dataset.filter
    filterButtons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    render()
  }),
)

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter((t) => !t.done)
  save()
  render()
})

render()
