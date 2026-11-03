const express = require('express')
const router = express.Router()
const { fetchWithRetry } = require('../resilientFetch')

let lastGood = null

router.get('/memorials', async (req, res) => {
  const PARTNER_URL = process.env.PARTNER_URL
  try {
    const r = await fetchWithRetry(
      PARTNER_URL + '/memorial-events',
      {},
      { timeoutMs: 1500, retries: 2, delayMs: 200 }
    )
    if (!r.ok) throw new Error('partner returned ' + r.status)
    const data = await r.json()
    lastGood = { data, asOf: new Date().toISOString() }
    return res.json({ data, stale: false, asOf: lastGood.asOf })
  } catch (err) {
    const reason = err.name === 'TimeoutError' ? 'timeout' : (err.cause?.code || err.message)
    console.error('partner call failed:', reason)
    if (lastGood) {
      return res.json({ data: lastGood.data, stale: true, asOf: lastGood.asOf })
    }
    return res.status(502).json({ message: 'Partner data unavailable' })
  }
})

router.post('/awareness-activities', async (req, res) => {
  const PARTNER_URL = process.env.PARTNER_URL
  try {
    const response = await fetch(PARTNER_URL + '/awareness-activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(3000),
    })
    if (!response.ok) {
      console.error('partner returned', response.status)
      return res.status(502).json({ message: 'Partner data unavailable' })
    }
    const result = await response.json()
    res.status(201).json(result)
  } catch (err) {
    const reason = err.name === 'TimeoutError' ? 'timeout' : (err.cause?.code || err.message)
    console.error('partner call failed:', reason)
    res.status(502).json({ message: 'Partner data unavailable' })
  }
})

module.exports = router
