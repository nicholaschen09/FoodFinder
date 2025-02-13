const { generateOrder } = require('../services/openAiService');
const { createOrder } = require('../models/analyticsModel');

const orderController = {};

/**
 * Handles the creation of an order.
 * Expects req.body to contain:
 * - query: The user's order request text.
 * - lat: (Optional) The latitude of the user's location.
 * - lng: (Optional) The longitude of the user's location.
 */
orderController.createOrder = async (req, res) => {
  const { query, lat, lng } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }
  
  try {
    // Generate the AI order using OpenAI service
    const orderResult = await generateOrder(query, process.env.OPENAI_API_KEY);
    
    // Log analytics data if location coordinates are provided
    if (lat && lng) {
      await createOrder(query, orderResult, lat, lng);
    }
    
    return res.json({ result: orderResult });
  } catch (error) {
    console.error('Error in orderController.createOrder:', error);
    return res.status(500).json({ error: 'Failed to process order' });
  }
};

module.exports = orderController;