// The Daily Python — progress sync endpoint (Vercel Serverless Function)
//
// Stores each user's progress in Upstash Redis, keyed by a "sync code".
// No accounts, no passwords: whoever holds the code can read/write that slot.
// The code is long and random (32^12 combinations) so it isn't guessable.
//
// Credentials are injected automatically by the Upstash Redis integration
// from the Vercel Marketplace. We read several possible env var names so this
// keeps working whether the integration uses the UPSTASH_* or KV_* prefix.

const REST_URL =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  process.env.REDIS_REST_URL;

const REST_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  process.env.REDIS_REST_TOKEN;

const CODE_RE = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
const TWO_YEARS = 63072000; // seconds — slot expires after this long without a write
const MAX_BYTES = 200000;   // ~200 KB ceiling on a single progress blob

async function redis(command) {
  const r = await fetch(REST_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error("redis " + r.status);
  return r.json(); // -> { result: ... }
}

export default async function handler(req, res) {
  if (!REST_URL || !REST_TOKEN) {
    return res.status(500).json({
      error:
        "Storage not configured. Add an Upstash Redis integration in the Vercel dashboard.",
    });
  }

  try {
    const code = String((req.query && req.query.code) || "").toUpperCase();
    if (!CODE_RE.test(code)) {
      return res.status(400).json({ error: "Invalid sync code format." });
    }
    const key = "tdp:" + code;

    if (req.method === "GET") {
      const { result } = await redis(["GET", key]);
      return res.status(200).json({ data: result ? JSON.parse(result) : null });
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body || "{}");
      const payload = JSON.stringify(body || {});
      if (payload.length > MAX_BYTES) {
        return res.status(413).json({ error: "Payload too large." });
      }
      await redis(["SET", key, payload, "EX", TWO_YEARS]);
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
