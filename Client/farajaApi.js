const isLiveMode = import.meta.env.VITE_FARAJA_API_MODE === 'live'
const configuredBaseUrl = import.meta.env.VITE_FARAJA_API_URL?.replace(/\/+$/, '')
const apiBaseUrl = configuredBaseUrl || (isLiveMode ? '/faraja-api' : '')

function dateAfterDays(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const demoEvents = [
  {
    id: 1,
    memorialId: 101,
    eventName: 'Community Memorial Gathering',
    date: dateAfterDays(6),
    location: 'Nairobi Community Hall',
  },
  {
    id: 2,
    memorialId: 102,
    eventName: 'Memorial Service',
    date: dateAfterDays(16),
    location: 'Kisumu Social Centre',
  },
  {
    id: 3,
    memorialId: 103,
    eventName: 'Community Remembrance Service',
    date: dateAfterDays(24),
    location: 'Mombasa Memorial Gardens',
  },
]

async function request(path, options) {
  if (isLiveMode && import.meta.env.PROD && !configuredBaseUrl) {
    throw new Error('Set VITE_FARAJA_API_URL to the deployed Faraja API address.')
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      ...options?.headers,
    },
  })
  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = body && typeof body === 'object'
      ? body.message || body.error
      : null
    throw new Error(message || `Faraja request failed (${response.status})`)
  }

  return body
}

export async function getMemorialEvents() {
  if (!isLiveMode) {
    return demoEvents.map((event) => ({ ...event }))
  }

  const events = await request('/memorial-events')
  if (!Array.isArray(events)) {
    throw new Error('Faraja returned an unexpected memorial events response.')
  }

  return events
}

export async function createAwarenessActivity(activity) {
  if (!isLiveMode) {
    return { ...activity, id: `demo-${Date.now()}` }
  }

  return request('/awareness-activities', {
    method: 'POST',
    body: JSON.stringify(activity),
  })
}

export const isFarajaDemoMode = !isLiveMode
