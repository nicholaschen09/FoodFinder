const { Client } = require('pg');
require('dotenv').config();

// Create a PostgreSQL client for analytics operations.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL from analytics model'))
  .catch(err => console.error('Connection error', err.stack));

/**
 * Inserts a new order record into the orders table.
 * @param {string} query - The user query.
 * @param {string} result - The AI-generated order result.
 * @param {number} lat - Latitude of the location.
 * @param {number} lng - Longitude of the location.
 * @returns {Promise<Object>} - The inserted order record.
 */
async function createOrder(query, result, lat, lng) {
  const sql = 'INSERT INTO orders (query, result, lat, lng) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [query, result, lat, lng];
  try {
    const res = await client.query(sql, values);
    return res.rows[0];
  } catch (err) {
    console.error('Error inserting order:', err);
    throw err;
  }
}

/**
 * Fetches order analytics records.
 * @param {number} [limit=100] - The maximum number of records to retrieve.
 * @returns {Promise<Array>} - An array of order records.
 */
async function getOrders(limit = 100) {
  const sql = 'SELECT * FROM orders ORDER BY created_at DESC LIMIT $1';
  try {
    const res = await client.query(sql, [limit]);
    return res.rows;
  } catch (err) {
    console.error('Error fetching orders:', err);
    throw err;
  }
}

module.exports = { createOrder, getOrders };