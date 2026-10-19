import { contactSchema } from '../src/lib/schema.js';
import { sanitizeDeep } from '../src/lib/sanitize.js';

export interface ContactResult {
  status: number;
  body: { ok: boolean; error?: string; fields?: Record<string, string[]> };
}

const MAX_BYTES = 10_000;

/**
 * Platform-agnostic contact handler shared by Vercel, Netlify, and the Vite dev server.
 * 1. Size-limit and parse JSON  2. Validate with the same Zod schema as the client
 * 3. Drop honeypot hits  4. Sanitize  5. Forward to CONTACT_WEBHOOK_URL (env var).
 */
export async function handleContact(
  raw: string,
  env: Record<string, string | undefined>,
): Promise<ContactResult> {
  if (raw.length > MAX_BYTES)
    return { status: 413, body: { ok: false, error: 'Payload too large' } };

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { status: 400, body: { ok: false, error: 'Invalid JSON' } };
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return {
      status: 422,
      body: { ok: false, error: 'Validation failed', fields: parsed.error.flatten().fieldErrors },
    };
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (parsed.data.botField) return { status: 200, body: { ok: true } };

  const { botField: _drop, ...clean } = sanitizeDeep(parsed.data);
  void _drop;
  const payload = {
    ...clean,
    submittedAt: new Date().toISOString(),
    source: 'website-contact-form',
  };

  const webhook = env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // [Placeholder] No destination configured yet. The submission is visible in the
    // function logs only. Set CONTACT_WEBHOOK_URL before launch (see PLACEHOLDERS.md).
    console.warn('[contact] CONTACT_WEBHOOK_URL not set. Submission:', JSON.stringify(payload));
    return { status: 200, body: { ok: true } };
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Fail fast instead of hanging until the platform kills the function.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error('[contact] forwarding failed', err);
    return { status: 502, body: { ok: false, error: 'Could not deliver message' } };
  }
}
