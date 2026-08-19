import { useState } from 'react'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './DonatePage.css'

function DonatePage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const presetAmounts = ['500', '1000', '2500', '5000', '10000']

  const impacts = [
    { amount: 'KES 500', icon: '🍱', impact: 'Feeds a survivor at a shelter for one week' },
    { amount: 'KES 1,000', icon: '📚', impact: 'Provides counselling materials for one survivor' },
    { amount: 'KES 2,500', icon: '⚖️', impact: 'Covers legal aid consultation for one survivor' },
    { amount: 'KES 5,000', icon: '🏠', impact: 'Funds one week of safe shelter for a survivor' },
    { amount: 'KES 10,000', icon: '🎓', impact: 'Trains a community volunteer for 3 months' },
  ]

  if (submitted) {
    return (
      <PageTransition>
        <div className="donate-page">
          <div className="success-screen">
            <div className="success-icon">❤️</div>
            <h2>Thank You for Your Donation!</h2>
            <p>Your generosity helps protect and support GBV survivors across Kenya.</p>
            <div className="ref-box">Donation Ref: DON-{Math.floor(Math.random() * 90000) + 10000}</div>
            <p className="success-note">A receipt will be sent to your email address.</p>
            <a href="/" className="back-home">← Back to Home</a>
          </div>
          <Footer />
        </div>
      </PageTransition>
    )
  }

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
            <h2>Make a Donation</h2>
            <p className="form-intro-sw">Fanya Mchango</p>
          </div>
          <form className="donate-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Select Amount (KES)</h3>
              <div className="amount-grid">
                {presetAmounts.map((amount) => (
                  <button type="button" key={amount} className={selectedAmount === amount ? 'amount-btn active' : 'amount-btn'} onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}>
                    KES {parseInt(amount).toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Or enter a custom amount</label>
                <input type="number" placeholder="Enter amount in KES" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount('') }} />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <button type="button" className={paymentMethod === 'mpesa' ? 'payment-btn active' : 'payment-btn'} onClick={() => setPaymentMethod('mpesa')}>📱 M-Pesa</button>
                <button type="button" className={paymentMethod === 'card' ? 'payment-btn active' : 'payment-btn'} onClick={() => setPaymentMethod('card')}>💳 Card</button>
                <button type="button" className={paymentMethod === 'bank' ? 'payment-btn active' : 'payment-btn'} onClick={() => setPaymentMethod('bank')}>🏦 Bank Transfer</button>
              </div>

              {paymentMethod === 'mpesa' && (
                <div className="payment-info mpesa-info">
                  <p>📱 <strong>M-Pesa Paybill</strong></p>
                  <p>Business Number: <strong>123456</strong></p>
                  <p>Account Number: <strong>SALAMA</strong></p>
                  <p className="payment-note">Enter your phone number below to receive an STK push</p>
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label>M-Pesa phone number *</label>
                    <input type="tel" name="phone" placeholder="+254 7XX XXX XXX" onChange={handleChange} required />
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="payment-info card-info">
                  <div className="form-group"><label>Card number *</label><input type="text" placeholder="1234 5678 9012 3456" required /></div>
                  <div className="form-row">
                    <div className="form-group"><label>Expiry date *</label><input type="text" placeholder="MM/YY" required /></div>
                    <div className="form-group"><label>CVV *</label><input type="text" placeholder="123" required /></div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="payment-info bank-info">
                  <p>🏦 <strong>Bank Transfer Details</strong></p>
                  <p>Bank: <strong>Equity Bank Kenya</strong></p>
                  <p>Account Name: <strong>Salama Safe Space Kenya</strong></p>
                  <p>Account Number: <strong>0123456789</strong></p>
                  <p>Branch: <strong>Nairobi CBD</strong></p>
                  <p className="payment-note">Please use your name as the reference</p>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Your Details</h3>
              <div className="form-row">
                <div className="form-group"><label>Full name</label><input type="text" name="name" placeholder="Your full name" onChange={handleChange} /></div>
                <div className="form-group"><label>Email address</label><input type="email" name="email" placeholder="your@email.com" onChange={handleChange} /></div>
              </div>
              <div className="form-group"><label>Leave a message (optional)</label><textarea name="message" rows="3" placeholder="Share why you're donating or a message of support..." onChange={handleChange}></textarea></div>
            </div>

            <div className="form-section">
              <button type="submit" className="donate-submit-btn">
                ❤️ Donate {selectedAmount ? `KES ${parseInt(selectedAmount).toLocaleString()}` : customAmount ? `KES ${parseInt(customAmount).toLocaleString()}` : 'Now'}
              </button>
              <p className="form-disclaimer">Your donation is secure and will go directly to supporting GBV survivors across Kenya. Salama is a registered NGO in Kenya.</p>
            </div>
          </form>
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
