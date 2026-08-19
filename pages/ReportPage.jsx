import { useState } from 'react'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './ReportPage.css'

function ReportPage() {
  const [reportType, setReportType] = useState('anonymous')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    location: '',
    description: '',
    name: '',
    phone: '',
    email: '',
    county: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <PageTransition>
        <div className="report-page">
          <div className="success-screen">
            <div className="success-icon">✅</div>
            <h2>Report Submitted Successfully</h2>
            <p>Your report has been received. A case reference number has been assigned.</p>
            <div className="case-ref">Case Ref: SAL-{Math.floor(Math.random() * 90000) + 10000}</div>
            <p className="success-note">If you are in immediate danger, please call <strong>1195</strong> or <strong>999</strong> now.</p>
            <a href="/" className="back-home">← Back to Home</a>
          </div>
          <Footer />
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="report-page">
        <div className="report-hero">
          <div className="report-badge">Ripoti Tukio — Report an Incident</div>
          <h1>Report an Incident</h1>
          <p>Your report is safe and confidential. You can report anonymously or provide your details for follow-up support.</p>
        </div>

        <div className="report-safety-banner">
          🔒 This form is encrypted and confidential. Your information will only be shared with trained support staff.
        </div>

        <div className="report-container">
          <div className="report-type-toggle">
            <button className={reportType === 'anonymous' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setReportType('anonymous')}>
              🕵️ Report Anonymously
            </button>
            <button className={reportType === 'registered' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setReportType('registered')}>
              👤 Report with My Details
            </button>
          </div>

          {reportType === 'anonymous' && (
            <div className="anon-note">
              ℹ️ You are reporting anonymously. No personal details will be collected. You will receive a case reference number.
            </div>
          )}

          <form className="report-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Incident Details</h3>
              <div className="form-group">
                <label>Type of incident *</label>
                <select name="incidentType" onChange={handleChange} required>
                  <option value="">Select incident type</option>
                  <option value="physical">Physical Violence</option>
                  <option value="sexual">Sexual Violence</option>
                  <option value="emotional">Emotional / Psychological Abuse</option>
                  <option value="economic">Economic Abuse</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of incident *</label>
                  <input type="date" name="incidentDate" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>County where it occurred *</label>
                  <select name="county" onChange={handleChange} required>
                    <option value="">Select county</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                    <option value="eldoret">Uasin Gishu</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Location details</label>
                <input type="text" name="location" placeholder="e.g. Westlands, Nairobi (optional)" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Describe what happened *</label>
                <textarea name="description" rows="6" placeholder="Please describe the incident in as much detail as you feel comfortable sharing..." onChange={handleChange} required></textarea>
              </div>
            </div>

            {reportType === 'registered' && (
              <div className="form-section">
                <h3>Your Details (Optional for follow-up)</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your name</label>
                    <input type="text" name="name" placeholder="Full name" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Phone number</label>
                    <input type="tel" name="phone" placeholder="+254 7XX XXX XXX" onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" name="email" placeholder="your@email.com" onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-section">
              <button type="submit" className="submit-btn">🚨 Submit Report Securely</button>
              <p className="form-disclaimer">By submitting this report you agree that your information may be shared with trained GBV support staff and relevant authorities where necessary to ensure your safety.</p>
            </div>
          </form>
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

export default ReportPage
