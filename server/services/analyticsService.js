const { Client } = require('pg');

// Create a dedicated client for analytics.
// (Optionally, you can export a shared client from a separate db.js module.)
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Analytics: Connected to PostgreSQL'))
  .catch(err => console.error('Analytics connection error', err.stack));

/**
 * Logs order analytics data.
 * @param {string} query - The user query.
 * @param {string} result - The AI-generated order result.
 * @param {number} lat - The latitude from the user's location.
 * @param {number} lng - The longitude from the user's location.
 */
async function logOrder(query, result, lat, lng) {
  const sql = 'INSERT INTO orders(query, result, lat, lng) VALUES($1, $2, $3, $4)';
  const values = [query, result, lat, lng];
  try {
    await client.query(sql, values);
    console.log('Order analytics logged successfully');
  } catch (error) {
    console.error('Error logging order analytics:', error);
    throw error;
  }
}

module.exports = { logOrder };