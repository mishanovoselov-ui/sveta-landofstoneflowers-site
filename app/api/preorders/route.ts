import { env } from 'cloudflare:workers';

const regions = new Set([
  'north-america',
  'latin-america',
  'uk-ireland',
  'western-europe',
  'eastern-europe-central-asia',
  'middle-east',
  'africa',
  'asia-pacific',
  'other',
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function reply(message: string, status = 200) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = !origin || origin === 'https://landofstoneflowers.com' || origin === 'https://www.landofstoneflowers.com' || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
  if (!allowedOrigin) return reply('This request is not allowed.', 403);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return reply('Please complete every field.', 400);
  }

  if (String(payload.website || '').trim()) return reply('You’re on the list.');

  const email = String(payload.email || '').trim().toLowerCase();
  const confirmEmail = String(payload.confirmEmail || '').trim().toLowerCase();
  const region = String(payload.region || '').trim();

  if (!emailPattern.test(email) || email.length > 254) return reply('Enter a valid email address.', 400);
  if (email !== confirmEmail) return reply('The email addresses do not match.', 400);
  if (!regions.has(region)) return reply('Choose your region.', 400);
  if (payload.consent !== true) return reply('Please agree to receive preorder updates.', 400);

  const database = (env as unknown as { PREORDERS: D1Database }).PREORDERS;
  const now = new Date().toISOString();

  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS preorder_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      region TEXT NOT NULL,
      email_confirmed INTEGER NOT NULL DEFAULT 1,
      consented_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    database.prepare('CREATE INDEX IF NOT EXISTS idx_preorder_signups_region ON preorder_signups(region)'),
  ]);

  await database.prepare(`INSERT INTO preorder_signups (email, region, email_confirmed, consented_at, created_at, updated_at)
    VALUES (?, ?, 1, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET region = excluded.region, email_confirmed = 1, consented_at = excluded.consented_at, updated_at = excluded.updated_at`)
    .bind(email, region, now, now, now)
    .run();

  return reply('You’re on the list.');
}
