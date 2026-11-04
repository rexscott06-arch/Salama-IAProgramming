import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './ResourcesPage.css'

function ResourcesPage() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    const url = new URL('http://localhost:5001/api/resources')
    if (selectedCounty !== 'all') url.searchParams.append('county', selectedCounty)
    if (selectedType !== 'all') url.searchParams.append('type', selectedType)

    setLoading(true)
    fetch(url, { headers: { 'X-API-Key': import.meta.env.VITE_API_KEY } })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch resources')
        return res.json()
      })
      .then((data) => {
        setResources(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [selectedCounty, selectedType])

  return (
    <PageTransition>
      <div className="resources-page">
        <div className="resources-hero">
          <div className="resources-badge">Pata Rasilimali — Find Resources</div>
          <h1>Find Support Near You</h1>
          <p>Shelters, hotlines, legal aid, medical care, and mental health services across Kenya.</p>
        </div>

        <div className="resources-filters">
          <div className="filter-group">
            <label>Filter by County</label>
            <select onChange={(e) => setSelectedCounty(e.target.value)} value={selectedCounty}>
              <option value="all">All Counties</option>
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by Type</label>
            <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
              <option value="all">All Types</option>
              <option value="hotline">Hotlines</option>
              <option value="shelter">Shelters</option>
              <option value="legal">Legal Aid</option>
              <option value="medical">Medical Care</option>
              <option value="mental-health">Mental Health</option>
            </select>
          </div>
          <div className="filter-count">
            {loading ? 'Loading...' : `Showing ${resources.length} resource${resources.length !== 1 ? 's' : ''}`}
          </div>
        </div>

        <div className="resources-grid-container">
          {loading && (
            <div className="loading-state">
              <p>Loading resources from database...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Error: {error}</p>
              <p>Make sure the server is running on port 5001.</p>
            </div>
          )}

          {!loading && !error && (
            <div className="resources-grid">
              {resources.map((resource) => (
                <div className={`resource-card type-${resource.type}`} key={resource.id}>
                  <div className="resource-header">
                    <div>
                      <h3>{resource.name}</h3>
                      <span className={`resource-badge badge-${resource.type}`}>
                        {resource.type === 'mental-health' ? 'Mental Health' :
                          resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p>{resource.description}</p>
                  <div className="resource-footer">
                    <div className="resource-availability">Available: {resource.available}</div>
                    <a href={`tel:${resource.contact}`} className="resource-contact">
                      Call: {resource.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && resources.length === 0 && (
            <div className="no-results">
              <p>No resources found for your selection.</p>
              <p>Try selecting a different county or resource type.</p>
            </div>
          )}
        </div>

        <div className="emergency-band">
          <h3>In immediate danger?</h3>
          <div className="emergency-contacts">
            <a href="tel:1195" className="emergency-btn">GBV Hotline: 1195</a>
            <a href="tel:999" className="emergency-btn">Police: 999</a>
            <a href="tel:0800723253" className="emergency-btn">Ambulance: 0800 723 253</a>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}

export default ResourcesPage