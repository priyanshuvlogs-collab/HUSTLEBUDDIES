// Netlify Function (v2): served at /api/contact via the `config.path` below.
import { handleContact } from '../../server/handleContact.js';

export default async (request: Request): Promise<Response> => {
  if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const { status, body } = await handleContact(await request.text(), process.env);
  return Response.json(body, { status });
};

export const config = { path: '/api/contact' };
