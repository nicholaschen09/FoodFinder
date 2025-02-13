const express = require('express');
const router = express.Router();

// Endpoint to receive and process user's location
router.post('/', (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }
  
  // Process the location as needed (e.g., log analytics, update user session, etc.)
  console.log(`Received location - Latitude: ${lat}, Longitude: ${lng}`);
  
  return res.json({ status: 'Location received', lat, lng });
});

module.exports = router;