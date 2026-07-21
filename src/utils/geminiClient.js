
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = 'gemini-2.5-flash'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export function isGeminiConfigured() {
  return Boolean(API_KEY)
}

// Turns the app's live data into a compact grounding block so
// Gemini answers using the user's real bookings/wallet/expenses
// instead of guessing.
function buildSystemInstruction(ctx) {
  const snapshot = {
    profile: ctx.profile,
    bookings: ctx.bookings,
    offers: ctx.offers,
    destinations: ctx.destinations,
    travelTips: ctx.travelTips,
    expenses: ctx.expenses,
    expenseTotals: ctx.totals,
    budgets: ctx.budgets,
    advances: ctx.advances,
    today: new Date().toISOString().slice(0, 10),
  }

  return `You are Skye, the friendly in-app assistant for SkyDesk, a flight booking and travel-expense
management dashboard. Answer the user's questions using ONLY the JSON data below — it reflects their
real account (bookings, wallet, expenses, budgets, offers, destinations, travel tips). Do not invent
flights, prices, or numbers that aren't in this data.

Keep replies short (2-4 sentences), warm, and conversational — this is a chat bubble, not a report.
Use ₹ for currency. If asked something unrelated to travel/expenses, answer briefly and steer back
to what you can help with on SkyDesk.

ACCOUNT DATA:
${JSON.stringify(snapshot)}`
}

/**
 * Sends a message to Gemini along with grounding data and recent
 * conversation history. Returns the model's plain-text reply.
 *
 * @param {string} message - the user's latest message
 * @param {object} ctx - app data snapshot (bookings, profile, expenses, etc.)
 * @param {Array<{role: 'user'|'model', text: string}>} history - prior turns
 */
export async function askGemini(message, ctx, history = []) {
  if (!API_KEY) {
    throw new Error('MISSING_API_KEY')
  }

  const contents = [
    ...history.map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
    { role: 'user', parts: [{ text: message }] },
  ]

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: buildSystemInstruction(ctx) }],
      },
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 300,
      },
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    throw new Error(`GEMINI_HTTP_${res.status}: ${errBody.slice(0, 200)}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? ''

  if (!text) {
    throw new Error('GEMINI_EMPTY_RESPONSE')
  }

  return text.trim()
}
