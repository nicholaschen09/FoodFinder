require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const { Client } = require('pg');

const app = express();

const googleKey = process.env.GOOGLE_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

// db connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err.stack));

app.use(express.json());
app.use(express.static('../public')); // Adjust the path if needed

// Endpoint to fetch nearby restaurants using the Google Places API
app.get('/restaurants', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }
  const radius = 1500; // in meters
  const type = 'restaurant';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${googleKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Google Places API error:', error);
    return res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Endpoint to generate an order using the OpenAI API
app.post('/order', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }
  
  const openaiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  const payload = {
    prompt: `Generate a restaurant order based on the following request: ${query}`,
    max_tokens: 50,
    temperature: 0.7
  };
  
  try {
    const response = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].text) {
      return res.json({ result: data.choices[0].text.trim() });
    } else {
      return res.status(500).json({ error: 'No completion received' });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ error: 'Failed to generate order' });
  }
});

module.exports = app;