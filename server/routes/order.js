const express = require('express');
const router = express.Router();

const { generateOrder } = require('../services/openAiService');
const { logOrder } = require('../services/analyticsService');

router.post('/', async (req, res) => {
  const { query, lat, lng } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    // Generate the AI order using OpenAI service
    const orderResult = await generateOrder(query, process.env.OPENAI_API_KEY);
    
    // Log the analytics data if latitude and longitude are provided
    if (lat && lng) {
      await logOrder(query, orderResult, lat, lng);
    }
    
    return res.json({ result: orderResult });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ error: 'Failed to generate order' });
  }
});

module.exports = router;