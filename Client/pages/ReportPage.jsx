import { useState } from 'react'
import { apiRequest } from '../clientApi'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './ReportPage.css'

function ReportPage() {
  const [reportType, setReportType] = useState('anonymous')
  const [submitted, setSubmitted] = useState(false)
  const [caseRef, setCaseRef] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    county: '',
    location: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const data = await apiRequest('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_ref: `SAL-${Date.now()}`,
          incident_type: formData.incidentType,
          incident_date: formData.incidentDate || null,
          county: formData.county,
          location: formData.location,
          description: formData.description,
          is_anonymous: reportType === 'anonymous',
        }),
      })

      setCaseRef(data.case_ref || data.caseRef || `SAL-${Date.now()}`)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <PageTransition>
        <div className="report-page">
          <div className="report-success">
            <h2>Report Submitted Successfully</h2>
            <p>Your report has been received. A case reference number has been assigned.</p>
            <div className="ref-box">Case Ref: {caseRef}</div>
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
          <strong>Safety notice:</strong> If you are in immediate danger, call emergency services or a trusted local support contact.
        </div>

        <div className="report-container">
          <div className="report-type-toggle">
            <button
              type="button"
              className={reportType === 'anonymous' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setReportType('anonymous')}
            >
              🕵️ Report Anonymously
            </button>
            <button
              type="button"
              className={reportType === 'registered' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setReportType('registered')}
            >
              👤 Report with Details
            </button>
          </div>

          <form className="incident-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Type of incident *</label>
                <select name="incidentType" value={formData.incidentType} onChange={handleChange} required>
                  <option value="">Select incident type</option>
                  <option value="physical">Physical abuse</option>
                  <option value="sexual">Sexual abuse</option>
                  <option value="emotional">Emotional abuse</option>
                  <option value="economic">Economic abuse</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of incident *</label>
                <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>County *</label>
                <select name="county" value={formData.county} onChange={handleChange} required>
                  <option value="">Select county</option>
                  <option value="nairobi">Nairobi</option>
                  <option value="mombasa">Mombasa</option>
                  <option value="kisumu">Kisumu</option>
                  <option value="nakuru">Nakuru</option>
                  <option value="eldoret">Eldoret</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location / area</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Westlands, Kibera" />
              </div>
            </div>

            <div className="form-group">
              <label>What happened? *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Share as much or as little as you feel safe to share."
                required
              />
            </div>

            {submitError && <div className="error-box">{submitError}</div>}

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}

export default ReportPage
