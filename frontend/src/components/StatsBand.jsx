import './StatsBand.css'

function StatsBand() {
  const stats = [
    { number: '1 in 3', label: 'Women in Kenya experience GBV' },
    { number: '1195', label: 'National GBV hotline (free)' },
    { number: '47', label: 'Counties covered' },
    { number: '24/7', label: 'Support available' },
  ]

  return (
    <div className="stats-band">
      {stats.map((stat, index) => (
        <div className="stat-item" key={index}>
          <div className="stat-num">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsBand