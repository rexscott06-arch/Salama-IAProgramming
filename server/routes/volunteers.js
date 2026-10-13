const express = require('express');
const router = express.Router();
const db = require('../db');

const VALID_ROLES = ['counsellor', 'legal', 'awareness', 'shelter', 'digital', 'transport'];
const VALID_AVAILABILITY = ['weekdays', 'weekends', 'both', 'flexible'];
const VALID_STATUSES = ['pending', 'approved', 'rejected'];

function mapVolunteer(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    county: row.county,
    role: row.role,
    availability: row.availability,
    experience: row.experience || null,
    motivation: row.motivation,
    status: row.status,
    created_at: row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at
  }
}

// GET all volunteers
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM volunteers');
    res.status(200).json(rows.map(mapVolunteer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

// GET single volunteer by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM volunteers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    res.status(200).json(mapVolunteer(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch volunteer' });
  }
});

// POST create new volunteer
router.post('/', async (req, res) => {
  const { name, email, phone, county, role, availability, experience, motivation } = req.body;

  // Validation
  if (!name || !email || !phone || !county || !role || !availability || !motivation) {
    return res.status(400).json({ error: 'name, email, phone, county, role, availability, and motivation are required' });
  }
  if (!VALID_ROLES.includes(role)) {
    return res.status(400).json({ error: `role must be one of: ${VALID_ROLES.join(', ')}` });
  }
  if (!VALID_AVAILABILITY.includes(availability)) {
    return res.status(400).json({ error: `availability must be one of: ${VALID_AVAILABILITY.join(', ')}` });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'email must be a valid email address' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO volunteers (name, email, phone, county, role, availability, experience, motivation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, county, role, availability, experience || null, motivation]
    );
    const [rows] = await db.query('SELECT * FROM volunteers WHERE id = ?', [result.insertId]);
    res.status(201).json(mapVolunteer(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit volunteer application' });
  }
});

// PATCH update volunteer status
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
    const [existing] = await db.query('SELECT id FROM volunteers WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    await db.query('UPDATE volunteers SET status = ? WHERE id = ?', [status, req.params.id]);
    const [rows] = await db.query('SELECT * FROM volunteers WHERE id = ?', [req.params.id]);
    res.status(200).json(mapVolunteer(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update volunteer status' });
  }
});

module.exports = router;