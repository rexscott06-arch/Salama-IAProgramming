import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-badge">Kenya's Safe Space for GBV Support</div>

      <h1>
        You are not alone.<br />
        <span className="hero-swahili">Hukuachwa peke yako.</span>
      </h1>

      <p className="hero-sub">
        A safe, confidential place to learn about gender-based violence,
        report incidents, and find support across Kenya.
      </p>
      <p className="hero-sub-sw">
        Mahali salama, pa siri, pa kujifunza, kuripoti, na kupata msaada Kenya.
      </p>

      <div className="hero-ctas">
        <Link to="/report" className="cta-primary">🚨 Report an incident</Link>
        <Link to="/awareness" className="cta-secondary">📖 Learn about GBV</Link>
        <Link to="/resources" className="cta-secondary">📍 Find support near me</Link>
      </div>

            <div className="hero-safety-note">
              🔒 All reports can be made anonymously
            </div>
          </section>
        )
      }
      
      export default Hero