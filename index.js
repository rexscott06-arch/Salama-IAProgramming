const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// --- API Key Auth ---
const VALID_KEYS = (process.env.API_KEYS || '').split(',').filter(Boolean)
console.log(`Loaded ${VALID_KEYS.length} API key(s)`)

function requireApiKey(req, res, next) {
  const key = req.get('X-API-Key')
  if (!key || !VALID_KEYS.includes(key)) {
    return res.status(401).json({ message: 'Missing or invalid API key' })
  }
  req.apiKey = key
  next()
}

// --- Rate Limiting ---
function rateLimit({ windowMs, max }) {
  const hits = new Map()
  return (req, res, next) => {
    const id = req.apiKey || req.ip
    const now = Date.now()
    let entry = hits.get(id)
    if (!entry || now >= entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs }
      hits.set(id, entry)
    }
    entry.count += 1
    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      res.set('Retry-After', String(retryAfter))
      return res.status(429).json({ message: 'Too many requests', retryAfter })
    }
    next()
  }
}

app.use(cors())
app.use(express.json())

// --- Swagger UI (open, no key needed) ---
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8')
)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// --- Health check (open, no key needed) ---
app.get('/', (req, res) => {
  res.send('Salama API is running')
})

// --- Apply auth + rate limiting to all API routes ---
app.use(requireApiKey)
app.use(rateLimit({ windowMs: 60000, max: 100 }))

// --- Routes ---
const userRoutes = require('./routes/users')
const incidentRoutes = require('./routes/incidents')
const resourceRoutes = require('./routes/resources')
const donationRoutes = require('./routes/donations')
const volunteerRoutes = require('./routes/volunteers')

app.use('/api/users', userRoutes)
app.use('/api/incidents', incidentRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/partner', require('./routes/partner'))

app.listen(PORT, () => {
  console.log(`Salama server running on http://localhost:${PORT}`)
})
