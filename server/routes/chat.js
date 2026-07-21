import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();
const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function buildSystemInstruction(ctx) {
  const snapshot = {
    profile: ctx.profile || {},
    bookings: ctx.bookings || [],
    offers: ctx.offers || [],
    destinations: ctx.destinations || [],
    travelTips: ctx.travelTips || [],
    expenses: ctx.expenses || [],
    expenseTotals: ctx.totals || { total: 0, pending: 0, approved: 0, rejected: 0 },
    budgets: ctx.budgets || [],
    advances: ctx.advances || [],
    today: new Date().toISOString().slice(0, 10),
  };

  return `You are Skye, the friendly in-app assistant for SkyDesk, a flight booking and travel-expense
management dashboard. Answer the user's questions using ONLY the JSON data below — it reflects their
real account (bookings, wallet, expenses, budgets, offers, destinations, travel tips). Do not invent
flights, prices, or numbers that aren't in this data.

Keep replies short (2-4 sentences), warm, and conversational — this is a chat bubble, not a report.
Use ₹ for currency. If asked something unrelated to travel/expenses, answer briefly and steer back
to what you can help with on SkyDesk.

ACCOUNT DATA:
${JSON.stringify(snapshot)}`;
}

router.post('/', requireAuth, async (req, res) => {
  try {
    const { message, context, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string.' });
    }

    if (!context || typeof context !== 'object') {
      return res.status(400).json({ error: 'Context object is required.' });
    }

    if (!apiKey) {
      return res.status(503).json({ error: 'Gemini API is not configured on this server.' });
    }

    const contents = [
      ...(history || []).map((h) => ({
        role: h.role === 'bot' ? 'model' : h.role,
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const systemInstructionText = buildSystemInstruction(context);

    const apiRes = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemInstructionText }],
        },
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 300,
        },
      }),
    });

    if (!apiRes.ok) {
      const errBody = await apiRes.text().catch(() => '');
      return res.status(500).json({ error: `Gemini API Error: ${errBody.slice(0, 150)}` });
    }

    const data = await apiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';

    res.json({
      success: true,
      message: 'Chat response generated successfully.',
      data: { reply: reply.trim() }
    });
  } catch (err) {
    console.error('Chat error on auth server:', err);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
});

export default router;
