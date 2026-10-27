import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">🛡️ Salama</div>
          <p className="footer-tagline">
            A safe, confidential space for survivors of gender-based violence across Kenya.
          </p>
          <p className="footer-tagline-sw">
            Mahali salama kwa waathiriwa wa unyanyasaji wa kijinsia Kenya.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/awareness">Awareness</Link>
          <Link to="/report">Report an Incident</Link>
          <Link to="/resources">Find Resources</Link>
          <Link to="/community-events">Community Events</Link>
          <Link to="/volunteers">Volunteer</Link>
          <Link to="/donate">Donate</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Safety Information</a>
          <a href="#">Partners</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Emergency Contacts</h4>
          <div className="hotline-item">
            <span className="hotline-label">GBV Hotline</span>
            <span className="hotline-number">1195</span>
          </div>
          <div className="hotline-item">
            <span className="hotline-label">Police</span>
            <span className="hotline-number">999</span>
          </div>
          <div className="hotline-item">
            <span className="hotline-label">Ambulance</span>
            <span className="hotline-number">0800 723 253</span>
          </div>
          <div className="hotline-item">
            <span className="hotline-label">Child Helpline</span>
            <span className="hotline-number">116</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Salama — Safe Space Kenya. All rights reserved.</p>
        <p className="footer-disclaimer">
          This platform is confidential. We do not store your browsing history.
        </p>
      </div>
    </footer>
  )
}

export default Footer