import { Link, useLocation } from 'react-router-dom'
import SalamaLogo from './SalamaLogo'
import DarkModeToggle from './DarkModeToggle'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link to="/">
        <SalamaLogo variant="dark" />
      </Link>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/awareness" className={location.pathname === '/awareness' ? 'active' : ''}>Awareness</Link>
        <Link to="/report" className={location.pathname === '/report' ? 'active' : ''}>Report</Link>
        <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</Link>
        <Link to="/community-events" className={location.pathname === '/community-events' ? 'active' : ''}>Events</Link>
        <Link to="/volunteers" className={location.pathname === '/volunteers' ? 'active' : ''}>Volunteers</Link>
        <Link to="/donate" className={location.pathname === '/donate' ? 'active' : ''}>Donate</Link>
      </div>

      <div className="nav-right">
        <button className="lang-btn">EN | SW</button>
        <DarkModeToggle />
        <Link to="/report" className="get-help-btn">Get Help Now</Link>
      </div>
    </nav>
  )
}

export default Navbar