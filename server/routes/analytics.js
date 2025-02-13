const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const router = express.Router();

// Create a Postgres client for analytics queries.
// You might consider reusing a shared DB client for production use.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL for analytics'))
  .catch(err => console.error('Analytics connection error', err.stack));

// GET endpoint to fetch the latest 100 analytics records
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

module.exports = router;