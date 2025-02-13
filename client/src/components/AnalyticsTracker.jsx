import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsTracker = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/analytics`);
        setAnalytics(response.data);
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p>Loading analytics data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Analytics Tracker</h2>
      {analytics.length === 0 ? (
        <p>No analytics data available.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Query</th>
              <th>Result</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.query}</td>
                <td>{record.result}</td>
                <td>{record.lat}</td>
                <td>{record.lng}</td>
                <td>{new Date(record.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AnalyticsTracker;