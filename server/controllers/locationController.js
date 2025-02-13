const locationController = {};

/**
 * Receives and processes the user's location.
 * Expects req.body to contain:
 *  - lat: The latitude of the location.
 *  - lng: The longitude of the location.
 */
locationController.receiveLocation = (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }
  
  // Process the location as needed (ex: log analytics, update session, etc.)
  console.log(`Received location - Latitude: ${lat}, Longitude: ${lng}`);
  
  res.json({ status: 'Location received', lat, lng });
};

module.exports = locationController;