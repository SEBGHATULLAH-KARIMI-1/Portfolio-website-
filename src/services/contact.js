const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

/**
 * Sends the contact form.
 *
 * Set VITE_CONTACT_ENDPOINT in `.env` (Formspree, Getform, or your own API)
 * to deliver real messages. Without it the call is only simulated so the UI
 * can be developed — nothing is sent anywhere.
 */
export async function sendMessage(payload) {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return { simulated: true }
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  return { simulated: false }
}
