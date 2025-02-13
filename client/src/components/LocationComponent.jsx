import React from 'react';

const LocationComponent = ({ location }) => {
  if (!location) {
    return <p>No location available. Please click "Locate Me".</p>;
  }

  return (
    <div>
      <h2>Your Location</h2>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
};

export default LocationComponent;