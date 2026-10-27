import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './DonatePage.css'

function DonatePage() {
  const impacts = [
    { amount: 'KES 500', icon: '🍱', impact: 'Feeds a survivor at a shelter for one week' },
    { amount: 'KES 1,000', icon: '📚', impact: 'Provides counselling materials for one survivor' },
    { amount: 'KES 2,500', icon: '⚖️', impact: 'Covers legal aid consultation for one survivor' },
    { amount: 'KES 5,000', icon: '🏠', impact: 'Funds one week of safe shelter for a survivor' },
    { amount: 'KES 10,000', icon: '🎓', impact: 'Trains a community volunteer for 3 months' },
  ]

  return (
    <PageTransition>
      <div className="donate-page">
        <div className="donate-hero">
          <div className="donate-badge">Changia — Donate</div>
          <h1>Your Donation Saves Lives</h1>
          <p>Every contribution funds shelters, legal aid, counselling, and awareness campaigns that protect survivors across Kenya.</p>
        </div>

        <div className="impact-section">
          <h2>Your Impact</h2>
          <p className="impact-subtitle">Athari ya Mchango Wako</p>
          <div className="impact-grid">
            {impacts.map((item, index) => (
              <div className="impact-card" key={index}>
                <div className="impact-icon">{item.icon}</div>
                <div className="impact-amount">{item.amount}</div>
                <p>{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="donate-form-section">
          <div className="form-intro">
            <h2>Online Donations</h2>
            <p className="form-intro-sw">Fanya Mchango</p>
          </div>
          <div className="payment-info" role="status">
            <p>Online donations are temporarily unavailable while a secure payment provider is being configured.</p>
            <p>No payment details or donation records are collected here. Please check back later.</p>
          </div>
        </div>

        <div className="donate-stats">
          <div className="dstat-item"><div className="dstat-num">KES 2.4M</div><div className="dstat-label">Raised this year</div></div>
          <div className="dstat-item"><div className="dstat-num">1,200+</div><div className="dstat-label">Donors</div></div>
          <div className="dstat-item"><div className="dstat-num">5,000+</div><div className="dstat-label">Survivors supported</div></div>
          <div className="dstat-item"><div className="dstat-num">100%</div><div className="dstat-label">Goes to survivors</div></div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}

export default DonatePage