const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM donations');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});


router.get('/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount,
        payment_method,
        COUNT(*) as count_by_method
      FROM donations
      GROUP BY payment_method
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation summary' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM donations WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Donation not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { donor_name, amount, payment_method, transaction_ref, message, is_anonymous, user_id } = req.body;
    const [result] = await db.query(
      'INSERT INTO donations (donor_name, amount, payment_method, transaction_ref, message, is_anonymous, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [donor_name, amount, payment_method, transaction_ref, message, is_anonymous, user_id]
    );
    res.status(201).json({ message: 'Donation recorded', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record donation' });
  }
});

module.exports = router;