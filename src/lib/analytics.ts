import { site } from '../content';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads GA4 after the page is idle so it never competes with first paint.
 * Does nothing while the ID is still the G-XXXXXXX placeholder.
 */
export function initAnalytics() {
  const id = site.gaId;
  if (!id || id === 'G-XXXXXXX') return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  // gtag.js only reads `arguments` objects from the dataLayer, not plain arrays.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, params);
}
