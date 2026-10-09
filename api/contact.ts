// Vercel Function: POST /api/contact (Web Request/Response signature).
import { handleContact } from '../server/handleContact.js';

export async function POST(request: Request): Promise<Response> {
  const { status, body } = await handleContact(await request.text(), process.env);
  return Response.json(body, { status });
}
