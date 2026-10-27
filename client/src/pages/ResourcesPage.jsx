import { useState } from 'react'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './ResourcesPage.css'

function ResourcesPage() {
  const [selectedCounty, setSelectedCounty] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const resources = [
    { name: 'GBV National Hotline', type: 'hotline', county: 'all', description: 'Free 24/7 national hotline for GBV survivors. Trained counsellors available in English and Swahili.', contact: '1195', available: '24/7', icon: '📞' },
    { name: 'Kenya Red Cross GBV Support', type: 'shelter', county: 'nairobi', description: 'Emergency shelter, psychosocial support, and legal aid for GBV survivors in Nairobi.', contact: '0800 723 253', available: 'Mon–Fri 8am–5pm', icon: '🏠' },
    { name: 'FIDA Kenya', type: 'legal', county: 'nairobi', description: 'Free legal aid and representation for women and girls affected by GBV across Kenya.', contact: '0722 509 760', available: 'Mon–Fri 8am–5pm', icon: '⚖️' },
    { name: "Nairobi Women's Hospital GBV Recovery Centre", type: 'medical', county: 'nairobi', description: 'Comprehensive medical care, counselling, and legal support for GBV survivors.', contact: '0800 720 990', available: '24/7', icon: '🏥' },
    { name: 'Coast General Hospital GBV Clinic', type: 'medical', county: 'mombasa', description: 'Medical care and psychosocial support for GBV survivors in the Coast region.', contact: '041 231 4201', available: 'Mon–Sat 8am–6pm', icon: '🏥' },
    { name: 'Kisumu Women Fighting AIDS (KWFA)', type: 'shelter', county: 'kisumu', description: 'Shelter, counselling, and support services for GBV survivors in Kisumu and Western Kenya.', contact: '057 202 3371', available: 'Mon–Fri 8am–5pm', icon: '🏠' },
    { name: 'Childline Kenya', type: 'hotline', county: 'all', description: 'Free 24/7 helpline for children experiencing abuse, violence, or exploitation.', contact: '116', available: '24/7', icon: '👶' },
    { name: 'Nakuru GBV Recovery Centre', type: 'medical', county: 'nakuru', description: 'Medical care, counselling, and referral services for GBV survivors in Nakuru County.', contact: '051 221 0267', available: 'Mon–Fri 8am–5pm', icon: '🏥' },
    { name: 'Kenya Police GBV Desk', type: 'legal', county: 'all', description: 'Dedicated GBV desks at police stations across Kenya staffed by trained officers.', contact: '999', available: '24/7', icon: '👮' },
    { name: 'Amani Counselling Centre', type: 'mental-health', county: 'nairobi', description: 'Professional counselling and mental health support for GBV survivors and their families.', contact: '0722 178 177', available: 'Mon–Sat 8am–6pm', icon: '🧠' },
  ]

  const filtered = resources.filter(r => {
    const countyMatch = selectedCounty === 'all' || r.county === 'all' || r.county === selectedCounty
    const typeMatch = selectedType === 'all' || r.type === selectedType
    return countyMatch && typeMatch
  })

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
          <div className="filter-count">Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}</div>
        </div>

        <div className="resources-grid-container">
          <div className="resources-grid">
            {filtered.map((resource, index) => (
              <div className={`resource-card type-${resource.type}`} key={index}>
                <div className="resource-header">
                  <span className="resource-icon">{resource.icon}</span>
                  <div>
                    <h3>{resource.name}</h3>
                    <span className={`resource-badge badge-${resource.type}`}>
                      {resource.type === 'mental-health' ? 'Mental Health' : resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                </div>
                <p>{resource.description}</p>
                <div className="resource-footer">
                  <div className="resource-availability">🕐 {resource.available}</div>
                  <a href={`tel:${resource.contact}`} className="resource-contact">📞 {resource.contact}</a>
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
