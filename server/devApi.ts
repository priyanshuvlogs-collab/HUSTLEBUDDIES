import type { Plugin } from 'vite';
import { handleContact } from './handleContact.js';

/** Serves POST /api/contact during `vite dev` and `vite preview` so the form works locally. */
export function devApi(): Plugin {
  const mount = (middlewares: {
    use: (
      path: string,
      fn: (
        req: import('http').IncomingMessage,
        res: import('http').ServerResponse,
        next: () => void,
      ) => void,
    ) => void;
  }) =>
    middlewares.use('/api/contact', (req, res, next) => {
      if (req.method !== 'POST') return next();
      let raw = '';
      req.on('data', (chunk) => {
        raw += chunk;
        if (raw.length > 20_000) req.destroy(); // handler rejects >10KB anyway
      });
      req.on('end', async () => {
        const { status, body } = await handleContact(raw, process.env);
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
      });
    });
  return {
    name: 'hb-dev-api',
    // Block bodies matter: a returned function would be treated by Vite as a post-hook.
    configureServer(server) {
      mount(server.middlewares);
    },
    configurePreviewServer(server) {
      mount(server.middlewares);
    },
  };
}
