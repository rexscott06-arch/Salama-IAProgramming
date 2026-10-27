const express = require('express');
const router = express.Router();
const db = require('../db');


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
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM resources WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Resource not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, type, county, description, contact, available } = req.body;
    const [result] = await db.query(
      'INSERT INTO resources (name, type, county, description, contact, available) VALUES (?, ?, ?, ?, ?, ?)',
      [name, type, county, description, contact, available]
    );
    res.status(201).json({ message: 'Resource created', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

module.exports = router;