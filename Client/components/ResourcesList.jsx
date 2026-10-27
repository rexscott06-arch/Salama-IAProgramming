import { useState, useEffect } from 'react';
import { apiRequest } from '../clientApi';

function ResourcesList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest('/api/resources')
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading resources...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (resources.length === 0) return <p>No resources found.</p>;

  return (
    <div className="resources-grid">
      {resources.map((r) => (
        <div key={r.id} className="resource-card">
          <h3>{r.name}</h3>
          <p><strong>Type:</strong> {r.type}</p>
          <p><strong>County:</strong> {r.county}</p>
          <p>{r.description}</p>
          <p><strong>Contact:</strong> {r.contact}</p>
          <p>{r.available || 'Availability not specified'}</p>
        </div>
      ))}
    </div>
  );
}

export default ResourcesList;