const API = process.env.API || 'http://localhost:5001'
const KEY = process.env.KEY
const N = Number(process.env.N || 60)

const mix = [
  { path: '/api/incidents', key: true },
  { path: '/api/incidents', key: true },
  { path: '/api/incidents/1', key: true },
  { path: '/api/incidents/9999', key: true },
  { path: '/api/resources', key: true },
  { path: '/api/volunteers', key: true },
  { path: '/api/donations/summary', key: true },
  { path: '/api/incidents', key: false },
  { path: '/not-a-route', key: true },
]

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

;(async () => {
  const counts = {}
  for (let i = 0; i < N; i++) {
    const r = mix[Math.floor(Math.random() * mix.length)]
    try {
      const res = await fetch(API + r.path, { headers: r.key ? { 'X-API-Key': KEY } : {} })
      counts[res.status] = (counts[res.status] || 0) + 1
    } catch (err) {
      counts.failed = (counts.failed || 0) + 1
    }
    await pause(50)
  }
  console.log('Status codes received:', counts)
})()
