function SalamaLogo({ variant = 'dark' }) {
    const heartFill = variant === 'dark' ? '#7B1F3A' : '#A93253'
    const shieldFill = variant === 'dark' ? '#FFCDD7' : '#FBEAF0'
    const shieldStroke = variant === 'dark' ? '#fff' : '#A93253'
    const namColor = variant === 'dark' ? '#fff' : '#7B1F3A'
    const subColor = variant === 'dark' ? '#f9b8cb' : '#A93253'
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 3L4 8V18C4 25.5 10.5 32 18 34C25.5 32 32 25.5 32 18V8L18 3Z"
            fill={shieldFill}
            stroke={shieldStroke}
            strokeWidth="1"
          />
          <path
            d="M13 17.5C13 15.5 14.5 14 16.5 14C17.4 14 18.2 14.4 18.8 15C19.4 14.4 20.2 14 21.1 14C23.1 14 24.6 15.5 24.6 17.5C24.6 20 21.8 22.5 18.8 24.5C15.8 22.5 13 20 13 17.5Z"
            fill={heartFill}
          />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '20px', fontWeight: '700', color: namColor, letterSpacing: '0.5px' }}>Salama</span>
          <span style={{ fontSize: '10px', color: subColor, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Safe Space Kenya</span>
        </div>
      </div>
    )
  }
  
  export default SalamaLogo