const express = require('express');
const router = express.Router();
const db = require('../db');

const VALID_TYPES = ['physical', 'sexual', 'emotional', 'economic', 'other'];
const VALID_STATUSES = ['open', 'in_review', 'closed'];

function getDatabaseErrorMessage(err, fallback) {
  switch (err.code) {
    case 'ER_ACCESS_DENIED_ERROR':
      return 'Database authentication failed. Check DB_USER and DB_PASSWORD in server/.env.';
    case 'ECONNREFUSED':
      return 'Could not connect to MySQL. Make sure the MySQL server is running.';
    case 'ENOTFOUND':
      return 'Could not find the MySQL host configured by DB_HOST.';
    case 'ER_BAD_DB_ERROR':
      return 'The database configured by DB_NAME does not exist.';
    case 'ER_NO_SUCH_TABLE':
      return 'The incidents table does not exist in the configured database.';
    default:
      return fallback;
  }
}

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
    console.error('Failed to fetch incidents:', err);
    res.status(503).json({
      error: getDatabaseErrorMessage(err, 'Failed to fetch incidents')
    });
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
    console.error('Failed to fetch incident:', err);
    res.status(503).json({
      error: getDatabaseErrorMessage(err, 'Failed to fetch incident')
    });
  }
});

// POST create new incident
router.post('/', async (req, res) => {
  const { case_ref, incident_type, incident_date, county, location, description, is_anonymous, user_id } = req.body;

  // Validation
  if (!case_ref || !incident_type || !incident_date || !county || !description) {
    return res.status(400).json({ error: 'case_ref, incident_type, incident_date, county, and description are required' });
  }
  if (!VALID_TYPES.includes(incident_type)) {
    return res.status(400).json({ error: `incident_type must be one of: ${VALID_TYPES.join(', ')}` });
  }
  const parsedIncidentDate = typeof incident_date === 'string'
    ? new Date(`${incident_date}T00:00:00.000Z`)
    : null;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(incident_date) ||
    !parsedIncidentDate ||
    Number.isNaN(parsedIncidentDate.valueOf()) ||
    parsedIncidentDate.toISOString().slice(0, 10) !== incident_date
  ) {
    return res.status(400).json({ error: 'incident_date must be a valid date (YYYY-MM-DD)' });
  }
  if (is_anonymous !== undefined && typeof is_anonymous !== 'boolean') {
    return res.status(400).json({ error: 'is_anonymous must be a boolean' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO incidents (case_ref, incident_type, incident_date, county, location, description, is_anonymous, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [case_ref, incident_type, incident_date, county, location || null, description, is_anonymous ?? true, user_id || null]
    );
    const [rows] = await db.query('SELECT * FROM incidents WHERE id = ?', [result.insertId]);
    res.status(201).json(mapIncident(rows[0]));
  } catch (err) {
    console.error('Failed to create incident:', err);
    res.status(503).json({
      error: getDatabaseErrorMessage(err, 'Failed to create incident')
    });
  }
});

// PATCH update incident status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;

  // Validation
  if (!status) {
    return res.status(400).json({ error: 'status is required' });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const [existing] = await db.query('SELECT id FROM incidents WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    await db.query('UPDATE incidents SET status = ? WHERE id = ?', [status, req.params.id]);
    res.status(200).json({ message: 'Incident status updated' });
  } catch (err) {
    console.error('Failed to update incident status:', err);
    res.status(503).json({
      error: getDatabaseErrorMessage(err, 'Failed to update incident status')
    });
  }
});

module.exports = router;