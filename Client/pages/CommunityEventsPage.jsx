import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import {
  createAwarenessActivity,
  getMemorialEvents,
  isFarajaDemoMode,
} from '../farajaApi'
import './CommunityEventsPage.css'

function formatEventDate(date) {
  const parsedDate = new Date(`${date}T12:00:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'long',
  }).format(parsedDate)
}

function CommunityEventsPage() {
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [eventsError, setEventsError] = useState('')
  const [selectedEventId, setSelectedEventId] = useState('')
  const [activityName, setActivityName] = useState('')
  const [description, setDescription] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [activities, setActivities] = useState([])

  async function loadEvents() {
    setLoadingEvents(true)
    setEventsError('')

    try {
      const nextEvents = await getMemorialEvents()
      setEvents(nextEvents)
      setSelectedEventId((currentId) => (
        nextEvents.some((event) => String(event.id) === currentId)
          ? currentId
          : nextEvents[0] ? String(nextEvents[0].id) : ''
      ))
    } catch (error) {
      setEventsError(error.message)
    } finally {
      setLoadingEvents(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setFormMessage('')
    setFormError('')

    const selectedEvent = events.find(
      (item) => String(item.id) === selectedEventId,
    )

    if (!selectedEvent) {
      setFormError('Choose an event before submitting an activity.')
      return
    }

    const activity = {
      memorialEventId: Number(selectedEvent.id),
      activityName: activityName.trim(),
      ...(description.trim() ? { description: description.trim() } : {}),
      ...(activityDate ? { date: activityDate } : {}),
    }

    setSubmitting(true)

    try {
      const createdActivity = await createAwarenessActivity(activity)
      setActivities((currentActivities) => [
        { ...createdActivity, eventName: selectedEvent.eventName },
        ...currentActivities,
      ])
      setActivityName('')
      setDescription('')
      setActivityDate('')
      setFormMessage(
        isFarajaDemoMode
          ? 'Demo complete. This activity was not sent to Faraja or saved.'
          : 'Your awareness activity was submitted to Faraja.',
      )
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageTransition>
      <main className="community-events-page">
        <section className="community-events-hero">
          <span className="community-events-eyebrow">Salama + Faraja</span>
          <h1>Community memorial events</h1>
          <p>
            Find public memorial events and coordinate a respectful community
            awareness activity with the event organizers.
          </p>
        </section>

        <section className="community-events-content">
          <div className={`integration-notice ${isFarajaDemoMode ? 'demo' : 'live'}`} role="status">
            <strong>{isFarajaDemoMode ? 'Demo mode' : 'Faraja API mode'}</strong>
            <span>
              {isFarajaDemoMode
                ? 'These are sample events. Submissions are not sent to Faraja or saved.'
                : 'Events and activity submissions use the Faraja API.'}
            </span>
          </div>

          <div className="events-section">
            <div className="events-section-heading">
              <div>
                <p className="community-events-kicker">Community</p>
                <h2>Memorial events</h2>
              </div>
              <button
                className="events-refresh-button"
                onClick={loadEvents}
                type="button"
                disabled={loadingEvents}
              >
                {loadingEvents ? 'Loading…' : 'Refresh events'}
              </button>
            </div>

            {loadingEvents && <p className="events-state">Loading events…</p>}
            {!loadingEvents && eventsError && (
              <div className="events-state events-error" role="alert">
                <p>Could not load events: {eventsError}</p>
                <button className="events-secondary-button" onClick={loadEvents} type="button">
                  Try again
                </button>
              </div>
            )}
            {!loadingEvents && !eventsError && events.length === 0 && (
              <p className="events-state">There are no public events to show right now.</p>
            )}
            {!loadingEvents && !eventsError && events.length > 0 && (
              <div className="memorial-events-grid">
                {events.map((event) => (
                  <article className="memorial-event-card" key={event.id}>
                    <span className="memorial-event-date">
                      {formatEventDate(event.date)}
                    </span>
                    <h3>{event.eventName}</h3>
                    <p className="memorial-event-location">📍 {event.location}</p>
                    <button
                      className="event-select-button"
                      onClick={() => setSelectedEventId(String(event.id))}
                      type="button"
                      aria-pressed={selectedEventId === String(event.id)}
                    >
                      {selectedEventId === String(event.id)
                        ? 'Selected for activity'
                        : 'Plan an activity'}
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>

          <section className="activity-planner" aria-labelledby="activity-planner-title">
            <div className="activity-planner-intro">
              <p className="community-events-kicker">Work together</p>
              <h2 id="activity-planner-title">Propose an awareness activity</h2>
              <p>
                Share a proposed activity with Faraja for the selected event.
                Do not include survivor names or private case details.
              </p>
            </div>

            <form className="activity-form" onSubmit={handleSubmit}>
              <label htmlFor="memorial-event">Memorial event</label>
              <select
                id="memorial-event"
                value={selectedEventId}
                onChange={(event) => setSelectedEventId(event.target.value)}
                required
                disabled={events.length === 0 || loadingEvents}
              >
                {events.length === 0 && <option value="">No events available</option>}
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.eventName} — {event.location}
                  </option>
                ))}
              </select>

              <label htmlFor="activity-name">Activity name</label>
              <input
                id="activity-name"
                name="activityName"
                type="text"
                value={activityName}
                onChange={(event) => setActivityName(event.target.value)}
                placeholder="e.g. Community support information session"
                maxLength={120}
                required
              />

              <label htmlFor="activity-description">Description <span>(optional)</span></label>
              <textarea
                id="activity-description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the planned activity without personal or case information."
                maxLength={500}
                rows={4}
              />

              <label htmlFor="activity-date">Proposed activity date <span>(optional)</span></label>
              <input
                id="activity-date"
                name="date"
                type="date"
                value={activityDate}
                onChange={(event) => setActivityDate(event.target.value)}
              />

              {formError && <p className="activity-form-error" role="alert">{formError}</p>}
              {formMessage && <p className="activity-form-message" role="status">{formMessage}</p>}

              <button
                className="activity-submit-button"
                type="submit"
                disabled={submitting || events.length === 0 || loadingEvents}
              >
                {submitting ? 'Submitting…' : 'Submit awareness activity'}
              </button>
            </form>

            {activities.length > 0 && (
              <div className="activity-submissions">
                <h3>Activities submitted in this visit</h3>
                <ul>
                  {activities.map((activity, index) => (
                    <li key={activity.id || `${activity.memorialEventId}-${index}`}>
                      <strong>{activity.activityName}</strong>
                      <span>{activity.eventName}</span>
                      {isFarajaDemoMode && <span className="activity-demo-label">Demo only</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <p className="privacy-note">
            This page uses public event details only. GBV-related areas and
            personal memorial information are not shown here.
          </p>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}

export default CommunityEventsPage
