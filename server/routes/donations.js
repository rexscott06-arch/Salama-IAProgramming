const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to map a row to contract shape
function mapDonation(row) {
  return {
    id: row.id,
    donor_name: row.donor_name || null,
    amount: row.amount !== null ? parseFloat(row.amount) : null,
    payment_method: row.payment_method,
    transaction_ref: row.transaction_ref,
    message: row.message || null,
    is_anonymous: row.is_anonymous === 1 || row.is_anonymous === true,
    user_id: row.user_id || null,
    created_at: row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at
  }
}

// GET all donations
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM donations');
    res.status(200).json(rows.map(mapDonation));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// GET donation summary
router.get('/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        payment_method,
        COUNT(*) as total_donations,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount
      FROM donations
      GROUP BY payment_method
    `);
    const mapped = rows.map(row => ({
      payment_method: row.payment_method,
      total_donations: parseInt(row.total_donations),
      total_amount: row.total_amount !== null ? parseFloat(row.total_amount) : null,
      average_amount: row.average_amount !== null ? parseFloat(row.average_amount) : null,
    }));
    res.status(200).json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation summary' });
  }
});

// GET single donation by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM donations WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.status(200).json(mapDonation(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// POST create new donation
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