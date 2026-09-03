import { env } from 'cloudflare:workers';

const events = new Set([
  'page_view',
  'preorder_view',
  'cta_click',
  'preorder_start',
  'preorder_submit',
  'preorder_success',
  'preorder_error',
]);

function empty(status = 204) {
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = !origin || origin === 'https://landofstoneflowers.com' || origin === 'https://www.landofstoneflowers.com' || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
  if (!allowedOrigin) return empty(403);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return empty(400);
  }

  const event = String(payload.event || '').trim();
  const location = String(payload.location || 'page').trim().slice(0, 40);
  const path = String(payload.path || '/').trim().slice(0, 200);
  if (!events.has(event) || !location || !path.startsWith('/')) return empty(400);

  let referrerHost = '';
  const referrer = request.headers.get('Referer');
  if (referrer) {
    try { referrerHost = new URL(referrer).hostname.slice(0, 120); } catch { /* Ignore malformed referrers. */ }
  }

  const country = ((request as Request & { cf?: { country?: string } }).cf?.country || 'XX').slice(0, 2).toUpperCase();
  const database = (env as unknown as { PREORDERS: D1Database }).PREORDERS;

  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event TEXT NOT NULL,
      location TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer_host TEXT NOT NULL DEFAULT '',
      country TEXT NOT NULL DEFAULT 'XX',
      created_at TEXT NOT NULL
    )`),
    database.prepare('CREATE INDEX IF NOT EXISTS idx_analytics_events_event_created ON analytics_events(event, created_at)'),
    database.prepare('CREATE INDEX IF NOT EXISTS idx_analytics_events_country_created ON analytics_events(country, created_at)'),
  ]);

  await database.prepare(`INSERT INTO analytics_events (event, location, path, referrer_host, country, created_at)
    VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(event, location, path, referrerHost, country, new Date().toISOString())
    .run();

  return empty();
}
