/** True when the browser can create a WebGL context. Cached after the first check. */
let cached: boolean | null = null;

export function hasWebGL(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement('canvas');
    cached = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    cached = false;
  }
  return cached;
}

/** Scale particle counts to the device: 150 on small/weak devices, up to 300 on desktops. */
export function particleBudget(): number {
  const cores = navigator.hardwareConcurrency ?? 4;
  const width = window.innerWidth;
  if (width < 768 || cores <= 4) return 150;
  if (width < 1280) return 220;
  return 300;
}
