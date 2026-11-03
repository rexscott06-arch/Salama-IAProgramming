const express = require('express')
const app = express()
let mode = 'ok'
let calls = 0

const events = [
  { id: 1, memorialId: 1, eventName: 'Funeral Service', date: '2026-11-10', location: 'Muhoroni Catholic Church' },
  { id: 2, memorialId: 2, eventName: 'Funeral Service', date: '2026-11-15', location: 'Kisumu Holy Family Basilica' }
]

app.get('/__mode/:m', (req, res) => {
  mode = req.params.m
  calls = 0
  res.json({ mode })
})

app.get('/memorial-events', async (req, res) => {
  calls += 1
  console.log('GET /memorial-events (call ' + calls + ', mode ' + mode + ')')
  if (mode === 'slow') {
    await new Promise(r => setTimeout(r, 10000))
  }
  if (mode === 'flaky' && calls % 3 !== 0) {
    return res.status(503).json({ message: 'Try again' })
  }
  if (mode === 'error') {
    return res.status(500).json({ message: 'Internal error' })
  }
  res.json(events)
})

app.listen(4000, () => console.log('Stand-in partner on http://localhost:4000'))
