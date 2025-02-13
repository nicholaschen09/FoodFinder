import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [orderQuery, setOrderQuery] = useState('');
  const [orderResult, setOrderResult] = useState('');

  // Get user's location and fetch restaurants
  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/restaurants`,
            { params: { lat, lng } }
          );
          setRestaurants(response.data.results || []);
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Submit order request
  const handleOrder = async () => {
    try {
      const payload = {
        query: orderQuery,
        lat: location?.lat,
        lng: location?.lng
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order`,
        payload
      );
      setOrderResult(response.data.result);
    } catch (error) {
      console.error('Error generating order:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Food Finder</h1>
      <button onClick={handleLocate}>Locate Me</button>
      {location && (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
      
      <h2>Nearby Restaurants</h2>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index}>{restaurant.name}</li>
        ))}
      </ul>
      
      <h2>Place Order</h2>
      <input
        type="text"
        value={orderQuery}
        placeholder="Describe what you'd like to order"
        onChange={(e) => setOrderQuery(e.target.value)}
      />
      <button onClick={handleOrder}>Submit Order</button>
      
      {orderResult && (
        <div>
          <h3>Order Result:</h3>
          <p>{orderResult}</p>
        </div>
      )}
    </div>
  );
}

export default App;