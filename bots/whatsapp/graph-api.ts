/**
 * Minimal wrapper around the official WhatsApp Cloud API (Meta Graph API).
 * https://developers.facebook.com/docs/whatsapp/cloud-api
 */

const GRAPH_VERSION = 'v21.0';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function apiUrl(path: string): string {
  const phoneNumberId = requireEnv('WHATSAPP_PHONE_NUMBER_ID');
  return `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}${path}`;
}

async function post(path: string, body: unknown): Promise<Response> {
  const token = requireEnv('WHATSAPP_ACCESS_TOKEN');
  const res = await fetch(apiUrl(path), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error('WhatsApp Graph API error', res.status, await res.text().catch(() => ''));
  }
  return res;
}

export async function sendText(to: string, body: string): Promise<void> {
  await post('/messages', { messaging_product: 'whatsapp', to, type: 'text', text: { body } });
}

export interface ListRow {
  id: string;
  title: string;
}
export interface ListSection {
  title: string;
  rows: ListRow[];
}

/** Interactive list message — used for choice steps with more than 3 options (service, location, project type). */
export async function sendList(to: string, bodyText: string, buttonLabel: string, sections: ListSection[]): Promise<void> {
  const totalRows = sections.reduce((sum, section) => sum + section.rows.length, 0);
  if (totalRows > 10) {
    // A real, confirmed Cloud API constraint (not a soft UI limit) — the
    // Graph API rejects the request outright above 10 rows total across
    // all sections. Caught this exact bug once already (the 13-service
    // list in webhook.ts) — this guard is here so it fails loudly and
    // immediately in development instead of silently 400-ing in production.
    throw new Error(`WhatsApp list messages support at most 10 rows total across all sections (got ${totalRows}). Split into multiple messages (see askService/askServiceInCategory in webhook.ts for the pattern).`);
  }
  await post('/messages', {
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text: bodyText },
      action: { button: buttonLabel, sections },
    },
  });
}

export interface ReplyButton {
  id: string;
  title: string;
}

/** Interactive reply-button message — Cloud API supports at most 3 buttons; use sendList beyond that. */
export async function sendButtons(to: string, bodyText: string, buttons: ReplyButton[]): Promise<void> {
  if (buttons.length > 3) throw new Error('WhatsApp reply-button messages support at most 3 buttons — use sendList instead.');
  await post('/messages', {
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: bodyText },
      action: { buttons: buttons.map((b) => ({ type: 'reply', reply: { id: b.id, title: b.title } })) },
    },
  });
}

/** Resolves a media id (from an incoming message) to a temporary, authenticated download URL. */
export async function getMediaUrl(mediaId: string): Promise<string | undefined> {
  const token = requireEnv('WHATSAPP_ACCESS_TOKEN');
  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${mediaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return undefined;
  const data = (await res.json()) as { url?: string };
  return data.url;
}
