import { useState, useEffect } from 'react'
import { apiRequest } from './clientApi'

function IncidentsTable() {
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiRequest('/api/incidents')
      .then((data) => {
        setIncidents(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading incidents...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Case Ref</th>
          <th>Type</th>
          <th>County</th>
          <th>Status</th>
          <th>Anonymous</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((incident) => (
          <tr key={incident.id}>
            <td>{incident.id}</td>
            <td>{incident.case_ref}</td>
            <td>{incident.incident_type}</td>
            <td>{incident.county}</td>
            <td>{incident.status}</td>
            <td>{incident.is_anonymous ? 'Yes' : 'No'}</td>
            <td>{incident.incident_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IncidentsTable