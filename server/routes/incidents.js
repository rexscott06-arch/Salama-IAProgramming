const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to map a row to contract shape
function mapIncident(row) {
  return {
    id: row.id,
    case_ref: row.case_ref,
    incident_type: row.incident_type,
    incident_date: row.incident_date instanceof Date
      ? row.incident_date.toISOString().split('T')[0]
      : row.incident_date,
    county: row.county,
    location: row.location || null,
    description: row.description,
    status: row.status,
    is_anonymous: row.is_anonymous === 1 || row.is_anonymous === true,
    user_id: row.user_id || null,
    created_at: row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at
  }
}

// GET all incidents
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM incidents');
    res.status(200).json(rows.map(mapIncident));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// GET single incident by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM incidents WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.status(200).json(mapIncident(rows[0]));
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

// PATCH update incident status
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