import React from 'react';

const RestaurantList = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={restaurant.place_id || index}>
            {restaurant.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;