const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export async function apiRequest(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)
  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = body && typeof body === 'object' && body.error
      ? body.error
      : `Request failed (${response.status})`
    throw new Error(message)
  }

  return body
}
