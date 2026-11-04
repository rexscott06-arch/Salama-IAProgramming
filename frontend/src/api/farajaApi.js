const SALAMA_API = 'http://localhost:5001';
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY
};

export async function getMemorialEvents() {
  const res = await fetch(`${SALAMA_API}/api/partner/memorials`, { headers });
  if (!res.ok) throw new Error('Could not fetch memorial events');
  return res.json();
}

export async function submitAwarenessActivity(data) {
  const res = await fetch(`${SALAMA_API}/api/partner/awareness-activities`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Could not submit awareness activity');
  return res.json();
}
