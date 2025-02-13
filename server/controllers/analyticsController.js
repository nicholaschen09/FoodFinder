const { getOrders } = require('../models/analyticsModel');

const analyticsController = {};

/**
 * Retrieves the most recent analytics records.
 * You can adjust the limit (default is 100).
 */
analyticsController.getAnalytics = async (req, res) => {
  try {
    const orders = await getOrders(100);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
};

module.exports = analyticsController;