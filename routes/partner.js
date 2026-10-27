const express = require('express');
const router = express.Router();

const PARTNER_URL = process.env.PARTNER_URL;

// GET /api/partner/memorials — fetch memorial events from Faraja
router.get('/memorials', async (req, res) => {
  try {
    const response = await fetch(`${PARTNER_URL}/memorial-events`);
    if (!response.ok) {
      console.error('Faraja returned', response.status);
      return res.status(502).json({ error: 'Partner data unavailable' });
    }
    const events = await response.json();
    res.json(events);
  } catch (err) {
    console.error('Faraja call failed:', err.message);
    res.status(502).json({ error: 'Partner data unavailable' });
  }
});

// POST /api/partner/awareness-activities — submit awareness activity to Faraja
router.post('/awareness-activities', async (req, res) => {
  try {
    const response = await fetch(`${PARTNER_URL}/awareness-activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    if (!response.ok) {
      console.error('Faraja returned', response.status);
      return res.status(502).json({ error: 'Partner data unavailable' });
    }
    const result = await response.json();
    res.status(201).json(result);
  } catch (err) {
    console.error('Faraja call failed:', err.message);
    res.status(502).json({ error: 'Partner data unavailable' });
  }
});

module.exports = router;
