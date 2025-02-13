const fetch = require('node-fetch');

async function fetchRestaurants(lat, lng, googleKey) {
  const radius = 1500; // in meters
  const type = 'restaurant';
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${googleKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error_message) {
      throw new Error(data.error_message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

module.exports = { fetchRestaurants };