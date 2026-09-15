const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM volunteers');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM volunteers WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Volunteer not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch volunteer' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, email, phone, county, role, availability, experience, motivation } = req.body;
    const [result] = await db.query(
      'INSERT INTO volunteers (name, email, phone, county, role, availability, experience, motivation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, county, role, availability, experience, motivation]
    );
    res.status(201).json({ message: 'Volunteer application submitted', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit volunteer application' });
  }
});


router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await db.query(
      'UPDATE volunteers SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ message: 'Volunteer status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update volunteer status' });
  }
});

module.exports = router;