const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM incidents');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM incidents WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Incident not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch incident' });
  }
});


// POST create new incident
router.post('/', async (req, res) => {
    try {
      const { case_ref, incident_type, incident_date, county, location, description, is_anonymous, user_id } = req.body;
      const [result] = await db.query(
        'INSERT INTO incidents (case_ref, incident_type, incident_date, county, location, description, is_anonymous, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [case_ref, incident_type, incident_date, county, location, description, is_anonymous, user_id]
      );
      res.status(201).json({ message: 'Incident created', id: result.insertId });
    } catch (err) {
      console.error('FULL ERROR:', err);
      res.status(500).json({ error: 'Failed to create incident', details: err.message });
    }
  });


router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await db.query(
      'UPDATE incidents SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ message: 'Incident status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update incident' });
  }
});

module.exports = router;