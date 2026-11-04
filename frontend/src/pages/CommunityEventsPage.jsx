import { useState, useEffect } from 'react';
import { getMemorialEvents, submitAwarenessActivity } from '../api/farajaApi';
import './CommunityEventsPage.css';

export default function CommunityEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stale, setStale] = useState(false);
  const [asOf, setAsOf] = useState(null);

  useEffect(() => {
    getMemorialEvents()
      .then(res => { setEvents(res.data); setStale(res.stale); setAsOf(res.asOf); setLoading(false); })
      .catch(() => { setError('Partner data unavailable. Please try again later.'); setLoading(false); });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedEvent) return;
    setSubmitting(true);
    try {
      await submitAwarenessActivity({
        memorialEventId: selectedEvent.id,
        activityName,
        description,
        date
      });
      setSubmitted(true);
    } catch {
      setError('Could not submit activity. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="community-events-page">
      <div className="events-hero">
        <h1>GBV Memorial Awareness Events</h1>
        <p>
          These are upcoming memorial services for individuals whose lives were lost to gender-based violence.
          Salama volunteers attend these events to educate communities on GBV prevention and available support resources.
        </p>
      </div>

      <div className="events-container">
        <section className="events-list">
          <h2>Upcoming Memorial Events</h2>
          {stale && <p className="events-error">Showing saved data from {new Date(asOf).toLocaleTimeString()}. Faraja is not responding.</p>}
          {loading && <p className="events-loading">Loading events...</p>}
          {error && <p className="events-error">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="events-empty">No upcoming events at this time.</p>
          )}
          {!loading && !error && events.map(event => (
            <div
              key={event.id}
              className={`event-card ${selectedEvent?.id === event.id ? 'selected' : ''}`}
              onClick={() => { setSelectedEvent(event); setSubmitted(false); }}
            >
              <h3>{event.eventName}</h3>
              <p className="event-date">Date: {event.date}</p>
              <p className="event-location">Location: {event.location}</p>
              <span className="event-select-hint">Click to propose an awareness activity</span>
            </div>
          ))}
        </section>

        <section className="awareness-form">
          <h2>Propose an Awareness Activity</h2>
          {!selectedEvent && (
            <p className="form-hint">Select a memorial event on the left to propose an activity.</p>
          )}
          {selectedEvent && !submitted && (
            <form onSubmit={handleSubmit}>
              <p className="selected-event-label">Event: <strong>{selectedEvent.eventName}</strong> — {selectedEvent.location}</p>
              <div className="form-group">
                <label>Activity Name</label>
                <input
                  type="text"
                  value={activityName}
                  onChange={e => setActivityName(e.target.value)}
                  placeholder="e.g. GBV Awareness Workshop"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Brief description of the activity"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Proposed Date (optional)</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Proposal'}
              </button>
            </form>
          )}
          {submitted && (
            <div className="success-message">
              <h3>Proposal Submitted!</h3>
              <p>Your awareness activity has been proposed for <strong>{selectedEvent.eventName}</strong>.</p>
              <button onClick={() => { setSubmitted(false); setActivityName(''); setDescription(''); setDate(''); setSelectedEvent(null); }} className="reset-btn">
                Propose Another
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
