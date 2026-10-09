/** Strip HTML tags and control characters from user input before it leaves the server. */
export function sanitizeText(value: string): string {
  return (
    value
      .replace(/<[^>]*>/g, '')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .trim()
  );
}

export function sanitizeDeep<T>(input: T): T {
  if (typeof input === 'string') return sanitizeText(input) as T;
  if (Array.isArray(input)) return input.map(sanitizeDeep) as T;
  if (input && typeof input === 'object') {
    return Object.fromEntries(Object.entries(input).map(([k, v]) => [k, sanitizeDeep(v)])) as T;
  }
  return input;
}
