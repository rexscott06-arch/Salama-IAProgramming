const express = require('express');
const router = express.Router();
const db = require('../db');

const VALID_TYPES = ['hotline', 'shelter', 'legal', 'medical', 'mental-health'];

function mapResource(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    county: row.county,
    description: row.description,
    contact: row.contact,
    available: row.available,
    created_at: row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at
  }
}

router.get('/', async (req, res) => {
  try {
    const { county, type } = req.query;
    let query = 'SELECT * FROM resources WHERE 1=1';
    const params = [];
    if (county && county !== 'all') {
      query += ' AND (county = ? OR county = "all")';
      params.push(county);
    }
    if (type && type !== 'all') {
      query += ' AND type = ?';
      params.push(type);
    }
    const [rows] = await db.query(query, params);
    res.status(200).json(rows.map(mapResource));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Resource not found' });
    res.status(200).json(mapResource(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

router.post('/', async (req, res) => {
  const { name, type, county, description, contact, available } = req.body;

  if (!name || !type || !county || !description || !contact || !available) {
    return res.status(400).json({ error: 'name, type, county, description, contact, and available are required' });
  }
  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ error: `type must be one of: ${VALID_TYPES.join(', ')}` });
  }
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'name must be a non-empty string' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO resources (name, type, county, description, contact, available) VALUES (?, ?, ?, ?, ?, ?)',
      [name, type, county, description, contact, available]
    );
    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [result.insertId]);
    res.status(201).json(mapResource(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

module.exports = router;
