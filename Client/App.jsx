import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import QuickExit from './components/QuickExit'
import Home from './pages/Home'
import AwarenessPage from './pages/AwarenessPage'
import ReportPage from './pages/ReportPage'
import ResourcesPage from './pages/ResourcesPage'
import VolunteersPage from './pages/VolunteersPage'
import DonatePage from './pages/DonatePage'
import CommunityEventsPage from './pages/CommunityEventsPage'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/awareness" element={<AwarenessPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/community-events" element={<CommunityEventsPage />} />
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <QuickExit />
      <Navbar />
      <AnimatedRoutes />
    </Router>
  )
}

export default App