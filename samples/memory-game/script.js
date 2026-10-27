const EMOJI = ['🚀', '🎧', '🌵', '🔥', '🎲', '🦊', '🍕', '⚡']
const BEST_KEY = 'memory-match:best-moves'

const board = document.getElementById('board')
const movesEl = document.getElementById('moves')
const timeEl = document.getElementById('time')
const bestEl = document.getElementById('best')
const win = document.getElementById('win')
const winText = document.getElementById('winText')

let first = null
let lock = false
let moves = 0
let matched = 0
let seconds = 0
let timer = null

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function readBest() {
  try {
    const v = Number(localStorage.getItem(BEST_KEY))
    return v > 0 ? v : null
  } catch {
    return null
  }
}

function writeBest(v) {
  try {
    localStorage.setItem(BEST_KEY, String(v))
  } catch {
    /* ignore — storage unavailable */
  }
}

const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function stopTimer() {
  clearInterval(timer)
  timer = null
}

function startTimer() {
  if (timer) return
  timer = setInterval(() => {
    seconds++
    timeEl.textContent = formatTime(seconds)
  }, 1000)
}

function createCard(symbol) {
  const card = document.createElement('div')
  card.className = 'card'
  card.dataset.value = symbol
  card.tabIndex = 0
  card.setAttribute('role', 'button')
  card.setAttribute('aria-label', 'Hidden card')

  const front = document.createElement('div')
  front.className = 'face front'
  const back = document.createElement('div')
  back.className = 'face back'
  back.textContent = symbol
  card.append(front, back)

  card.addEventListener('click', () => flip(card))
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      flip(card)
    }
  })
  return card
}

function reveal(card) {
  card.classList.add('flipped')
  card.setAttribute('aria-label', `Card ${card.dataset.value}`)
}

function hide(card) {
  card.classList.remove('flipped')
  card.setAttribute('aria-label', 'Hidden card')
}

function flip(card) {
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return

  startTimer()
  reveal(card)

  if (!first) {
    first = card
    return
  }

  const a = first
  first = null
  moves++
  movesEl.textContent = moves

  if (a.dataset.value === card.dataset.value) {
    a.classList.add('matched')
    card.classList.add('matched')
    matched += 2
    if (matched === EMOJI.length * 2) finish()
  } else {
    lock = true
    setTimeout(() => {
      hide(a)
      hide(card)
      lock = false
    }, 800)
  }
}

function finish() {
  stopTimer()
  const best = readBest()
  let message = `${moves} moves in ${formatTime(seconds)}.`
  if (!best || moves < best) {
    writeBest(moves)
    bestEl.textContent = moves
    message += ' New best score!'
  }
  winText.textContent = message
  setTimeout(() => {
    win.hidden = false
    document.getElementById('again').focus()
  }, 600)
}

function newGame() {
  stopTimer()
  win.hidden = true
  first = null
  lock = false
  moves = 0
  matched = 0
  seconds = 0
  movesEl.textContent = '0'
  timeEl.textContent = '0:00'
  const best = readBest()
  bestEl.textContent = best ?? '–'

  board.replaceChildren(...shuffle([...EMOJI, ...EMOJI]).map(createCard))
}

document.getElementById('restart').addEventListener('click', newGame)
document.getElementById('again').addEventListener('click', newGame)

newGame()
