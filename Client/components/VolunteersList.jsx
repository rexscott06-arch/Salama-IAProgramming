import { useState, useEffect } from 'react';
import { apiRequest } from '../clientApi';

function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest('/api/volunteers')
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading volunteers...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (volunteers.length === 0) return <p>No volunteers yet.</p>;

  return (
    <ul className="volunteers-list">
      {volunteers.map((v) => (
        <li key={v.id}>
          <strong>{v.name}</strong> — {v.role} in {v.county}
          <span> ({v.status})</span>
        </li>
      ))}
    </ul>
  );
}

export default VolunteersList;