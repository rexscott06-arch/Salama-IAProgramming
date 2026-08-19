import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import './AwarenessPage.css'

function AwarenessPage() {
  const types = [
    {
      icon: '��',
      title: 'Physical Violence',
      swahili: 'Unyanyasaji wa Kimwili',
      description: 'Physical violence includes hitting, slapping, kicking, burning, or any other form of physical harm. It is never acceptable and is a criminal offense in Kenya.',
      signs: ['Unexplained bruises or injuries', 'Flinching at sudden movements', 'Partner controls all movements', 'Frequent visits to hospital'],
      color: 'type-physical',
    },
    {
      icon: '🚫',
      title: 'Sexual Violence',
      swahili: 'Unyanyasaji wa Kijinsia',
      description: 'Sexual violence includes rape, sexual assault, forced marriage, and any unwanted sexual contact. Consent must be freely given — silence is not consent.',
      signs: ['Forced sexual acts', 'Pressure to perform sexual acts', 'Using sex as punishment', 'Denying contraception'],
      color: 'type-sexual',
    },
    {
      icon: '💔',
      title: 'Emotional & Psychological suffering',
      swahili: 'Unyanyasaji wa Kihisia',
      description: 'Emotional abuse involves controlling, threatening, humiliating or isolating a person. It can be just as damaging as physical violence and is often harder to recognize.',
      signs: ['Constant criticism and humiliation', 'Isolation from friends and family', 'Threats and intimidation', 'Controlling behaviour'],
      color: 'type-emotional',
    },
    {
      icon: '💰',
      title: 'Economic Abuse',
      swahili: 'Unyanyasaji wa Kiuchumi',
      description: 'Economic abuse involves controlling a person\'s access to money, employment, or financial resources to create dependency and limit their freedom.',
      signs: ['Controlling all finances', 'Preventing from working', 'Stealing money or property', 'Running up debts in your name'],
      color: 'type-economic',
    },
  ]

  return (
    <PageTransition>
      <div className="awareness-page">
        <div className="awareness-hero">
          <div className="awareness-badge">Uhamasishaji — Awareness</div>
          <h1>Understanding Gender-Based Violence</h1>
          <p>Knowledge is the first step to protection. Learn to recognize the signs of GBV and how to get help.</p>
        </div>

        <div className="awareness-intro">
          <div className="intro-card">
            <h2>What is GBV?</h2>
            <p>Gender-based violence (GBV) refers to harmful acts directed at individuals based on their gender. It affects people of all ages, backgrounds, and communities across Kenya. GBV is never the victim's fault — it is always the responsibility of the perpetrator.</p>
            <p className="intro-sw">Unyanyasaji wa kijinsia ni vitendo vya madhara vinavyoelekezwa kwa watu kulingana na jinsia yao. Kamwe si kosa la mwathiriwa.</p>
          </div>
        </div>

        <div className="types-section">
          <h2>Types of Gender-Based Violence</h2>
          <p className="types-subtitle">Aina za Unyanyasaji wa Kijinsia</p>
          <div className="types-grid">
            {types.map((type, index) => (
              <div className={`type-card ${type.color}`} key={index}>
                <div className="type-icon">{type.icon}</div>
                <h3>{type.title}</h3>
                <div className="type-sw">{type.swahili}</div>
                <p>{type.description}</p>
                <div className="signs-section">
                  <h4>Warning signs:</h4>
                  <ul>
                    {type.signs.map((sign, i) => (
                      <li key={i}>{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="myth-section">
          <h2>Myths vs Facts</h2>
          <p className="types-subtitle">Hadithi za Uongo na Ukweli</p>
          <div className="myth-grid">
            <div className="myth-card">
              <div className="myth-label">❌ Myth</div>
              <p>"GBV only happens in poor or uneducated families."</p>
              <div className="fact-label">✅ Fact</div>
              <p>GBV affects people across all income levels, education levels, and communities in Kenya.</p>
            </div>
            <div className="myth-card">
              <div className="myth-label">❌ Myth</div>
              <p>"If it was really abuse, the victim would just leave."</p>
              <div className="fact-label">✅ Fact</div>
              <p>Leaving an abusive relationship is dangerous and complex. Victims need support, not judgment.</p>
            </div>
            <div className="myth-card">
              <div className="myth-label">❌ Myth</div>
              <p>"What happens in the home should stay in the home."</p>
              <div className="fact-label">✅ Fact</div>
              <p>GBV is a crime under Kenyan law. Reporting it is not a betrayal — it is protection.</p>
            </div>
          </div>
        </div>

        <div className="awareness-cta">
          <h2>Ready to take action?</h2>
          <p>If you or someone you know is experiencing GBV, help is available right now.</p>
          <div className="awareness-cta-btns">
            <a href="/report" className="cta-report">🚨 Report an incident</a>
            <a href="/resources" className="cta-resources">📍 Find support near me</a>
            <a href="tel:1195" className="cta-hotline">📞 Call 1195 now</a>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  )
}

export default AwarenessPage
