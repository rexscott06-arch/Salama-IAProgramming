import { useState, useEffect } from 'react';
import { apiRequest } from '../clientApi';

function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest('/api/donations')
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div>
      <p><strong>Total raised:</strong> KES {total.toLocaleString()}</p>
      <ul>
        {donations.map((d) => (
          <li key={d.id}>
            {d.is_anonymous ? 'Anonymous' : d.donor_name} — KES {Number(d.amount).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DonationsList;