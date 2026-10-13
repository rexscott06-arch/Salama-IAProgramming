const express = require('express');
const router = express.Router();
const db = require('../db');

const VALID_PAYMENT_METHODS = ['mpesa', 'card', 'bank'];

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
    const [rows] = await db.query('SELECT * FROM donations WHERE id = ?', [req.params.id]);
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
  const { donor_name, amount, payment_method, transaction_ref, message, is_anonymous, user_id } = req.body;

  // Validation
  if (!amount || !payment_method || !transaction_ref) {
    return res.status(400).json({ error: 'amount, payment_method, and transaction_ref are required' });
  }
  if (!VALID_PAYMENT_METHODS.includes(payment_method)) {
    return res.status(400).json({ error: `payment_method must be one of: ${VALID_PAYMENT_METHODS.join(', ')}` });
  }
  if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO donations (donor_name, amount, payment_method, transaction_ref, message, is_anonymous, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [donor_name || null, parseFloat(amount), payment_method, transaction_ref, message || null, is_anonymous || false, user_id || null]
    );
    const [rows] = await db.query('SELECT * FROM donations WHERE id = ?', [result.insertId]);
    res.status(201).json(mapDonation(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record donation' });
  }
});

module.exports = router;