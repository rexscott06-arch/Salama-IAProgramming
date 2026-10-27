import { useState, useEffect } from 'react'
import { apiRequest } from '../clientApi'
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
    apiRequest('/api/resources')
      .then((data) => {
        setResources(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered = resources.filter((r) => {
    const countyMatch =
      selectedCounty === 'all' ||
      r.county === 'all' ||
      (r.county && r.county.toLowerCase() === selectedCounty.toLowerCase())

    const typeMatch =
      selectedType === 'all' ||
      r.type === selectedType ||
      (r.type && r.type.toLowerCase().replace('_', '-') === selectedType.toLowerCase())

    return countyMatch && typeMatch
  })

  const getIcon = (type) => {
    const t = (type || '').toLowerCase().replace('_', '-')
    if (t === 'hotline') return '📞'
    if (t === 'shelter') return '🏠'
    if (t === 'legal') return '⚖️'
    if (t === 'medical') return '🏥'
    if (t === 'mental-health') return '🧠'
    return '📍'
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="resources-page" style={{ padding: '3rem', textAlign: 'center' }}>
          <p>Loading resources...</p>
        </div>
      </PageTransition>
    )
  }

  if (error) {
    return (
      <PageTransition>
        <div className="resources-page" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Make sure your backend server is running on port 5000.
          </p>
        </div>
      </PageTransition>
    )
  }

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
            Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="resources-grid-container">
          <div className="resources-grid">
            {filtered.map((resource) => (
              <div className={`resource-card type-${(resource.type || '').toLowerCase().replace('_', '-')}`} key={resource.id}>
                <div className="resource-header">
                  <span className="resource-icon">{getIcon(resource.type)}</span>
                  <div>
                    <h3>{resource.name}</h3>
                    <span className={`resource-badge badge-${(resource.type || '').toLowerCase().replace('_', '-')}`}>
                      {resource.type === 'mental_health' || resource.type === 'mental-health'
                        ? 'Mental Health'
                        : resource.type
                        ? resource.type.charAt(0).toUpperCase() + resource.type.slice(1)
                        : 'Other'}
                    </span>
                  </div>
                </div>
                <p>{resource.description}</p>
                <div className="resource-footer">
                  <div className="resource-availability">
                    {resource.available || 'Availability not specified'}
                  </div>
                  <a href={`tel:${resource.contact}`} className="resource-contact">
                    📞 {resource.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="no-results">
              <p>😔 No resources found for your selection.</p>
              <p>Try selecting a different county or resource type.</p>
            </div>
          )}
        </div>

        <div className="emergency-band">
          <h3>In immediate danger?</h3>
          <div className="emergency-contacts">
            <a href="tel:1195" className="emergency-btn">📞 GBV Hotline: 1195</a>
            <a href="tel:999" className="emergency-btn">🚨 Police: 999</a>
            <a href="tel:0800723253" className="emergency-btn">🚑 Ambulance: 0800 723 253</a>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}

export default ResourcesPage