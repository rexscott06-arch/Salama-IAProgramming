import { useState } from 'react'
import { apiRequest } from '../clientApi'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './VolunteersPage.css'

function VolunteersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', county: '',
    role: '', availability: '', experience: '', motivation: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      await apiRequest('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const roles = [
    { icon: '🧠', title: 'Counsellor Support', description: 'Assist trained counsellors in providing emotional support to GBV survivors.' },
    { icon: '⚖️', title: 'Legal Aid Assistant', description: 'Help survivors navigate the legal system and access justice.' },
    { icon: '📢', title: 'Awareness Campaigner', description: 'Organize and run GBV awareness campaigns in schools and communities.' },
    { icon: '🏠', title: 'Shelter Support', description: 'Provide practical support at GBV shelters and safe houses across Kenya.' },
    { icon: '💻', title: 'Digital Volunteer', description: 'Help manage the platform, social media, and digital outreach efforts.' },
    { icon: '🚗', title: 'Transport & Logistics', description: 'Help transport survivors safely to shelters, hospitals, and legal aid centers.' },
  ]

  if (submitted) {
    return (
      <PageTransition>
        <div className="volunteers-page">
          <div className="success-screen">
            <div className="success-icon">🤝</div>
            <h2>Thank You for Volunteering!</h2>
            <p>Your application has been received. Our volunteer coordinator will contact you within 3 business days.</p>
            <a href="/" className="back-home">← Back to Home</a>
          </div>
          <Footer />
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="volunteers-page">
        <div className="volunteers-hero">
          <div className="volunteers-badge">Jitolee — Volunteer</div>
          <h1>Make a Difference in Your Community</h1>
          <p>Join our network of dedicated volunteers across Kenya helping survivors of gender-based violence.</p>
        </div>

        <div className="roles-section">
          <h2>Volunteer Roles</h2>
          <p className="roles-subtitle">Nafasi za Kujitolea</p>
          <div className="roles-grid">
            {roles.map((role, index) => (
              <div className="role-card" key={index}>
                <div className="role-icon">{role.icon}</div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="volunteer-form-section">
          <div className="form-intro">
            <h2>Apply to Volunteer</h2>
            <p>Omba Kujitolea</p>
          </div>
          <form className="volunteer-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Personal Details</h3>
              <div className="form-row">
                <div className="form-group"><label>Full name *</label><input type="text" name="name" placeholder="Your full name" onChange={handleChange} required /></div>
                <div className="form-group"><label>Email address *</label><input type="email" name="email" placeholder="your@email.com" onChange={handleChange} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Phone number *</label><input type="tel" name="phone" placeholder="+254 7XX XXX XXX" onChange={handleChange} required /></div>
                <div className="form-group">
                  <label>County *</label>
                  <select name="county" onChange={handleChange} required>
                    <option value="">Select your county</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                    <option value="eldoret">Uasin Gishu</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-section">
              <h3>Volunteer Preferences</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Preferred role *</label>
                  <select name="role" onChange={handleChange} required>
                    <option value="">Select a role</option>
                    <option value="counsellor">Counsellor Support</option>
                    <option value="legal">Legal Aid Assistant</option>
                    <option value="awareness">Awareness Campaigner</option>
                    <option value="shelter">Shelter Support</option>
                    <option value="digital">Digital Volunteer</option>
                    <option value="transport">Transport & Logistics</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability *</label>
                  <select name="availability" onChange={handleChange} required>
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="both">Both weekdays & weekends</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label>Relevant experience</label><textarea name="experience" rows="4" placeholder="Tell us about any relevant experience..." onChange={handleChange}></textarea></div>
              <div className="form-group"><label>Why do you want to volunteer? *</label><textarea name="motivation" rows="4" placeholder="Tell us what motivates you to support GBV survivors..." onChange={handleChange} required></textarea></div>
            </div>
            <div className="form-section">
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? '⏳ Submitting...' : '🤝 Submit Volunteer Application'}
              </button>
              {submitError && (
                <p style={{ color: 'red', marginTop: '0.5rem' }}>
                  ❌ Error: {submitError}. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="volunteer-stats">
          <div className="vstat-item"><div className="vstat-num">200+</div><div className="vstat-label">Active volunteers</div></div>
          <div className="vstat-item"><div className="vstat-num">47</div><div className="vstat-label">Counties covered</div></div>
          <div className="vstat-item"><div className="vstat-num">5,000+</div><div className="vstat-label">Survivors supported</div></div>
          <div className="vstat-item"><div className="vstat-num">3 days</div><div className="vstat-label">Average response time</div></div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}

export default VolunteersPage